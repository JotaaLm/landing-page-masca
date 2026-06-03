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

function logLeadError(context, error) {
  if (!import.meta.env.DEV) return;

  console.error(`[Mascate] ${context}`, {
    code: error?.code || null,
    message: error?.message || null,
    details: error?.details || null,
    hint: error?.hint || null,
  });
}

async function parseResponse(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

async function submitLeadRequest(endpoint, payload, context) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await parseResponse(response);

    if (!response.ok || !result.success) {
      logLeadError(context, result);
      return {
        success: false,
        error: result.error || SAFE_ERRORS.unavailable,
      };
    }

    return { success: true };
  } catch (error) {
    logLeadError(context, error);
    return {
      success: false,
      error: SAFE_ERRORS.unavailable,
    };
  }
}

export async function submitWaitlistLead(data) {
  return submitLeadRequest('/api/waitlist', {
    email: cleanText(data.email, 320),
    utm_source: cleanText(data.utm_source),
    utm_campaign: cleanText(data.utm_campaign),
    privacy_ack: 'accepted',
  }, 'Erro ao enviar waitlist lead pela API.');
}

export async function submitFullLead(data) {
  const payload = {
    name: cleanText(data.name, 160),
    email: cleanText(data.email, 320),
    whatsapp: cleanText(data.whatsapp, 32),
    privacy_ack: cleanText(data.privacy_ack, 32),
    utm: {},
  };

  Object.entries(data.utm || {}).forEach(([key, value]) => {
    const cleanValue = cleanText(value);
    if (cleanValue) payload.utm[key] = cleanValue;
  });

  return submitLeadRequest('/api/leads', payload, 'Erro ao enviar lead pela API.');
}
