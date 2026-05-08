import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

export default function SocialProof() {
  function handleCtaClick() {
    trackEvent('cta_click_social_proof');
    trackInterestClick('social-proof');
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="social-proof-section" id="social-proof">
      <div className="container">
        <p className="section-label reveal">RESULTADO REAL</p>
        <h2 className="section-title reveal reveal-delay-1">
          Quem testou não voltou atrás
        </h2>

        <div className="sp-testimonial reveal reveal-delay-2">
          <div className="sp-quote-mark" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" opacity="0.15">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <blockquote className="sp-quote">
            "A Masca mudou como a gente opera. Antes, perdia pedidos todo fim de semana. 
            Agora a IA atende, recomenda e nunca erra o estoque. O ticket médio subiu e a operação 
            ficou mais leve."
          </blockquote>
          <div className="sp-author">
            <div className="sp-avatar" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <span className="sp-author-name">Loja Parceira</span>
              <span className="sp-author-role">Beta tester — Varejo e Delivery</span>
            </div>
          </div>
        </div>

        <div className="sp-cta-block reveal reveal-delay-3">
          <p>Vagas limitadas para o Beta fechado. Comece seu teste gratuito agora.</p>
          <button className="hero-cta" onClick={handleCtaClick} id="sp-cta-btn">
            Testar Gratuitamente
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

