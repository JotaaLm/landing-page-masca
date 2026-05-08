export default function Anatomy() {
  const pillars = [
    {
      num: '01',
      tag: 'LOJA VIRTUAL NO WHATSAPP',
      title: 'Sua vitrine dentro da conversa',
      text: 'O cliente acessa seu catálogo completo direto no WhatsApp — com fotos, preços e descrições. Ele escolhe, monta o pedido e finaliza sem sair do chat.',
      stack: ['Catálogo Digital', 'Fotos de Produto', 'Carrinho no Chat', 'Checkout Direto'],
    },
    {
      num: '02',
      tag: 'VENDEDOR IA 24/7',
      title: 'Atende, recomenda e fecha a venda',
      text: 'A IA conversa de forma natural, tira dúvidas, sugere produtos complementares e finaliza o pedido com endereço e frete — enquanto você dorme ou cuida do negócio.',
      stack: ['Atendimento Instantâneo', 'Upsell Inteligente', 'Frete Automático', 'Controle Humano'],
    },
    {
      num: '03',
      tag: 'PAINEL DE GESTÃO',
      title: 'Estoque, pedidos e entregas num só lugar',
      text: 'Controle estoque em tempo real, acompanhe cada pedido por status e gerencie entregas — tudo sincronizado com o WhatsApp. Vendeu? O estoque atualiza sozinho.',
      stack: ['Estoque em Tempo Real', 'Gestão de Pedidos', 'Logística', 'Relatórios'],
    },
  ];

  return (
    <section className="anatomy-section" id="anatomia">
      <div className="container">
        <p className="section-label reveal">COMO FUNCIONA</p>
        <h2 className="section-title reveal reveal-delay-1">
          Três módulos. Uma plataforma completa.
        </h2>
        <p className="section-subtitle reveal reveal-delay-2">
          Loja, vendedor IA e gestão — tudo conectado. Cada módulo funciona
          integrado para você vender mais sem esforço.
        </p>

        <div className="anatomy-agents">
          {pillars.map((pillar, i) => (
            <article key={i} className={`agent-card reveal reveal-delay-${i + 1}`}>
              <div className="agent-number" aria-hidden="true">{pillar.num}</div>
              <div className="agent-content">
                <div className="agent-tag">{pillar.tag}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
                <div className="agent-stack">
                  {pillar.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
