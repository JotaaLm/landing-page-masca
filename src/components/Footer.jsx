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
          <p>Agente inteligente para WhatsApp, atendimento e vendas em lojas que querem responder mais rápido e perder menos oportunidades.</p>
        </div>
        <nav>
          <a href="#diagnostico">Problema</a>
          <a href="#resultados">Resultados</a>
          <a href="#precos">Planos</a>
          <a href="#contato">Contato</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>Feito no Brasil</span>
        <span>© {year} Masca. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
