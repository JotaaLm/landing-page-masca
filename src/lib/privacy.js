export const PRIVACY_NOTICE_VERSION = '2026-06-03';

export const ANALYTICS_CONSENT_KEY = 'masca_analytics_consent_v1';
export const ANALYTICS_CONSENT_EVENT = 'masca:analytics-consent-changed';
export const OPEN_COOKIE_PREFERENCES_EVENT = 'masca:open-cookie-preferences';

export const CONSENT_ACCEPTED = 'accepted';
export const CONSENT_REJECTED = 'rejected';

export function getAnalyticsConsent() {
  if (typeof window === 'undefined') return null;

  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === CONSENT_ACCEPTED || value === CONSENT_REJECTED ? value : null;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent() {
  return getAnalyticsConsent() === CONSENT_ACCEPTED;
}

export function setAnalyticsConsent(value) {
  if (typeof window === 'undefined') return;

  const normalized = value === CONSENT_ACCEPTED ? CONSENT_ACCEPTED : CONSENT_REJECTED;

  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, normalized);
  } catch {
    // O armazenamento da preferência pode falhar em modos restritos; a análise permanece opt-in.
  }

  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, {
    detail: { value: normalized },
  }));
}

export function openCookiePreferences() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
}
