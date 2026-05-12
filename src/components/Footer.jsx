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
          <p>Vendedor IA, WhatsApp, estoque e delivery para lojas que querem vender com menos fricção.</p>
        </div>
        <nav>
          <a href="#solucoes">Soluções</a>
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
