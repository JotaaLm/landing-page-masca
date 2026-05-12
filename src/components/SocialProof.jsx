export default function SocialProof() {
  const stories = [
    {
      name: 'Marina Alves',
      role: 'Operadora de delivery',
      quote: 'A maior diferença foi parar de perder cliente por demora. A Masca responde, monta o pedido e deixa meu time só validar o que importa.',
      metricA: '+41%',
      labelA: 'pedidos no WhatsApp',
      metricB: '18%',
      labelB: 'mais ticket médio',
    },
    {
      name: 'Rafael Mendes',
      role: 'Varejo local',
      quote: 'Antes eu vendia e depois descobria que não tinha produto. Agora estoque e conversa andam juntos.',
      metricA: '0',
      labelA: 'pedidos furados',
      metricB: '3h',
      labelB: 'economizadas por dia',
    },
    {
      name: 'Bianca Costa',
      role: 'Cosméticos e assinatura',
      quote: 'Os combos automáticos aumentaram o carrinho sem parecer empurrados. O cliente recebe uma sugestão útil.',
      metricA: '+27%',
      labelA: 'valor por pedido',
      metricB: '24/7',
      labelB: 'atendimento ativo',
    },
  ];

  return (
    <section className="social-proof-section" id="resultados">
      <div className="container">
        <p className="section-label centered reveal">GERAR MAIS RESULTADO É O PRINCIPAL DIFERENCIAL</p>
        <h2 className="section-title centered reveal reveal-delay-1">Operações menores também podem vender como gente grande</h2>

        <div className="testimonial-grid">
          {stories.map((story, index) => (
            <article className={`testimonial-card reveal reveal-delay-${index + 1}`} key={story.name}>
              <div className="testimonial-avatar" aria-hidden="true">{story.name.charAt(0)}</div>
              <blockquote>{story.quote}</blockquote>
              <div className="testimonial-author">
                <strong>{story.name}</strong>
                <span>{story.role}</span>
              </div>
              <div className="testimonial-metrics">
                <div>
                  <strong>{story.metricA}</strong>
                  <span>{story.labelA}</span>
                </div>
                <div>
                  <strong>{story.metricB}</strong>
                  <span>{story.labelB}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
