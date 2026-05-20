export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'O cliente manda mensagem',
      text: 'Ele descobre sua loja pelo Instagram ou outro canal, clica para falar no WhatsApp e é recebido na hora pelo agente do Masca.',
    },
    {
      num: '02',
      title: 'O agente recomenda produtos',
      text: 'O agente do Masca entende o que o cliente quer e sugere produtos complementares para aumentar o valor da compra.',
    },
    {
      num: '03',
      title: 'Pedido fechado e entrega organizada',
      text: 'O agente coleta endereço, frete e observações. O pedido chega mais organizado, pronto para o próximo passo.',
    },
    {
      num: '04',
      title: 'Você tem a palavra final',
      text: 'Situação fora do padrão ou solicitação atípica? O agente passa a conversa para você avaliar e continuar com contexto.',
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
