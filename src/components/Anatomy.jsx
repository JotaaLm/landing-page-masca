import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

export default function Anatomy() {
  const solutions = [
    {
      eyebrow: 'PARA SEU WHATSAPP',
      title: 'Vendedor IA que atende e fecha pedidos',
      text: 'Responde em segundos, entende o pedido, sugere complementos e chama um humano quando precisa.',
      cta: 'Reservar vaga no beta',
      visual: 'whatsapp',
      featured: true,
    },
    {
      eyebrow: 'PARA SUA OPERAÇÃO',
      title: 'Estoque sincronizado em tempo real',
      text: 'Cada venda atualiza o painel automaticamente para evitar ruptura, pedido furado e retrabalho.',
      cta: 'Conhecer solução',
      visual: 'stock',
    },
    {
      eyebrow: 'PARA DELIVERY',
      title: 'Pedidos organizados até a entrega',
      text: 'Endereço, status, frete e histórico ficam em uma jornada única do WhatsApp ao painel.',
      cta: 'Ver funcionamento',
      visual: 'delivery',
    },
  ];

  const featureSteps = [
    ['Capture e responda', 'Abordagem instantânea para não deixar o cliente esperando.', 'chat'],
    ['Recomende melhor', 'Sugestões de combos e produtos complementares durante a conversa.', 'spark'],
    ['Controle estoque', 'Venda apenas o que existe e evite cancelamentos por ruptura.', 'box'],
    ['Distribua pedidos', 'Organize status, prioridade e repasse para o time certo.', 'route'],
    ['Analise os resultados', 'Entenda atendimentos, produtos mais pedidos e gargalos.', 'chart'],
    ['Assuma quando quiser', 'Humano entra na conversa sem perder contexto.', 'user'],
  ];

  const featureIcons = {
    chat: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.3 9.5 9.5 0 0 1-3.9-.8L3 20l1.1-4.2A8.1 8.1 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
        <path d="M8 11h8M8 14h5" />
      </svg>
    ),
    spark: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
        <path d="m18 15 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z" />
      </svg>
    ),
    box: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" />
        <path d="M4.5 8 12 12.2 19.5 8M12 21v-8.8" />
      </svg>
    ),
    route: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM19 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M7 16h4.5a3.5 3.5 0 0 0 0-7H17" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 19V5" />
        <path d="M8 17v-5M13 17V8M18 17v-8" />
        <path d="M4 19h17" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M4 20a8 8 0 0 1 16 0" />
      </svg>
    ),
  };

  function renderSolutionVisual(type) {
    if (type === 'stock') {
      return (
        <div className="inventory-visual">
          <div className="inventory-shelf">
            <span />
            <span />
            <span />
          </div>
          <div className="inventory-sync">
            <span>12</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 1-15.5 6.2" />
              <path d="M3 12A9 9 0 0 1 18.5 5.8" />
              <path d="M18 2v4h4" />
              <path d="M6 22v-4H2" />
            </svg>
          </div>
        </div>
      );
    }

    if (type === 'delivery') {
      return (
        <div className="delivery-board">
          <div className="delivery-board-header">
            <span>Pedido #248</span>
            <strong>Em rota</strong>
          </div>
          <div className="delivery-steps">
            <span className="done">Itens</span>
            <span className="done">Endereço</span>
            <span>Entrega</span>
          </div>
          <div className="delivery-progress">
            <span />
          </div>
        </div>
      );
    }

    return (
      <div className="mini-chat">
        <span />
        <span />
        <span />
      </div>
    );
  }

  function handleClick(source) {
    trackEvent(`cta_click_${source}`);
    trackInterestClick(source);
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="solutions-section" id="anatomia">
      <div className="container">
        <span id="solucoes" className="anchor-target" aria-hidden="true" />
        <div className="solution-grid">
          {solutions.map((solution, index) => (
            <article className={`solution-card reveal reveal-delay-${index + 1}${solution.featured ? ' featured' : ''}`} key={solution.title}>
              <div className={`solution-visual visual-${solution.visual}`} aria-hidden="true">
                {renderSolutionVisual(solution.visual)}
              </div>
              <p>{solution.eyebrow}</p>
              <h3>{solution.title}</h3>
              <small>{solution.text}</small>
              <button onClick={() => handleClick(`solution_${index + 1}`)}>
                {solution.cta}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </article>
          ))}
        </div>

        <div className="section-heading">
          <p className="section-label">CONHEÇA A MASCA</p>
          <h2 className="section-title">Otimização completa da conversa até a entrega</h2>
        </div>

        <div className="feature-lattice">
          {featureSteps.map(([title, text, icon], index) => (
            <article className="lattice-item" key={title}>
              <div className="lattice-top">
                <span className="lattice-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="lattice-icon">{featureIcons[icon]}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
