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
            <div className="dead-robot" aria-hidden="true">
              <svg viewBox="0 0 160 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 34V18" stroke="#9da3ad" strokeWidth="5" strokeLinecap="round" />
                <circle cx="80" cy="14" r="7" fill="#b7bdc7" stroke="#8d94a0" strokeWidth="3" />
                <rect x="42" y="34" width="76" height="54" rx="18" fill="#d9dde4" stroke="#8d94a0" strokeWidth="5" />
                <rect x="58" y="51" width="44" height="18" rx="9" fill="#eef1f5" stroke="#a8aeb8" strokeWidth="3" />
                <path d="m64 54 10 10m0-10L64 64M86 54l10 10m0-10L86 64" stroke="#6f7682" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M70 78h20" stroke="#8d94a0" strokeWidth="4" strokeLinecap="round" />
                <rect x="55" y="88" width="50" height="40" rx="14" fill="#c6ccd5" stroke="#8d94a0" strokeWidth="5" />
                <path d="M55 101H40M105 101h15" stroke="#8d94a0" strokeWidth="5" strokeLinecap="round" />
                <circle cx="35" cy="101" r="7" fill="#d9dde4" stroke="#8d94a0" strokeWidth="4" />
                <circle cx="125" cy="101" r="7" fill="#d9dde4" stroke="#8d94a0" strokeWidth="4" />
                <path d="M69 128v10M91 128v10" stroke="#8d94a0" strokeWidth="5" strokeLinecap="round" />
                <path d="m121 31 9-9m0 9-9-9" stroke="#9da3ad" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
              </svg>
            </div>
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
