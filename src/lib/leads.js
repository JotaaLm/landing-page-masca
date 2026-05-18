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
  if (duplicateInfo.includes('store_name') || duplicateInfo.includes('loja')) return 'duplicate_store_name';
  if (duplicateInfo.includes('whatsapp')) return 'duplicate_whatsapp';

  return 'duplicate_lead';
}

/**
 * Persiste um lead completo (formulário de contato) no Supabase.
 * @param {{ name: string, email?: string, whatsapp: string, revenue?: string, budget?: string, store_name?: string, store_segment?: string, message?: string, utm: Record<string,string> }} data
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

  const phoneDigits = (data.whatsapp || '').replace(/\D/g, '');
  const whatsapp = cleanText(data.whatsapp);
  const email = cleanText(data.email) || (phoneDigits ? `${phoneDigits}@lead.masca.ai` : null);
  const budget = cleanText(data.budget);
  const lead = {
    name: cleanText(data.name),
    email,
    whatsapp,
    store_name: cleanText(data.store_name),
    store_segment: cleanText(data.store_segment),
    budget,
    message: cleanText(data.message),
  };

  Object.entries(data.utm || {}).forEach(([key, value]) => {
    const cleanValue = cleanText(value);
    if (cleanValue) lead[key] = cleanValue;
  });

  const { error } = await supabase.from('leads').insert([lead]);

  if (error && (error.code === 'PGRST204' || error.message?.includes('column'))) {
    const legacyLead = {
      name: lead.name,
      email: lead.email,
      whatsapp: lead.whatsapp,
      revenue: [
        lead.budget ? `Valor: ${lead.budget}` : null,
        lead.store_name ? `Loja: ${lead.store_name}` : null,
        lead.store_segment ? `Segmento: ${lead.store_segment}` : null,
        lead.message ? `Dificuldade: ${lead.message}` : null,
      ].filter(Boolean).join(' | ') || null,
      utm_source: lead.utm_source,
      utm_medium: lead.utm_medium,
      utm_campaign: lead.utm_campaign,
      utm_term: lead.utm_term,
      utm_content: lead.utm_content,
    };
    const fallback = await supabase.from('leads').insert([legacyLead]);
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
