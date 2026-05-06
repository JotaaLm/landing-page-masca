import { useState, useEffect } from 'react';
import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleCtaClick() {
    setMenuOpen(false);
    trackEvent('cta_click_testar_navbar');
    trackInterestClick('navbar');
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container">
        <a href="#" className="nav-logo" aria-label="Masca - Início">
          <svg width="54" height="54" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="brand-logo-svg">
            <path d="M 150 475 L 150 375 C 150 225, 283.3 225, 350 325 L 450 475 C 516.6 575, 650 575, 650 475 L 650 375 C 650 225, 516.6 225, 450 325 L 350 475 C 283.3 575, 150 575, 150 475 Z" stroke="#FF5A00" strokeWidth="90" strokeLinejoin="round" />
            <path d="M 360 340 L 440 460" stroke="#0A0A0A" strokeWidth="120" />
            <path d="M 359 338.5 L 441 461.5" stroke="#FF5A00" strokeWidth="90" />
          </svg>
          masca.ai
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <path d="M18 6L6 18M6 6l12 12" />
              : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li><a href="#diagnostico" onClick={() => setMenuOpen(false)}>Diagnóstico</a></li>
          <li><a href="#anatomia" onClick={() => setMenuOpen(false)}>Como funciona</a></li>
          <li><a href="#precos" onClick={() => setMenuOpen(false)}>Planos</a></li>
          <li>
            <button className="nav-cta" onClick={handleCtaClick} id="nav-cta-testar">
              Testar Gratuitamente
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
