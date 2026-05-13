export default function ComparisonTable() {
  const resources = [
    ['Análise de intenção do cliente', 'intent'],
    ['Engajamento de visitantes indecisos', 'engage'],
    ['Abordagem personalizada', 'personal'],
    ['Qualificação automática de pedidos', 'qualify'],
    ['Conversas contextuais', 'context'],
    ['Distribuição para atendimento humano', 'handoff'],
    ['Atendimento 24/7', 'always'],
    ['Relatórios completos', 'reports'],
  ];

  const icons = {
    intent: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
        <path d="M17 7 7 17" />
      </svg>
    ),
    engage: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 12a8 8 0 0 1 15.5-2.8" />
        <path d="M20 4v5h-5" />
        <path d="M20 12a8 8 0 0 1-15.5 2.8" />
        <path d="M4 20v-5h5" />
      </svg>
    ),
    personal: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 14.2 8l5.3.5-4 3.5 1.2 5.2L12 14.5l-4.7 2.7L8.5 12l-4-3.5L9.8 8 12 3Z" />
      </svg>
    ),
    qualify: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 5h14v14H5z" />
        <path d="m8 12 2.3 2.3L16 8.8" />
      </svg>
    ),
    context: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16M4 12h10M4 18h7" />
        <path d="M18 15v6M15 18h6" />
      </svg>
    ),
    handoff: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M17 21a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M10 8h4.5A3.5 3.5 0 0 1 18 11.5V13" />
      </svg>
    ),
    always: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 6v6l4 2" />
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 4v6h-6" />
      </svg>
    ),
    reports: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 19V5" />
        <path d="M9 17v-5M14 17V8M19 17v-8" />
        <path d="M5 19h16" />
      </svg>
    ),
  };

  return (
    <section className="resources-section" id="recursos">
      <div className="container resource-wrap">
        <div className="resource-copy reveal">
          <p className="section-label">E AINDA MAIS</p>
          <h2 className="section-title">Recursos avançados para acelerar seu funil de vendas</h2>
          <p className="section-subtitle">
            Uma infraestrutura conversacional para transformar intenção de compra em pedido organizado.
          </p>
        </div>
        <div className="resource-list reveal reveal-delay-2">
          {resources.map(([resource, icon]) => (
            <span key={resource}>
              <i>{icons[icon]}</i>
              {resource}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
