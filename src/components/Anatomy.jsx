export default function Anatomy() {
  const pillars = [
    {
      num: '01',
      tag: 'ADMIN WEB',
      title: 'Sua operação e delivery num só painel',
      text: 'Cadastre produtos, controle estoque e estabeleça regras de entrega. Gerencie pedidos por status (novo, em preparo, em rota, entregue) em tempo real. Aprovações rápidas e visão completa da sua logística centralizada.',
      stack: ['Catálogo', 'Pedidos', 'Logística', 'Conversas Live', 'Aprovações'],
    },
    {
      num: '02',
      tag: 'AGENTE WHATSAPP',
      title: 'Seu Atendente Virtual 24 horas por dia',
      text: 'O Atendente Virtual interage de forma natural, lê o seu estoque em tempo real e atende rapidamente. Ele coleta o endereço de entrega, fecha o pedido perfeitamente e escala para você quando há regras especiais.',
      stack: ['WhatsApp', 'Recomendação', 'Human-in-the-loop', 'Checkout Fluido'],
    },
    {
      num: '03',
      tag: 'INTELIGÊNCIA DE VENDAS',
      title: 'Upsell automático e estoque sincronizado',
      text: 'Diferente de soluções comuns, a Masca.ai cruza os dados do seu catálogo em tempo real para sugerir o produto certo na hora certa, aumentando seu ticket médio. Acabou o estoque? Ele pausa a venda. Inteligência do primeiro "oi" até a entrega.',
      stack: ['Banco Unificado', 'Sync Instantâneo', 'Aumento de Ticket', 'Zero Delay'],
    },
  ];

  return (
    <section className="anatomy-section" id="anatomia">
      <div className="container">
        <p className="section-label reveal">// 02. COMO FUNCIONA</p>
        <h2 className="section-title reveal reveal-delay-1">
          Dois pilares. Um sistema integrado.
        </h2>
        <p className="section-subtitle reveal reveal-delay-2">
          A Masca.ai não é apenas um canal de mensagens. São dois módulos
          que compartilham a mesma inteligência — para que vendas e logística funcionem juntas.
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
