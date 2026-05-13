export default function Differentials() {
  const blocks = [
    {
      tag: 'CHAT AO VIVO',
      title: 'Atendimento humano no momento certo',
      text: 'Se a conversa pedir negociação, exceção ou atenção humana, o time assume com todo o histórico preservado.',
      metric: '5s',
      metricLabel: 'para responder automaticamente',
    },
    {
      tag: 'PEDIDOS AUTOMÁTICOS',
      title: 'Pedido completo direto no WhatsApp',
      text: 'A IA confirma itens, quantidades, endereço, observações e entrega um pedido pronto para produção.',
      metric: '0',
      metricLabel: 'informações perdidas no caminho',
    },
    {
      tag: 'ESTOQUE E UPSELL',
      title: 'Recomendações que respeitam sua operação',
      text: 'A Masca sugere apenas produtos disponíveis e usa combos para aumentar o valor do carrinho.',
      metric: '+30%',
      metricLabel: 'potencial de ticket médio',
    },
    {
      tag: 'DASHBOARD',
      title: 'Visão clara da rotina comercial',
      text: 'Acompanhe conversas, produtos, pedidos e oportunidades sem depender de prints e planilhas.',
      metric: '24/7',
      metricLabel: 'operação monitorada',
    },
  ];

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
              <div className="showcase-screen" aria-hidden="true">
                <div className="screen-bar" />
                <div className="screen-bubble wide" />
                <div className="screen-bubble" />
                <div className="screen-bubble alt" />
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
