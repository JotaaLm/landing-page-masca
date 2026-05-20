import { supabase } from './supabase';

/**
 * Persiste um lead de waitlist (somente e-mail) no Supabase.
 * @param {{ email: string, utm_source?: string, utm_campaign?: string }} data
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function submitWaitlistLead(data) {
  if (!supabase) {
    console.error('[Mascate] Supabase nao configurado. Waitlist lead nao foi salvo:', data);
    return {
      success: false,
      error: 'supabase_not_configured',
    };
  }

  const { error } = await supabase.from('waitlist_leads').insert([
    {
      email: data.email,
      utm_source: data.utm_source || null,
      utm_campaign: data.utm_campaign || null,
    },
  ]);

  if (error) {
    console.error('[Mascate] Erro ao salvar waitlist lead:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

function getLeadInsertError(error) {
  if (error?.code !== '23505' && !error?.message?.includes('duplicate')) {
    return error?.message || 'unknown_error';
  }

  const duplicateInfo = `${error.message || ''} ${error.details || ''}`.toLowerCase();

  if (duplicateInfo.includes('email')) return 'duplicate_email';
  if (duplicateInfo.includes('whatsapp')) return 'duplicate_whatsapp';

  return 'duplicate_lead';
}

/**
 * Persiste um lead do formulário de contato no Supabase.
 * @param {{ name: string, email: string, whatsapp: string, utm: Record<string,string> }} data
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function submitFullLead(data) {
  if (!supabase) {
    console.error('[Mascate] Supabase nao configurado. Full lead nao foi salvo:', data);
    return {
      success: false,
      error: 'supabase_not_configured',
    };
  }

  const cleanText = (value) => {
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    return trimmed || null;
  };

  const whatsapp = cleanText(data.whatsapp);
  const email = cleanText(data.email);
  const baseLead = {
    name: cleanText(data.name),
    email,
    whatsapp,
  };
  const lead = { ...baseLead };

  Object.entries(data.utm || {}).forEach(([key, value]) => {
    const cleanValue = cleanText(value);
    if (cleanValue) lead[key] = cleanValue;
  });

  const { error } = await supabase.from('leads').insert([lead]);

  if (error && (error.code === 'PGRST204' || error.message?.includes('column'))) {
    const fallback = await supabase.from('leads').insert([baseLead]);
    if (fallback.error) {
      console.error('[Mascate] Erro ao salvar lead:', fallback.error.message);
      return { success: false, error: getLeadInsertError(fallback.error) };
    }
    return { success: true };
  }

  if (error) {
    console.error('[Mascate] Erro ao salvar lead:', error.message);
    return { success: false, error: getLeadInsertError(error) };
  }

  return { success: true };
}
