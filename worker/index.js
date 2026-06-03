const PRIVACY_NOTICE_VERSION = '2026-06-03';

const SAFE_ERRORS = {
  duplicateEmail: 'duplicate_email',
  duplicateWhatsapp: 'duplicate_whatsapp',
  duplicateLead: 'duplicate_lead',
  unavailable: 'service_unavailable',
  invalid: 'invalid_lead',
};

const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function cleanText(value, maxLength = 240) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function privacyEvidence() {
  return {
    privacy_notice_version: PRIVACY_NOTICE_VERSION,
    privacy_accepted_at: new Date().toISOString(),
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function getSupabaseConfig(env) {
  const url = cleanText(env.SUPABASE_URL, 500);
  const key = cleanText(env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY, 3000);

  if (!url || !key) return null;

  return {
    url: url.replace(/\/$/, ''),
    key,
  };
}

async function insertIntoSupabase(env, table, payload) {
  const config = getSupabaseConfig(env);

  if (!config) {
    return {
      status: 500,
      code: 'missing_supabase_config',
      message: 'Supabase runtime config is missing.',
    };
  }

  const response = await fetch(`${config.url}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify([payload]),
  });

  if (response.ok) return null;

  try {
    return {
      status: response.status,
      ...(await response.json()),
    };
  } catch {
    return {
      status: response.status,
      message: await response.text(),
    };
  }
}

function isMissingColumnError(error) {
  return error?.code === 'PGRST204' || `${error?.message || ''}`.toLowerCase().includes('column');
}

function getLeadInsertError(error) {
  if (error?.code === 'missing_supabase_config') return 'missing_supabase_config';

  if (error?.code !== '23505' && !`${error?.message || ''}`.toLowerCase().includes('duplicate')) {
    return SAFE_ERRORS.unavailable;
  }

  const duplicateInfo = `${error.message || ''} ${error.details || ''}`.toLowerCase();

  if (duplicateInfo.includes('email')) return SAFE_ERRORS.duplicateEmail;
  if (duplicateInfo.includes('whatsapp')) return SAFE_ERRORS.duplicateWhatsapp;

  return SAFE_ERRORS.duplicateLead;
}

async function insertWithFallback(env, table, lead, baseLead) {
  const error = await insertIntoSupabase(env, table, lead);

  if (!error) return null;

  if (isMissingColumnError(error)) {
    return insertIntoSupabase(env, table, baseLead);
  }

  return error;
}

function withUtmFields(target, source) {
  UTM_FIELDS.forEach((key) => {
    const value = cleanText(source?.utm?.[key] || source?.[key]);
    if (value) target[key] = value;
  });

  return target;
}

async function handleFullLead(request, env) {
  if (request.method !== 'POST') return json({ success: false, error: 'method_not_allowed' }, 405);

  const data = await readJson(request);

  if (!data) return json({ success: false, error: SAFE_ERRORS.invalid }, 400);

  const baseLead = {
    name: cleanText(data.name, 160),
    email: cleanText(data.email, 320),
    whatsapp: cleanText(data.whatsapp, 32),
  };

  if (!baseLead.name || !isValidEmail(baseLead.email) || !baseLead.whatsapp) {
    return json({ success: false, error: SAFE_ERRORS.invalid }, 400);
  }

  const lead = withUtmFields({
    ...baseLead,
    ...privacyEvidence(),
  }, data);

  const error = await insertWithFallback(env, 'leads', lead, baseLead);

  if (error) {
    return json({
      success: false,
      error: getLeadInsertError(error),
      code: error.code || null,
    }, error.status === 409 ? 409 : 500);
  }

  return json({ success: true });
}

async function handleWaitlistLead(request, env) {
  if (request.method !== 'POST') return json({ success: false, error: 'method_not_allowed' }, 405);

  const data = await readJson(request);
  const email = cleanText(data?.email, 320);

  if (!isValidEmail(email)) return json({ success: false, error: SAFE_ERRORS.invalid }, 400);

  const baseLead = withUtmFields({
    email,
  }, data);

  const lead = {
    ...baseLead,
    ...privacyEvidence(),
  };

  const error = await insertWithFallback(env, 'waitlist_leads', lead, baseLead);

  if (error) {
    return json({
      success: false,
      error: getLeadInsertError(error),
      code: error.code || null,
    }, error.status === 409 ? 409 : 500);
  }

  return json({ success: true });
}

async function checkSupabaseHealth(env) {
  const config = getSupabaseConfig(env);

  if (!config) {
    return {
      reachable: false,
      status: null,
      code: 'missing_supabase_config',
    };
  }

  try {
    const response = await fetch(`${config.url}/rest/v1/leads?select=id&limit=1`, {
      method: 'GET',
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      return {
        reachable: true,
        status: response.status,
        code: null,
      };
    }

    let code = null;

    try {
      const error = await response.json();
      code = error?.code || null;
    } catch {
      code = null;
    }

    return {
      reachable: false,
      status: response.status,
      code,
    };
  } catch {
    return {
      reachable: false,
      status: null,
      code: 'network_error',
    };
  }
}

async function handleHealth(env) {
  const supabase = await checkSupabaseHealth(env);

  return json({
    success: true,
    worker: true,
    has_supabase_url: Boolean(cleanText(env.SUPABASE_URL, 500)),
    has_supabase_key: Boolean(cleanText(env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY, 3000)),
    supabase,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') return handleHealth(env);
    if (url.pathname === '/api/leads') return handleFullLead(request, env);
    if (url.pathname === '/api/waitlist') return handleWaitlistLead(request, env);
    if (url.pathname.startsWith('/api/')) return json({ success: false, error: 'not_found' }, 404);

    return env.ASSETS.fetch(request);
  },
};
