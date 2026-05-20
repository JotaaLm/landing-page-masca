import { useEffect, useState } from 'react';

function LogoMark({ small = false }) {
  return (
    <svg
      width={small ? 36 : 52}
      height={small ? 36 : 52}
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="brand-logo-svg"
    >
      <path d="M150 475V375C150 225 283 225 350 325L450 475C517 575 650 575 650 475V375C650 225 517 225 450 325L350 475C283 575 150 575 150 475Z" stroke="currentColor" strokeWidth="90" strokeLinejoin="round" />
      <path d="M360 340L440 460" stroke="#ffffff" strokeWidth="116" />
      <path d="M359 338.5L441 461.5" stroke="currentColor" strokeWidth="90" />
    </svg>
  );
}

export { LogoMark };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(targetId) {
    setMenuOpen(false);
    setSectionsOpen(false);
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  }

  const links = [
    ['Início', 'hero'],
    ['Comparativo', 'comparativo-clt'],
    ['Problema', 'diagnostico'],
    ['Como funciona', 'anatomia'],
    ['Painel', 'painel'],
    ['Antes/depois', 'antes-depois'],
    ['Contato', 'contato'],
    ['Funcionalidades', 'diferenciais'],
    ['Resultados', 'resultados'],
    ['Planos', 'precos'],
  ];

  const quickLinks = [
    ['Comparativo', 'comparativo-clt'],
    ['Problema', 'diagnostico'],
    ['Como funciona', 'anatomia'],
    ['Painel', 'painel'],
    ['Planos', 'precos'],
  ];

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <a className="nav-logo" href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} aria-label="Masca início">
          <LogoMark />
          <span>Masca</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-menu${menuOpen ? ' open' : ''}`}>
          <div className="nav-quick-links">
            {quickLinks.map(([label, target]) => (
              <a key={target} href={`#${target}`} onClick={(e) => { e.preventDefault(); scrollTo(target); }}>
                {label}
              </a>
            ))}
          </div>

          <span className="nav-divider" aria-hidden="true" />

          <div className={`nav-dropdown${sectionsOpen ? ' open' : ''}`}>
            <button
              className="nav-dropdown-toggle"
              onClick={() => setSectionsOpen((open) => !open)}
              aria-expanded={sectionsOpen}
              aria-haspopup="true"
            >
              Seções
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="nav-dropdown-panel">
              {links.map(([label, target]) => (
                <a key={target} href={`#${target}`} onClick={(e) => { e.preventDefault(); scrollTo(target); }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          <button className="nav-cta nav-cta-compact" onClick={() => scrollTo('contato')}>
            Reservar vaga
          </button>
        </div>
      </div>
    </nav>
  );
}
