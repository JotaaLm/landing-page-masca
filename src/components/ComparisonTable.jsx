import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

export default function ComparisonTable() {
  const features = [
    { name: 'Atendimento 24/7 no WhatsApp', manual: false, chatbot: true, masca: true },
    { name: 'Gestão de estoque integrada', manual: 'manual', chatbot: false, masca: true, mascaLabel: 'Tempo real' },
    { name: 'Upsell e recomendação inteligente', manual: false, chatbot: false, masca: true, mascaLabel: 'Automático' },
    { name: 'Checkout completo no WhatsApp', manual: false, chatbot: 'parcial', masca: true, mascaLabel: 'Completo' },
    { name: 'Gestão de delivery e frete', manual: 'manual', chatbot: false, masca: true, mascaLabel: 'Integrado' },
    { name: 'Aprovação humana antes de decisões', manual: false, chatbot: false, masca: true },
    { name: 'Painel de conversas ao vivo', manual: false, chatbot: 'parcial', masca: true, mascaLabel: 'Tempo real' },
    { name: 'Respostas em menos de 5 segundos', manual: false, chatbot: true, masca: true },
  ];

  function renderCell(value, label) {
    if (value === true) {
      return (
        <span className="ct-yes">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {label && <span className="ct-label">{label}</span>}
        </span>
      );
    }
    if (value === false) {
      return (
        <span className="ct-no">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      );
    }
    return <span className="ct-partial">{value}</span>;
  }

  function handleCtaClick() {
    trackEvent('cta_click_comparacao');
    trackInterestClick('comparison');
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="comparison-section" id="comparacao">
      <div className="container">
        <p className="section-label reveal">MASCA.AI vs. ALTERNATIVAS</p>
        <h2 className="section-title reveal reveal-delay-1">
          Compare e decida
        </h2>
        <p className="section-subtitle reveal reveal-delay-2">
          A Masca.ai é a única que integra vendas, estoque e delivery em uma solução de ponta a ponta.
        </p>

        <div className="ct-wrapper reveal reveal-delay-3">
          <table className="ct-table">
            <thead>
              <tr>
                <th className="ct-feature-header">Funcionalidade</th>
                <th className="ct-col-header">
                  <span className="ct-col-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                  </span>
                  Planilha + WhatsApp
                </th>
                <th className="ct-col-header">
                  <span className="ct-col-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  </span>
                  Chatbot Comum
                </th>
                <th className="ct-col-header ct-col-masca">
                  <span className="ct-col-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </span>
                  Masca.ai
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i}>
                  <td className="ct-feature-name">{f.name}</td>
                  <td className="ct-cell">{renderCell(f.manual)}</td>
                  <td className="ct-cell">{renderCell(f.chatbot)}</td>
                  <td className="ct-cell ct-cell-masca">{renderCell(f.masca, f.mascaLabel)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ct-cta-wrap reveal reveal-delay-4">
          <button className="hero-cta" onClick={handleCtaClick} id="cta-comparacao">
            Pare de perder vendas
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
