export default function SocialProof() {
  const stories = [
    {
      name: 'Marina Alves',
      handle: '@marina.delivery',
      quote: 'Sério, eu achava normal perder cliente porque demorava pra responder. Agora o Masca já atende, monta o pedido e meu time só entra pra validar. Mudou o jogo por aqui.',
      metricA: '+41%',
      labelA: 'pedidos no WhatsApp',
      metricB: '18%',
      labelB: 'mais ticket médio',
    },
    {
      name: 'Rafael Mendes',
      handle: '@rafael.loja',
      quote: 'O que mais me pegava era vender no WhatsApp e depois descobrir que o produto tinha acabado. Com o painel junto do atendimento, ficou bem mais tranquilo acompanhar tudo.',
      metricA: '0',
      labelA: 'pedidos furados',
      metricB: '3h',
      labelB: 'economizadas por dia',
    },
    {
      name: 'Bianca Costa',
      handle: '@biancacosmeticos',
      quote: 'Gostei porque as recomendações não ficam com cara de venda forçada. O cliente pergunta uma coisa, o Masca entende e indica algo que realmente combina.',
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
              <div className="testimonial-social-head">
                <div className="testimonial-avatar" aria-hidden="true">{story.name.charAt(0)}</div>
                <div className="testimonial-author">
                  <strong>{story.name}</strong>
                  <span>{story.handle}</span>
                </div>
              </div>
              <blockquote>{story.quote}</blockquote>
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
