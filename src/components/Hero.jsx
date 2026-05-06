import { useRef, useEffect } from 'react';
import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

export default function Hero() {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    // Estado inicial: V1 visível e tocando, V2 oculto e pausado
    v1.style.opacity = '0.3';
    v2.style.opacity = '0';
    v1.play().catch(e => console.log(e));

    const handleTimeUpdate = (e) => {
      const activeVid = e.target;
      const nextVid = activeVid === v1 ? v2 : v1;
      
      // Quando faltar 1 segundo para acabar, fazemos um Crossfade (transição suave)
      if (activeVid.duration && activeVid.currentTime >= activeVid.duration - 1.0) {
        if (nextVid.paused) {
          nextVid.currentTime = 0;
          nextVid.play();
          // Inicia o fade cruzado via CSS transition
          nextVid.style.opacity = '0.3';
          activeVid.style.opacity = '0';
        }
      }
    };

    const handleEnded = (e) => {
      e.target.pause();
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
  }, []);

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

          <p className="hero-tag reveal reveal-delay-1">// MASCA.AI — ASSISTENTE DE VENDAS E GESTÃO PARA VAREJO E DELIVERY</p>

          <h1 className="reveal reveal-delay-2">
            Transforme seu WhatsApp em uma{' '}
            <span className="highlight">máquina de vendas automática.</span>
          </h1>

          <p className="hero-sub reveal reveal-delay-3">
            A IA do Masca atende, gerencia seu estoque e fecha pedidos 24h por dia. Chega de perder vendas por demora no atendimento.
          </p>

          <button
            className="hero-cta reveal reveal-delay-4"
            onClick={handleCtaClick}
            id="hero-cta-testar"
          >
            Testar Gratuitamente
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

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
              <span className="hero-metric-label">Atrasos no Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
