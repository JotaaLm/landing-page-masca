export default function PainPoints() {
  const pains = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
      title: 'Cliente mandou mensagem às 23h. Ninguém viu.',
      text: 'Enquanto você descansa, seu concorrente que tem atendimento automático já fechou a venda. Cada mensagem sem resposta é uma venda que nunca mais volta.',
      stat: '78% dos clientes compram de quem responde primeiro',
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
      title: 'Vendeu 5, mas só tinha 2 em estoque.',
      text: 'Resultado: ligar pro cliente, pedir desculpa e devolver o dinheiro. Estoque desatualizado queima sua reputação e come seu lucro toda semana.',
      stat: 'Cada venda furada custa 3x o valor do produto',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: 'Seus atendentes vendem só o que o cliente pede.',
      text: 'Cliente pediu um produto e levou só ele. Sem sugestão de combo, sem oferta complementar. Seu ticket médio estagna enquanto a margem poderia ser 30% maior.',
      stat: 'Sem upsell automático = dinheiro na mesa todo dia',
    },
  ];

  return (
    <section className="pain-section" id="diagnostico">
      <div className="container">
        <p className="section-label reveal">O PROBLEMA</p>
        <h2 className="section-title reveal reveal-delay-1">
          Isso está acontecendo na sua loja agora.
        </h2>
        <p className="section-subtitle reveal reveal-delay-2">
          Se você vende pelo WhatsApp e faz delivery, pelo menos um desses cenários está te custando dinheiro hoje.
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
