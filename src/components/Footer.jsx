export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/masca-logo.png" alt="Masca.ai Logo" className="brand-logo-img" style={{ width: '24px', height: '24px' }} />
            <span className="footer-logo">masca.ai</span>
          </div>
          <span className="footer-copy">© {year} Masca.ai — Assistente de Vendas para Varejo e Delivery</span>
        </div>
        <div className="footer-right">
          <a href="#diagnostico" className="footer-link">Diagnóstico</a>
          <a href="#precos" className="footer-link">Planos</a>
          <a href="#contato" className="footer-link">Contato</a>
        </div>
      </div>
    </footer>
  );
}
