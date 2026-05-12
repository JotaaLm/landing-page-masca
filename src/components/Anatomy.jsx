import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

export default function Anatomy() {
  const solutions = [
    {
      eyebrow: 'PARA SEU WHATSAPP',
      title: 'Vendedor IA que atende e fecha pedidos',
      text: 'Responde em segundos, entende o pedido, sugere complementos e chama um humano quando precisa.',
      cta: 'Começar teste grátis',
      featured: true,
    },
    {
      eyebrow: 'PARA SUA OPERAÇÃO',
      title: 'Estoque sincronizado em tempo real',
      text: 'Cada venda atualiza o painel automaticamente para evitar ruptura, pedido furado e retrabalho.',
      cta: 'Conhecer solução',
    },
    {
      eyebrow: 'PARA DELIVERY',
      title: 'Pedidos organizados até a entrega',
      text: 'Endereço, status, frete e histórico ficam em uma jornada única do WhatsApp ao painel.',
      cta: 'Ver funcionamento',
    },
  ];

  function handleClick(source) {
    trackEvent(`cta_click_${source}`);
    trackInterestClick(source);
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="solutions-section" id="anatomia">
      <div className="container">
        <span id="solucoes" className="anchor-target" aria-hidden="true" />
        <div className="solution-grid">
          {solutions.map((solution, index) => (
            <article className={`solution-card reveal reveal-delay-${index + 1}${solution.featured ? ' featured' : ''}`} key={solution.title}>
              <div className="solution-visual" aria-hidden="true">
                <div className="mini-chat">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <p>{solution.eyebrow}</p>
              <h3>{solution.title}</h3>
              <small>{solution.text}</small>
              <button onClick={() => handleClick(`solution_${index + 1}`)}>
                {solution.cta}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </article>
          ))}
        </div>

        <div className="section-heading reveal">
          <p className="section-label">CONHEÇA A MASCA</p>
          <h2 className="section-title">Otimização completa da conversa até a entrega</h2>
        </div>

        <div className="feature-lattice">
          {[
            ['Capture e responda', 'Abordagem instantânea para não deixar o cliente esperando.'],
            ['Recomende melhor', 'Sugestões de combos e produtos complementares durante a conversa.'],
            ['Controle estoque', 'Venda apenas o que existe e evite cancelamentos por ruptura.'],
            ['Distribua pedidos', 'Organize status, prioridade e repasse para o time certo.'],
            ['Analise os resultados', 'Entenda atendimentos, produtos mais pedidos e gargalos.'],
            ['Assuma quando quiser', 'Humano entra na conversa sem perder contexto.'],
          ].map(([title, text], index) => (
            <article className={`lattice-item reveal reveal-delay-${(index % 3) + 1}`} key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
