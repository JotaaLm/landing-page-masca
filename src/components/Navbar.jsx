import { useEffect, useState } from 'react';

function LogoMark({ small = false }) {
  const size = small ? 52 : 72;

  return (
    <img
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      className="brand-logo-img"
    />
  );
}

function LogoWordmark({ small = false }) {
  return (
    <span
      className={`brand-wordmark${small ? ' brand-wordmark-small' : ''}`}
      aria-label="Masca"
      role="img"
    >
      <img
        src="/logo-wordmark.png"
        alt=""
        aria-hidden="true"
        className="brand-wordmark-grey"
      />
      <svg
        className="brand-wordmark-triangles"
        viewBox="0 0 802 311"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <polygon points="269,164 246,208 291,208" />
        <polygon points="720,164 697,208 742,208" />
      </svg>
    </span>
  );
}

export { LogoMark, LogoWordmark };

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
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Navegação principal">
      <div className="container nav-inner">
        <a className="nav-logo" href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} aria-label="Masca início">
          <LogoMark />
          <LogoWordmark />
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
