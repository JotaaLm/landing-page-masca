export default function PainPoints() {
  const pains = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
      title: 'WhatsApp congestionado e vendas perdidas',
      text: 'Você responde as mesmas dúvidas o dia inteiro. Nos horários de pico ou fins de semana, o cliente sem resposta imediata acaba comprando do concorrente.',
      stat: 'Atendimento manual limita o seu faturamento',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
      title: 'Estoque desorganizado e sem upsell',
      text: 'Sem uma integração inteligente, você vende o que não tem em estoque e perde oportunidades claras de recomendar produtos complementares para aumentar o ticket.',
      stat: 'Oportunidades de lucro ignoradas',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
      title: 'A gestão do delivery virou um caos',
      text: 'Acompanhar pedidos, repassar endereços e organizar o fluxo de entregas consome horas da sua operação. A logística e o atendimento não se conversam.',
      stat: 'Processos manuais travam a sua escala',
    },
  ];

  return (
    <section className="pain-section" id="diagnostico">
      <div className="container">
        <p className="section-label reveal">// 01. DIAGNÓSTICO</p>
        <h2 className="section-title reveal reveal-delay-1">
          O que está travando a sua loja e o seu delivery
        </h2>
        <p className="section-subtitle reveal reveal-delay-2">
          Se você gerencia um alto volume de mensagens e entregas, já sente esses gargalos. A questão não é se — é quando eles vão parar seu crescimento.
        </p>

        <div className="pain-grid">
          {pains.map((pain, i) => (
            <article key={i} className={`pain-card reveal reveal-delay-${i + 1}`}>
              <div className="pain-icon" aria-hidden="true">{pain.icon}</div>
              <h3>{pain.title}</h3>
              <p>{pain.text}</p>
              <div className="pain-stat">{pain.stat}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
