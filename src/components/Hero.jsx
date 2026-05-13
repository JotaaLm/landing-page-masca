import { useEffect, useMemo, useState } from 'react';
import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';
import MascotRobot from './MascotRobot';

export default function Hero() {
  const phrases = useMemo(() => [
    'atendimento automático',
    'estoque sincronizado',
    'pedidos organizados',
    'upsell inteligente',
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
          aria-label="Ver próxima etapa de automação"
        >
          <div className="automation-header">
            <span className="automation-pulse" />
            <strong>Automação ao vivo</strong>
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
          <p className="hero-tag reveal reveal-delay-1">VENDEDOR IA PARA WHATSAPP, ESTOQUE E DELIVERY</p>
          <h1 className="reveal reveal-delay-2">
            <span className="headline-neutral">Gere mais vendas</span>
            <span className="headline-neutral">com</span>
            <span className="typed-line">
              <span className="typed-text">{typedText}</span>
            </span>
          </h1>
          <p className="hero-sub reveal reveal-delay-3">
            A Masca atende clientes em segundos, recomenda produtos, monta pedidos e sincroniza o estoque
            para sua loja vender mesmo quando o time está ocupado.
          </p>
          <button className="hero-cta reveal reveal-delay-4" onClick={handleCtaClick}>
            Reservar vaga no beta
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
