export default function PainPoints() {
  const facts = [
    'Mensagens chegam quando ninguém está olhando',
    'Clientes desistem antes do primeiro atendimento',
    'Estoque manual cria pedidos impossíveis de entregar',
  ];

  return (
    <section className="pain-section" id="diagnostico">
      <div className="container pain-wrap">
        <div className="stat-hero reveal">
          <h2><span>7 em cada 10</span> pedidos iniciados no WhatsApp não viram vendas</h2>
          <p>Quando resposta, estoque e fechamento dependem de trabalho manual, a operação perde dinheiro exatamente no momento em que o cliente queria comprar.</p>
        </div>

        <div className="fact-pills reveal reveal-delay-2">
          {facts.map((fact) => (
            <div className="fact-pill" key={fact}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <path d="M12 9v4M12 17h.01" />
              </svg>
              <span>{fact}</span>
            </div>
          ))}
        </div>

        <p className="section-label reveal reveal-delay-3">AGENTES DE IA FOCADOS EM VENDA</p>
        <h2 className="section-title centered reveal reveal-delay-4">
          Aumente a performance da sua loja operando 24/7
        </h2>
      </div>
    </section>
  );
}
