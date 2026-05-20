import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

export default function Anatomy() {
  const solutions = [
    {
      eyebrow: 'PARA SEU WHATSAPP',
      title: 'Agente de vendas que atende e conduz o pedido',
      text: 'Responde em segundos, entende o que o cliente procura, sugere produtos e chama um humano quando precisa.',
      cta: 'Quero testar o agente do Masca',
      visual: 'whatsapp',
      featured: true,
    },
    {
      eyebrow: 'PARA SUA OPERAÇÃO',
      title: 'Pedidos mais claros para sua equipe',
      text: 'O agente ajuda a organizar itens, quantidades, endereço e observações para reduzir erro e retrabalho.',
      cta: 'Ver como funciona',
      visual: 'stock',
    },
    {
      eyebrow: 'PARA DELIVERY',
      title: 'Pedidos organizados até a entrega',
      text: 'Endereço, status, frete e histórico ficam em uma jornada única do WhatsApp ao painel.',
      cta: 'Ver funcionamento',
      visual: 'delivery',
    },
  ];

  const dashboardFeatures = [
    ['Catálogo e estoque', 'Cadastre produtos, preços, variações e disponibilidade em um painel central.'],
    ['Pedidos do WhatsApp', 'Veja pedidos montados pelo agente, dados do cliente, status e próximos passos.'],
    ['Gestão da loja', 'Acompanhe vendas, conversas, produtos mais buscados e pontos que precisam de atenção.'],
    ['Gestão do agente', 'Ajuste o tom de voz, acompanhe respostas e veja se ele está entendendo os clientes corretamente.'],
  ];

  const dashboardStats = [
    ['Pedidos hoje', '42', '+18%'],
    ['Estoque sincronizado', '96%', 'online'],
    ['Conversas em andamento', '18', 'tempo real'],
  ];

  function renderSolutionVisual(type) {
    if (type === 'stock') {
      return (
        <div className="inventory-visual">
          <div className="inventory-shelf">
            <span />
            <span />
            <span />
          </div>
          <div className="inventory-sync">
            <span>12</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 1-15.5 6.2" />
              <path d="M3 12A9 9 0 0 1 18.5 5.8" />
              <path d="M18 2v4h4" />
              <path d="M6 22v-4H2" />
            </svg>
          </div>
        </div>
      );
    }

    if (type === 'delivery') {
      return (
        <div className="delivery-board">
          <div className="delivery-board-header">
            <span>Pedido #248</span>
            <strong>Em rota</strong>
          </div>
          <div className="delivery-steps">
            <span className="done">Itens</span>
            <span className="done">Endereço</span>
            <span>Entrega</span>
          </div>
          <div className="delivery-progress">
            <span />
          </div>
        </div>
      );
    }

    return (
      <div className="mini-chat">
        <span />
        <span />
        <span />
      </div>
    );
  }

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
              <div className={`solution-visual visual-${solution.visual}`} aria-hidden="true">
                {renderSolutionVisual(solution.visual)}
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

        <div className="section-heading" id="painel">
          <p className="section-label">PAINEL DE GERENCIAMENTO</p>
          <h2 className="section-title">Sua loja organizada em um painel simples, completo e integrado</h2>
        </div>

        <div className="store-dashboard-block reveal">
          <div className="dashboard-copy">
            <div className="dashboard-copy-head">
              <p>
                <strong>Tudo que acontece no atendimento vira gestão.</strong>
                O agente registra pedidos, organiza informações importantes e deixa sua equipe com contexto
                para acompanhar a loja em tempo real.
              </p>
            </div>
            <div className="dashboard-feature-list">
              {dashboardFeatures.map(([title, text]) => (
                <article key={title}>
                  <span />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="store-dashboard-preview" aria-label="Prévia visual do painel de gerenciamento da loja">
            <div className="dashboard-window">
              <div className="dashboard-window-top">
                <div>
                  <span />
                  <span />
                  <span />
                </div>
                <strong>masca.ai/admin</strong>
              </div>
              <div className="dashboard-shell">
                <aside>
                  <strong>Masca</strong>
                  <span className="active">Visão geral</span>
                  <span>Produtos</span>
                  <span>Pedidos</span>
                  <span>Conversas</span>
                  <span>Clientes</span>
                </aside>
                <div className="dashboard-main">
                  <div className="dashboard-main-head">
                    <div>
                      <small>Loja conectada</small>
                      <h3>Painel da loja</h3>
                    </div>
                    <span>Estoque em tempo real</span>
                  </div>
                  <div className="dashboard-stat-grid">
                    {dashboardStats.map(([label, value, meta]) => (
                      <div className="dashboard-stat-card" key={label}>
                        <small>{label}</small>
                        <strong>{value}</strong>
                        <span>{meta}</span>
                      </div>
                    ))}
                  </div>
                  <div className="dashboard-content-grid">
                    <div className="dashboard-orders">
                      <div>
                        <strong>Pedidos recentes</strong>
                        <span>Atualizado agora</span>
                      </div>
                      <p><span>#1842</span> Whey + creatina <strong>Separar</strong></p>
                      <p><span>#1841</span> Kit skincare <strong>Pago</strong></p>
                      <p><span>#1840</span> Vestido midi <strong>Entrega</strong></p>
                    </div>
                    <div className="dashboard-stock">
                      <strong>Produtos mais pedidos</strong>
                      <span style={{ '--width': '86%' }}>Whey baunilha</span>
                      <span style={{ '--width': '64%' }}>Creatina 300g</span>
                      <span style={{ '--width': '52%' }}>Coqueteleira</span>
                    </div>
                    <div className="dashboard-conversations">
                      <div>
                        <strong>Conversas</strong>
                        <span>WhatsApp conectado</span>
                      </div>
                      <p><span>MC</span> Maria Clara <strong>Novo pedido</strong></p>
                      <p><span>RL</span> Rafael Lima <strong>Dúvida</strong></p>
                      <p><span>AN</span> Ana Paula <strong>Humano</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
