const pendingUmamiEvents = [];
let flushTimer = null;
let flushAttempts = 0;

function canUseUmami() {
  return typeof window !== 'undefined' && typeof window.umami?.track === 'function';
}

function sendToUmami(eventName, data) {
  if (eventName) {
    window.umami.track(eventName, data);
    return;
  }

  window.umami.track();
}

function flushUmamiEvents() {
  if (!canUseUmami()) return false;

  while (pendingUmamiEvents.length > 0) {
    const { eventName, data } = pendingUmamiEvents.shift();
    sendToUmami(eventName, data);
  }

  flushAttempts = 0;
  return true;
}

function scheduleUmamiFlush() {
  if (typeof window === 'undefined' || flushTimer) return;

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
