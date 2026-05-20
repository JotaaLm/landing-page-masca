import { useEffect, useMemo, useState } from 'react';
import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';
import MascotRobot from './MascotRobot';

export default function Hero() {
  const phrases = useMemo(() => [
    'mesmo dormindo?',
    'fora do expediente?',
    'com o time ocupado?',
    'sem perder clientes?',
  ], []);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState(phrases[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeAutomation, setActiveAutomation] = useState(0);
  const automations = [
    {
      label: 'Atende',
      message: 'Oi! Tem whey de baunilha disponível?',
      response: 'Olá! Tem sim. Separei o Whey Baunilha 900g. Posso montar seu pedido?',
      stat: '5s',
    },
    {
      label: 'Recomenda',
      message: 'Quero algo para tomar no pré-treino também.',
      response: 'Sugiro creatina 300g e coqueteleira. Podemos fechar o pedido com esses itens?',
      stat: '+ticket',
    },
    {
      label: 'Organiza',
      message: 'Pode entregar hoje no bairro Centro?',
      response: 'Frete calculado, Vamos prosseguir com o pedido e garantir a entrega para hoje.',
      stat: 'delivery',
    },
  ];

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const current = phrases[phraseIndex];
    let delay = isDeleting ? 34 : 58;

    if (!isDeleting && typedText === current) {
      delay = 1300;
    }

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && typedText === current) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && typedText === '') {
        const nextIndex = (phraseIndex + 1) % phrases.length;
        setIsDeleting(false);
        setPhraseIndex(nextIndex);
        setTypedText(phrases[nextIndex].slice(0, 1));
        return;
      }

      const nextLength = typedText.length + (isDeleting ? -1 : 1);
      setTypedText(current.slice(0, nextLength));
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, phraseIndex, phrases, typedText]);

  function handleCtaClick() {
    trackEvent('cta_click_testar_hero');
    trackInterestClick('hero');
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  }

  function nextAutomation() {
    setActiveAutomation((index) => (index + 1) % automations.length);
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-sheen" aria-hidden="true" />
      <div className="container hero-container">
        <div className="hero-orbit reveal">
          <MascotRobot className="hero-mascot" />
        </div>

        <button
          className="automation-demo reveal reveal-delay-2"
          onClick={nextAutomation}
          aria-label="Ver próxima etapa do agente"
        >
          <div className="automation-header">
            <span className="automation-pulse" />
            <strong>Agente em ação</strong>
            <small>{automations[activeAutomation].stat}</small>
          </div>
          <div className="automation-chat">
            <p className="chat-client">{automations[activeAutomation].message}</p>
            <p className="chat-ai">{automations[activeAutomation].response}</p>
          </div>
          <div className="automation-steps">
            {automations.map((item, index) => (
              <span
                key={item.label}
                className={index === activeAutomation ? 'active' : ''}
                onMouseEnter={() => setActiveAutomation(index)}
              >
                {item.label}
              </span>
            ))}
          </div>
        </button>

        <div className="hero-copy">
          <p className="hero-tag reveal reveal-delay-1">AGENTE INTELIGENTE PARA VENDER PELO WHATSAPP</p>
          <h1 className="reveal reveal-delay-2">
            <span className="headline-neutral">Já pensou vender 24 horas por dia,</span>
            <span className="headline-typed-line">
              <span className="typed-text">{typedText}</span>
            </span>
          </h1>
          <p className="hero-sub reveal reveal-delay-3">
            O Masca automatiza o WhatsApp da sua loja para atender clientes, recomendar produtos,
            montar pedidos e manter o estoque sincronizado enquanto seu time foca no que importa.
          </p>
          <button className="hero-cta reveal reveal-delay-4" onClick={handleCtaClick}>
            Reservar Vaga
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
