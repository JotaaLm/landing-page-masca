import { supabase } from './supabase';

/**
 * Persiste um lead de waitlist (somente e-mail) no Supabase.
 * @param {{ email: string, utm_source?: string, utm_campaign?: string }} data
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function submitWaitlistLead(data) {
  if (!supabase) {
    console.log('[Mascate][Fallback] Waitlist lead (sem Supabase):', data);
    return { success: true };
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

/**
 * Persiste um lead completo (formulário de contato) no Supabase.
 * @param {{ name: string, email: string, whatsapp: string, revenue: string, utm: Record<string,string> }} data
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function submitFullLead(data) {
  if (!supabase) {
    console.log('[Mascate][Fallback] Full lead (sem Supabase):', data);
    return { success: true };
  }

  const { error } = await supabase.from('leads').insert([
    {
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      revenue: data.revenue,
      utm_source: data.utm?.utm_source || null,
      utm_medium: data.utm?.utm_medium || null,
      utm_campaign: data.utm?.utm_campaign || null,
      utm_term: data.utm?.utm_term || null,
      utm_content: data.utm?.utm_content || null,
    },
  ]);

  if (error) {
    console.error('[Mascate] Erro ao salvar lead:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
