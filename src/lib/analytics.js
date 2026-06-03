import { ANALYTICS_CONSENT_EVENT, hasAnalyticsConsent } from './privacy';

const UMAMI_SCRIPT_SRC = 'https://cloud.umami.is/script.js';
const UMAMI_WEBSITE_ID = '1b1bab44-5f4b-49b8-a7da-ef969d4fcf6b';

const pendingUmamiEvents = [];
let flushTimer = null;
let flushAttempts = 0;
let umamiScriptRequested = false;

function canUseAnalytics() {
  return typeof window !== 'undefined' && hasAnalyticsConsent();
}

function loadUmamiScript() {
  if (!canUseAnalytics() || umamiScriptRequested) return;

  if (document.querySelector(`script[src="${UMAMI_SCRIPT_SRC}"]`)) {
    umamiScriptRequested = true;
    return;
  }

  const script = document.createElement('script');
  script.defer = true;
  script.src = UMAMI_SCRIPT_SRC;
  script.dataset.websiteId = UMAMI_WEBSITE_ID;
  script.dataset.autoTrack = 'false';
  script.onload = () => flushUmamiEvents();
  document.head.appendChild(script);
  umamiScriptRequested = true;
}

function canUseUmami() {
  return canUseAnalytics() && typeof window.umami?.track === 'function';
}

function sendToUmami(eventName, data) {
  if (eventName) {
    window.umami.track(eventName, data);
    return;
  }

  window.umami.track();
}

function flushUmamiEvents() {
  if (!canUseAnalytics()) return false;
  loadUmamiScript();
  if (!canUseUmami()) return false;

  while (pendingUmamiEvents.length > 0) {
    const { eventName, data } = pendingUmamiEvents.shift();
    sendToUmami(eventName, data);
  }

  flushAttempts = 0;
  return true;
}

function scheduleUmamiFlush() {
  if (!canUseAnalytics() || flushTimer) return;

  flushTimer = window.setTimeout(() => {
    flushTimer = null;

    if (flushUmamiEvents()) return;

    flushAttempts += 1;
    if (flushAttempts < 20) {
      scheduleUmamiFlush();
    }
  }, 250);
}

function trackUmami(eventName, data) {
  if (!canUseAnalytics()) return false;
  loadUmamiScript();

  if (canUseUmami()) {
    sendToUmami(eventName, data);
    flushUmamiEvents();
    return true;
  }

  pendingUmamiEvents.push({ eventName, data });
  scheduleUmamiFlush();
  return false;
}

export function trackEvent(eventName, data = {}) {
  if (import.meta.env.DEV) {
    console.log(`[Mascate Analytics] ${eventName}`, data);
  }

  if (!canUseAnalytics()) {
    if (import.meta.env.DEV) {
      console.log(`[Mascate Analytics] ${eventName} bloqueado ate consentimento.`);
    }
    return;
  }

  if (trackUmami(eventName, data)) {
    return;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, data);
    return;
  }

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, data);
  }
}

export function trackPageView() {
  if (typeof window === 'undefined' || !canUseAnalytics()) return;

  loadUmamiScript();
  trackUmami();

  const params = new URLSearchParams(window.location.search);

  trackEvent('page_view', {
    referrer: document.referrer || null,
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
  });
}

export function trackInterestClick(location, extraData = {}) {
  trackEvent('interesse_botao_clicado', {
    location,
    ...extraData,
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener(ANALYTICS_CONSENT_EVENT, (event) => {
    if (event.detail?.value === 'accepted') {
      loadUmamiScript();
      scheduleUmamiFlush();
      return;
    }

    pendingUmamiEvents.length = 0;
  });
}
