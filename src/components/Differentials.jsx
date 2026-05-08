export default function Differentials() {
  const diffs = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
        </svg>
      ),
      title: 'Sem gambiarra, sem queda',
      text: 'Integração robusta com o WhatsApp — nada de APIs não-oficiais que travam. Sua operação roda 24/7 sem risco de perder o número ou cair no pico de vendas.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      title: 'Você aprova, a IA executa',
      text: 'A IA trabalha com você. Se o cliente pedir um desconto especial ou houver uma dúvida atípica, a IA pausa e aguarda sua aprovação. Controle total da operação sem gargalos.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: 'Upsell que respeita seu estoque',
      text: 'A IA consulta o estoque em tempo real antes de recomendar. Só sugere o que você tem. Resultado: mais vendas por pedido, zero frustração do cliente.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: 'Resposta em menos de 5 segundos',
      text: 'Alta velocidade para garantir que o cliente não desista. Ele manda mensagem e já é atendido, retendo a atenção no momento exato de intenção de compra.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      ),
      title: 'Aguenta seu pico de vendas',
      text: 'Promoção bombou? Sem problema. Arquitetura em nuvem que escala automaticamente para aguentar qualquer volume — sem lentidão, sem queda.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: 'Feed de conversas em tempo real',
      text: 'Veja todas as conversas do Atendente Virtual ao vivo no painel. Pause a IA em qualquer chat para assumir manualmente, e retome quando quiser sem perder o ritmo.',
    },
  ];

  return (
    <section className="diff-section" id="diferenciais">
      <div className="container">
        <p className="section-label reveal">DIFERENCIAIS</p>
        <h2 className="section-title reveal reveal-delay-1">
          Por que lojistas escolhem a Masca
        </h2>
        <p className="section-subtitle reveal reveal-delay-2">
          Cada detalhe foi pensado para quem vende pelo WhatsApp e precisa de controle total da operação.
        </p>

        <div className="diff-grid">
          {diffs.map((diff, i) => (
            <article key={i} className={`diff-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="diff-icon" aria-hidden="true">{diff.icon}</div>
              <h3>{diff.title}</h3>
              <p>{diff.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
