import { useRef, useEffect, useCallback } from 'react';
import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

export default function Hero() {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const activeRef = useRef(0);

  const startCrossfade = useCallback(() => {
    const videos = [video1Ref.current, video2Ref.current];
    const current = videos[activeRef.current];
    const next = videos[1 - activeRef.current];

    if (!current || !next) return;

    next.currentTime = 0;
    next.play().catch(() => {});

    next.style.opacity = '0.3';
    current.style.opacity = '0';

    activeRef.current = 1 - activeRef.current;

    setTimeout(() => current.pause(), 1200);
  }, []);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    v1.style.opacity = '0.3';
    v2.style.opacity = '0';
    v1.play().catch(() => {});

    let scheduled = false;

    const handleTimeUpdate = (e) => {
      const vid = e.target;
      if (!vid.duration || scheduled) return;

      const remaining = vid.duration - vid.currentTime;
      if (remaining <= 1.2 && remaining > 0) {
        scheduled = true;
        startCrossfade();
      }
    };

    const handleEnded = (e) => {
      e.target.pause();
      scheduled = false;
    };

    v1.addEventListener('timeupdate', handleTimeUpdate);
    v2.addEventListener('timeupdate', handleTimeUpdate);
    v1.addEventListener('ended', handleEnded);
    v2.addEventListener('ended', handleEnded);

    return () => {
      v1.removeEventListener('timeupdate', handleTimeUpdate);
      v2.removeEventListener('timeupdate', handleTimeUpdate);
      v1.removeEventListener('ended', handleEnded);
      v2.removeEventListener('ended', handleEnded);
    };
  }, [startCrossfade]);

  function handleCtaClick() {
    trackEvent('cta_click_testar_hero');
    trackInterestClick('hero');
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-video-bg">
        <video
          ref={video1Ref}
          autoPlay
          muted
          playsInline
          className="hero-video-element"
          aria-hidden="true"
        >
          <source src="/mp_.mp4" type="video/mp4" />
        </video>
        <video
          ref={video2Ref}
          muted
          playsInline
          className="hero-video-element"
          aria-hidden="true"
        >
          <source src="/mp_.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-beta-badge reveal">
            <span className="beta-dot" aria-hidden="true" />
            Beta Fechado — Vagas Limitadas
          </div>

          <p className="hero-tag reveal reveal-delay-1">SUA LOJA VIRTUAL COMPLETA DENTRO DO WHATSAPP — COM VENDEDOR IA E GESTÃO DE ESTOQUE</p>

          <h1 className="reveal reveal-delay-2">
            Seu WhatsApp vira uma{' '}
            <span className="highlight">máquina de vendas que nunca dorme.</span>
          </h1>

          <p className="hero-sub reveal reveal-delay-3">
            Um vendedor IA que atende seus clientes em 5 segundos, recomenda
            produtos complementares e fecha pedidos no automático — enquanto
            o painel cuida do estoque e da logística para você.
          </p>

          <div className="hero-ctas reveal reveal-delay-4">
            <button
              className="hero-cta"
              onClick={handleCtaClick}
              id="hero-cta-testar"
            >
              Começar Teste Grátis
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="hero-metrics reveal reveal-delay-4">
            <div className="hero-metric">
              <span className="hero-metric-value">24/7</span>
              <span className="hero-metric-label">Atendimento IA</span>
            </div>
            <div className="hero-metric">
              <span className="hero-metric-value">&lt;5s</span>
              <span className="hero-metric-label">Tempo de resposta</span>
            </div>
            <div className="hero-metric">
              <span className="hero-metric-value">+30%</span>
              <span className="hero-metric-label">No Ticket Médio</span>
            </div>
            <div className="hero-metric">
              <span className="hero-metric-value">0</span>
              <span className="hero-metric-label">Vendas furadas por mês</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
