import { useEffect, useState } from 'react';
import { initPageViewTracking } from '../hooks/useAnalytics';
import {
  CONSENT_ACCEPTED,
  CONSENT_REJECTED,
  OPEN_COOKIE_PREFERENCES_EVENT,
  getAnalyticsConsent,
  setAnalyticsConsent,
} from '../lib/privacy';

export default function CookieConsent() {
  const [choice, setChoice] = useState(() => getAnalyticsConsent());
  const [visible, setVisible] = useState(() => !getAnalyticsConsent());

  useEffect(() => {
    function handleOpenPreferences() {
      setChoice(getAnalyticsConsent());
      setVisible(true);
    }

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpenPreferences);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpenPreferences);
  }, []);

  function acceptAnalytics() {
    setAnalyticsConsent(CONSENT_ACCEPTED);
    setChoice(CONSENT_ACCEPTED);
    setVisible(false);
    window.setTimeout(() => initPageViewTracking(), 0);
  }

  function rejectAnalytics() {
    setAnalyticsConsent(CONSENT_REJECTED);
    setChoice(CONSENT_REJECTED);
    setVisible(false);
  }

  if (!visible) return null;

  const hasPreviousChoice = Boolean(choice);

  return (
    <aside className="cookie-consent" role="dialog" aria-live="polite" aria-label="Preferências de privacidade">
      <div className="cookie-consent-copy">
        <span className="cookie-consent-kicker">Privacidade</span>
        <h2>{hasPreviousChoice ? 'Preferências de cookies' : 'Podemos medir o uso da página?'}</h2>
        <p>
          Usamos armazenamento necessário para lembrar sua escolha. Análises e eventos de navegação
          só serão ativados se você aceitar. Você pode alterar essa preferência depois no rodapé.
        </p>
        <a href="#privacidade">Ler Aviso de Privacidade</a>
      </div>
      <div className="cookie-consent-actions">
        <button type="button" className="cookie-button secondary" onClick={rejectAnalytics}>
          Recusar analytics
        </button>
        <button type="button" className="cookie-button primary" onClick={acceptAnalytics}>
          Aceitar analytics
        </button>
      </div>
    </aside>
  );
}
