export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'O cliente manda mensagem',
      text: 'Ele descobre sua loja pelo Instagram ou outro canal, clica para falar no WhatsApp e é recebido na hora pelo Atendente Virtual.',
    },
    {
      num: '02',
      title: 'A IA recomenda e faz o upsell',
      text: 'O Atendente Virtual entende o que o cliente quer, analisa seu catálogo em tempo real e já sugere produtos complementares para aumentar o valor da compra.',
    },
    {
      num: '03',
      title: 'Pedido fechado e entrega organizada',
      text: 'A IA coleta o endereço, apresenta os custos de frete e opções de pagamento. O pedido cai estruturado no seu painel, pronto para o despacho.',
    },
    {
      num: '04',
      title: 'Você tem a palavra final',
      text: 'Situação fora do padrão ou solicitação atípica? A IA pausa a conversa para você avaliar. Com um clique, você aprova ou responde e a IA continua trabalhando.',
    },
  ];

  return (
    <section className="journey-section" id="jornada">
      <div className="container">
        <p className="section-label reveal">JORNADA DE COMPRA</p>
        <h2 className="section-title reveal reveal-delay-1">
          Do primeiro "oi" ao pedido entregue.
        </h2>
        <p className="section-subtitle reveal reveal-delay-2">
          Veja como uma venda flui no Masca.ai — garantindo que a sua loja feche mais pedidos e organize as entregas sem depender da sua atenção constante.
        </p>

        <div className="journey-steps">
          {steps.map((step, i) => (
            <div key={i} className={`journey-step reveal reveal-delay-${i + 1}`}>
              <div className="journey-num" aria-hidden="true">{step.num}</div>
              <div className="journey-content">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="journey-connector" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
