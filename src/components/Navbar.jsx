import { useEffect, useState } from 'react';
import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

function LogoMark({ small = false }) {
  return (
    <svg
      width={small ? 34 : 46}
      height={small ? 34 : 46}
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(targetId) {
    setMenuOpen(false);
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleCtaClick(source) {
    trackEvent(`cta_click_${source}`);
    trackInterestClick(source);
    scrollTo('contato');
  }

  const links = [
    ['Soluções', 'solucoes'],
    ['Como funciona', 'anatomia'],
    ['Recursos', 'recursos'],
    ['Resultados', 'resultados'],
    ['Planos', 'precos'],
    ['Contato', 'contato'],
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
          {links.map(([label, target]) => (
            <a key={target} href={`#${target}`} onClick={(e) => { e.preventDefault(); scrollTo(target); }}>
              {label}
            </a>
          ))}
          <button className="nav-cta" onClick={() => handleCtaClick('navbar')}>
            Testar grátis
          </button>
        </div>
      </div>
    </nav>
  );
}
