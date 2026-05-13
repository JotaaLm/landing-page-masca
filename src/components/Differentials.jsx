export default function Differentials() {
  const blocks = [
    {
      tag: 'CHAT AO VIVO',
      title: 'Atendimento humano no momento certo',
      text: 'Se a conversa pedir negociação, exceção ou atenção humana, o time assume com todo o histórico preservado.',
      metric: '5s',
      metricLabel: 'para responder automaticamente',
      visual: 'chat',
    },
    {
      tag: 'PEDIDOS AUTOMÁTICOS',
      title: 'Pedido completo direto no WhatsApp',
      text: 'A IA confirma itens, quantidades, endereço, observações e entrega um pedido pronto para produção.',
      metric: '0',
      metricLabel: 'informações perdidas no caminho',
      visual: 'order',
    },
    {
      tag: 'ESTOQUE E UPSELL',
      title: 'Recomendações que respeitam sua operação',
      text: 'A Masca sugere apenas produtos disponíveis e usa combos para aumentar o valor do carrinho.',
      metric: '+30%',
      metricLabel: 'potencial de ticket médio',
      visual: 'upsell',
    },
    {
      tag: 'DASHBOARD',
      title: 'Visão clara da rotina comercial',
      text: 'Acompanhe conversas, produtos, pedidos e oportunidades sem depender de prints e planilhas.',
      metric: '24/7',
      metricLabel: 'operação monitorada',
      visual: 'dashboard',
    },
  ];

  function renderVisual(type) {
    if (type === 'chat') {
      return (
        <>
          <div className="visual-topline">
            <span />
            <span />
            <span />
          </div>
          <div className="chat-flow">
            <span className="chat-pill client">Cliente pediu desconto</span>
            <span className="chat-pill ai">IA reuniu contexto</span>
            <span className="chat-pill human">Time assumiu</span>
          </div>
          <div className="live-handoff">
            <span className="live-dot" />
            Handoff ativo
          </div>
        </>
      );
    }

    if (type === 'order') {
      return (
        <>
          <div className="order-card">
            {['Itens', 'Endereço', 'Entrega'].map((item, index) => (
              <div className="order-line" key={item} style={{ '--delay': `${index * 0.22}s` }}>
                <span className="order-check" />
                <strong>{item}</strong>
              </div>
            ))}
          </div>
          <div className="order-progress">
            <span />
          </div>
        </>
      );
    }

    if (type === 'upsell') {
      return (
        <>
          <div className="product-stack">
            <div className="product-chip primary">Whey</div>
            <div className="product-chip">Creatina</div>
            <div className="product-chip">Coqueteleira</div>
          </div>
          <div className="combo-link">
            <span>Combo sugerido</span>
            <strong>+R$ 86</strong>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="dashboard-mini">
          <div className="dashboard-chart">
            <span style={{ '--height': '42%' }} />
            <span style={{ '--height': '68%' }} />
            <span style={{ '--height': '52%' }} />
            <span style={{ '--height': '84%' }} />
          </div>
          <div className="dashboard-feed">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="dashboard-status">
          <span className="live-dot" />
          Painel em tempo real
        </div>
      </>
    );
  }

  return (
    <section className="diff-section" id="diferenciais">
      <div className="container">
        <div className="section-heading reveal">
          <p className="section-label">FUNCIONALIDADES PARA CONVERSÃO</p>
          <h2 className="section-title">Uma operação fluida com as ferramentas que sua loja já usa</h2>
        </div>

        <div className="feature-showcase">
          {blocks.map((block, index) => (
            <article className={`showcase-row reveal reveal-delay-${(index % 3) + 1}`} key={block.title}>
              <div className="showcase-copy">
                <p>{block.tag}</p>
                <h3>{block.title}</h3>
                <small>{block.text}</small>
              </div>
              <div className={`showcase-screen visual-${block.visual}`} aria-hidden="true">
                {renderVisual(block.visual)}
              </div>
              <div className="showcase-metric">
                <strong>{block.metric}</strong>
                <span>{block.metricLabel}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
