import { openCookiePreferences } from '../lib/privacy';
import { LogoMark } from './Navbar';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <LogoMark small />
            <strong>Masca</strong>
          </div>
          <p className="footer-copy">Agente inteligente para WhatsApp, atendimento e vendas em lojas que querem responder mais rápido e perder menos oportunidades.</p>
          <address className="footer-legal" aria-label="Dados legais e de contato">
            <div className="footer-legal-head">
              <span className="footer-legal-badge">Dados oficiais</span>
              <strong>Masca</strong>
            </div>
            <div className="footer-legal-list">
              <span className="footer-legal-item footer-legal-item-wide">
                <span className="footer-legal-label">Operado por</span>
                <span className="footer-legal-value">63.825.532 MATHEUS MENEZES DA SILVA</span>
              </span>
              <span className="footer-legal-item">
                <span className="footer-legal-label">CNPJ</span>
                <span className="footer-legal-value">63.825.532/0001-88</span>
              </span>
              <span className="footer-legal-item">
                <span className="footer-legal-label">Localidade</span>
                <span className="footer-legal-value">Recife - PE</span>
              </span>
            </div>
            <a className="footer-legal-contact" href="mailto:matheusmenezes123321@gmail.com" aria-label="Enviar e-mail para matheusmenezes123321@gmail.com">
              <span className="footer-legal-contact-label">Contato</span>
              <span className="footer-legal-email">matheusmenezes123321@gmail.com</span>
            </a>
          </address>
        </div>
        <nav aria-label="Links de rodapé">
          <a href="#diagnostico">Problema</a>
          <a href="#precos">Planos</a>
          <a href="#contato">Contato</a>
          <a href="#privacidade">Privacidade</a>
          <button type="button" onClick={openCookiePreferences}>Cookies</button>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>Feito no Brasil</span>
        <span>© {year} Masca. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
