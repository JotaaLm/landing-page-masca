import { openCookiePreferences } from '../lib/privacy';
import { LogoMark, LogoWordmark } from './Navbar';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <LogoMark small />
            <LogoWordmark small />
          </div>
          <p className="footer-copy">Agente inteligente para WhatsApp, atendimento e vendas em lojas que querem responder mais rápido e perder menos oportunidades.</p>
          <address className="footer-legal" aria-label="Dados legais e de contato">
            <p className="footer-legal-meta">
              <span>CNPJ 63.825.532/0001-88</span>
              <span aria-hidden="true">·</span>
              <span>Recife, PE</span>
            </p>
            <a className="footer-legal-contact" href="mailto:matheus@masca.ai">
              matheus@masca.ai
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
