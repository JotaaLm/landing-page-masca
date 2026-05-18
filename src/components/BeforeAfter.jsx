import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';
import MascotRobot from './MascotRobot';

export default function BeforeAfter() {
  const oldWay = [
    'Resposta lenta quando o cliente quer comprar',
    'Informações espalhadas em conversas e planilhas',
    'Cliente repetindo informações',
    'Sem recomendação de produto no momento certo',
    'Dono e equipe sempre correndo atrás',
  ];

  const newWay = [
    'Atendimento rápido no WhatsApp',
    'Dúvidas respondidas sem fila',
    'Pedido mais claro para finalizar',
    'Recomendações para aumentar o carrinho',
    'Equipe focada nas melhores oportunidades',
  ];

  function handleClick() {
    trackEvent('cta_click_before_after');
    trackInterestClick('before-after');
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="before-after-section" id="antes-depois">
      <div className="container">
        <p className="section-label centered reveal">SEU NOVO JEITO DE VENDER NO WHATSAPP</p>
        <h2 className="section-title centered reveal reveal-delay-1">
          Diga adeus ao jeito antigo de vender pelo WhatsApp
        </h2>
        <p className="section-subtitle centered reveal reveal-delay-2">
          O Masca transforma conversas soltas em atendimento rápido, recomendações melhores e pedidos mais organizados.
        </p>

        <div className="compare-panels">
          <article className="compare-panel old reveal reveal-delay-1">
            <p>SEM O MASCA</p>
            <h3>O jeito antigo</h3>
            <ul>
              {oldWay.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>

          <article className="compare-panel new reveal reveal-delay-2">
            <MascotRobot className="compare-mascot" />
            <p>COM O MASCA</p>
            <h3>O jeito novo</h3>
            <ul>
              {newWay.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>

        <div className="center-cta reveal reveal-delay-3">
          <button className="hero-cta" onClick={handleClick}>
            Quero vender mais pelo WhatsApp
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
