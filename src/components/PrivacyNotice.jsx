import { useEffect, useState } from 'react';
import { PRIVACY_NOTICE_VERSION } from '../lib/privacy';

const privacyCards = [
  {
    title: 'Dados coletados',
    text: 'Nos formulários, coletamos nome, e-mail, WhatsApp e parâmetros de campanha da URL, quando existirem. No banner, guardamos apenas sua preferência de análise neste navegador.',
  },
  {
    title: 'Finalidades',
    text: 'Usamos os dados para responder à sua solicitação, reservar uma conversa comercial, evitar cadastros duplicados, medir campanhas por UTM e melhorar a landing page quando houver aceite de análise.',
  },
  {
    title: 'Compartilhamento',
    text: 'Os leads são armazenados no Supabase, fornecedor de infraestrutura. Eventos de análise podem ser enviados ao Umami apenas após o aceite. Não vendemos dados pessoais.',
  },
  {
    title: 'Retenção',
    text: 'Mantemos leads pelo tempo necessário para contato comercial, histórico da solicitação e cumprimento de obrigações legais. A exclusão pode ser solicitada pelo contato informado no rodapé.',
  },
];

export default function PrivacyNotice() {
  const [isOpen, setIsOpen] = useState(() => (
    typeof window !== 'undefined' && window.location.hash === '#privacidade'
  ));

  useEffect(() => {
    function syncWithHash() {
      setIsOpen(window.location.hash === '#privacidade');
    }

    window.addEventListener('hashchange', syncWithHash);
    syncWithHash();
    return () => window.removeEventListener('hashchange', syncWithHash);
  }, []);

  function closeNotice() {
    setIsOpen(false);
    if (typeof window !== 'undefined' && window.location.hash === '#privacidade') {
      window.history.pushState('', document.title, `${window.location.pathname}${window.location.search}`);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="privacy-modal-overlay" onClick={closeNotice} role="presentation">
      <section
        className="privacy-modal"
        id="privacidade"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="privacy-modal-close" type="button" onClick={closeNotice} aria-label="Fechar aviso de privacidade">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="privacy-heading">
          <p className="section-label">PRIVACIDADE E LGPD</p>
          <h2 id="privacy-title">Aviso de Privacidade</h2>
          <p>
            Este aviso resume como o Masca trata dados pessoais coletados nesta página.
            Última atualização: {PRIVACY_NOTICE_VERSION}.
          </p>
        </div>

        <div className="privacy-grid">
          {privacyCards.map((card) => (
            <article className="privacy-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

        <div className="privacy-rights">
          <div>
            <span className="privacy-rights-label">Direitos do titular</span>
            <p>
              Você pode solicitar confirmação de tratamento, acesso, correção, portabilidade,
              revogação de consentimento, oposição e exclusão de dados quando aplicável.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
