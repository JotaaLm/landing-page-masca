/**
 * AnalyticsService — Facade centralizada para analytics externo.
 *
 * Abstrai a ferramenta de analytics (Umami) para que os componentes
 * não conheçam a implementação. Se no futuro trocar de provider,
 * basta alterar este arquivo.
 *
 * Requisito: script do Umami carregado via <script> no index.html
 *            com data-auto-track="false" (controle manual total).
 *
 * ┌──────────────────────────────────────────────────────────────┐
 * │  MAPA DE EVENTOS (para consulta no dashboard Umami)         │
 * ├──────────────────────────────┬───────────────────────────────┤
 * │  Evento                     │  Quando dispara               │
 * ├──────────────────────────────┼───────────────────────────────┤
 * │  page_view                  │  Abertura da landing page     │
 * │  cta_click_testar_hero      │  Clique CTA "Testar" no Hero │
 * │  cta_click_testar_navbar    │  Clique CTA "Testar" no Nav  │
 * │  pricing_secao_visualizada  │  Scroll até seção de Preços   │
 * │  pricing_plano_selecionado  │  Clique em um plano (Agent/   │
 * │                             │  Scale)                       │
 * │  waitlist_modal_aberta      │  Modal de waitlist aberta     │
 * │  waitlist_email_enviado     │  Submit do e-mail na waitlist │
 * │  lead_formulario_enviado    │  Submit do form completo      │
 * │  interesse_botao_clicado    │  Clique em qualquer botão de  │
 * │                             │  interesse/CTA na página      │
 * └──────────────────────────────┴───────────────────────────────┘
 */

/**
 * Rastreia um evento customizado no Umami.
 * Falha silenciosa se o script ainda não carregou.
 *
 * @param {string} eventName - Nome do evento (ver tabela acima)
 * @param {Record<string, any>} [data] - Dados extras do evento
 */
export function trackEvent(eventName, data = {}) {
  // Debug em desenvolvimento
  if (import.meta.env.DEV) {
    console.log(`[Mascate Analytics] ${eventName}`, data);
  }

  // Umami: usa a API global `umami.track()`
  if (typeof window.umami !== 'undefined') {
    window.umami.track(eventName, data);
    return;
  }

  // Fallback: Se existir gtag (Google Analytics), dispara lá
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, data);
    return;
  }

  // Fallback: Se existir fbq (Meta Pixel), dispara lá
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, data);
  }
}

/**
 * Rastreia um page view com metadados de UTM e referrer.
 * Chamado uma vez na montagem do App.
 *
 * IMPORTANTE: Como data-auto-track="false", precisamos registrar
 * o page view manualmente via umami.track() sem argumentos,
 * além do nosso evento customizado com UTMs.
 */
export function trackPageView() {
  // Registra o page view nativo do Umami (aparece no dashboard principal)
  if (typeof window.umami !== 'undefined') {
    window.umami.track();
  }

  const params = new URLSearchParams(window.location.search);

  trackEvent('page_view', {
    referrer: document.referrer || null,
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
  });
}

/**
 * Rastreia clique em botão de interesse/CTA.
 * Chamado em qualquer botão de conversão para registrar
 * o interesse do visitante.
 *
 * @param {string} location - De onde veio o clique (ex: 'hero', 'navbar', 'pricing')
 * @param {Record<string, any>} [extraData] - Dados extras opcionais
 */
export function trackInterestClick(location, extraData = {}) {
  trackEvent('interesse_botao_clicado', {
    location,
    ...extraData,
  });
}
