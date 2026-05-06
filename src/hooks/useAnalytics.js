/**
 * Analytics Insight — Rastreia eventos de conversão na landing page.
 *
 * Métricas rastreadas:
 *  - page_view: Abertura da landing page
 *  - cta_click_testar_hero: Clique CTA "Testar" no Hero
 *  - cta_click_testar_navbar: Clique CTA "Testar" no Nav
 *  - pricing_secao_visualizada: Scroll até seção de Preços
 *  - pricing_plano_selecionado: Clique em um plano
 *  - waitlist_modal_aberta: Modal de waitlist aberta
 *  - waitlist_email_enviado: Submit do e-mail na waitlist
 *  - lead_formulario_enviado: Submit do form completo
 *  - interesse_botao_clicado: Clique em botões de conversão
 */

// Re-exporta do AnalyticsService centralizado.
export { trackEvent, trackPageView as initPageViewTracking, trackInterestClick } from '../lib/analytics';
