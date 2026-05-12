export default function ComparisonTable() {
  const resources = [
    'Análise de intenção do cliente',
    'Engajamento de visitantes indecisos',
    'Abordagem personalizada',
    'Qualificação automática de pedidos',
    'Conversas contextuais',
    'Distribuição para atendimento humano',
    'Atendimento 24/7',
    'Relatórios completos',
  ];

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
          {resources.map((resource) => (
            <span key={resource}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {resource}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
