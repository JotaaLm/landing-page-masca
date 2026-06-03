import { PRIVACY_NOTICE_VERSION } from './privacy';
import { supabase } from './supabase';

const SAFE_ERRORS = {
  duplicateEmail: 'duplicate_email',
  duplicateWhatsapp: 'duplicate_whatsapp',
  duplicateLead: 'duplicate_lead',
  unavailable: 'service_unavailable',
};

function cleanText(value, maxLength = 240) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function privacyEvidence() {
  return {
    privacy_notice_version: PRIVACY_NOTICE_VERSION,
    privacy_accepted_at: new Date().toISOString(),
  };
}

function logLeadError(context, error) {
  if (!import.meta.env.DEV) return;

  console.error(`[Mascate] ${context}`, {
    code: error?.code || null,
    message: error?.message || null,
    details: error?.details || null,
    hint: error?.hint || null,
  });
}

function isServiceUnavailableError(error) {
  const message = `${error?.message || ''} ${error?.details || ''}`.toLowerCase();

  return (
    error?.name === 'TypeError' ||
    message.includes('fetch failed') ||
    message.includes('failed to fetch') ||
    message.includes('networkerror') ||
    message.includes('enotfound') ||
    message.includes('missing_client_config')
  );
}

function isMissingColumnError(error) {
  return error?.code === 'PGRST204' || error?.message?.includes('column');
}

export async function submitWaitlistLead(data) {
  if (!supabase) {
    logLeadError('Waitlist indisponivel: cliente de dados sem configuracao.', {
      message: 'missing_client_config',
    });
    return {
      success: false,
      error: SAFE_ERRORS.unavailable,
    };
  }

  const baseLead = {
    email: cleanText(data.email, 320),
    utm_source: cleanText(data.utm_source),
    utm_campaign: cleanText(data.utm_campaign),
  };
  const lead = {
    ...baseLead,
    ...privacyEvidence(),
  };

  const { error } = await supabase
    .from('waitlist_leads')
    .insert([lead]);

  if (error && isMissingColumnError(error)) {
    const fallback = await supabase.from('waitlist_leads').insert([baseLead]);
    if (fallback.error) {
      logLeadError('Erro ao salvar waitlist lead com payload base.', fallback.error);
      return { success: false, error: getLeadInsertError(fallback.error) };
    }
    return { success: true };
  }

  if (error) {
    logLeadError('Erro ao salvar waitlist lead.', error);
    return {
      success: false,
      error: isServiceUnavailableError(error) ? SAFE_ERRORS.unavailable : getLeadInsertError(error),
    };
  }

  return { success: true };
}

function getLeadInsertError(error) {
  if (isServiceUnavailableError(error)) return SAFE_ERRORS.unavailable;

  if (error?.code !== '23505' && !error?.message?.includes('duplicate')) {
    return SAFE_ERRORS.unavailable;
  }

  const duplicateInfo = `${error.message || ''} ${error.details || ''}`.toLowerCase();

  if (duplicateInfo.includes('email')) return SAFE_ERRORS.duplicateEmail;
  if (duplicateInfo.includes('whatsapp')) return SAFE_ERRORS.duplicateWhatsapp;

  return SAFE_ERRORS.duplicateLead;
}

export async function submitFullLead(data) {
  if (!supabase) {
    logLeadError('Envio de lead sem cliente de dados configurado.', {
      message: 'missing_client_config',
    });
    return {
      success: false,
      error: SAFE_ERRORS.unavailable,
    };
  }

  const whatsapp = cleanText(data.whatsapp, 32);
  const email = cleanText(data.email, 320);
  const baseLead = {
    name: cleanText(data.name, 160),
    email,
    whatsapp,
  };
  const lead = {
    ...baseLead,
    ...privacyEvidence(),
  };

  Object.entries(data.utm || {}).forEach(([key, value]) => {
    const cleanValue = cleanText(value);
    if (cleanValue) lead[key] = cleanValue;
  });

  const { error } = await supabase.from('leads').insert([lead]);

  if (error && isMissingColumnError(error)) {
    const fallback = await supabase.from('leads').insert([baseLead]);
    if (fallback.error) {
      logLeadError('Erro ao salvar lead com payload base.', fallback.error);
      return { success: false, error: getLeadInsertError(fallback.error) };
    }
    return { success: true };
  }

  if (error) {
    logLeadError('Erro ao salvar lead.', error);
    return { success: false, error: getLeadInsertError(error) };
  }

  return { success: true };
}
