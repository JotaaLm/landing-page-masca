export default function SocialProof() {
  return (
    <section className="social-proof-section" id="social-proof">
      <div className="container">
        <div className="social-proof-banner reveal">
          <div className="social-proof-pulse" aria-hidden="true" />
          <div className="social-proof-content">
            <p className="social-proof-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Beta Fechado
            </p>
            <h2 className="social-proof-title">
              Acesso exclusivo para operações de alto volume
            </h2>
            <p className="social-proof-text">
              A Masca.ai está em fase de <strong>Beta Fechado</strong>.
              Estamos selecionando parceiros estratégicos do varejo e delivery
              para co-criar o futuro do atendimento e da gestão de pedidos.
            </p>
            <div className="social-proof-partners">
              <div className="partner-card">
                <div className="partner-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <span className="partner-name">Macaco Blindado</span>
                  <span className="partner-role">Parceiro Validador Técnico</span>
                </div>
              </div>
              <div className="partner-divider" aria-hidden="true" />
              <div className="partner-stat">
                <span className="partner-stat-value">&lt;10</span>
                <span className="partner-stat-label">vagas restantes para o Beta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
