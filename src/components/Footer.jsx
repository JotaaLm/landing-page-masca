export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-left">
          <div className="footer-logo-wrap">
            <svg width="28" height="28" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M 150 475 L 150 375 C 150 225, 283.3 225, 350 325 L 450 475 C 516.6 575, 650 575, 650 475 L 650 375 C 650 225, 516.6 225, 450 325 L 350 475 C 283.3 575, 150 575, 150 475 Z" stroke="#FF5A00" strokeWidth="90" strokeLinejoin="round" />
              <path d="M 360 340 L 440 460" stroke="#0A0A0A" strokeWidth="120" />
              <path d="M 359 338.5 L 441 461.5" stroke="#FF5A00" strokeWidth="90" />
            </svg>
            <span className="footer-logo">masca</span>
          </div>
          <span className="footer-copy">© {year} Masca — Assistente de Vendas para Varejo e Delivery</span>
        </div>
        <div className="footer-right">
          <a href="#diagnostico" className="footer-link">Problema</a>
          <a href="#anatomia" className="footer-link">Como funciona</a>
          <a href="#precos" className="footer-link">Planos</a>
          <a href="#contato" className="footer-link">Contato</a>
        </div>
      </div>
    </footer>
  );
}
