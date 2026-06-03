import { useEffect, useState } from 'react';
import { trackEvent } from '../hooks/useAnalytics';
import { submitWaitlistLead } from '../lib/leads';

const GENERIC_WAITLIST_ERROR =
  'Não conseguimos salvar seu e-mail agora. Tente novamente em alguns instantes.';

export default function WaitlistModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      trackEvent('waitlist_modal_aberta');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  function getSubmitErrorMessage(errorCode) {
    const messages = {
      duplicate_email: 'Este e-mail já está na lista de espera!',
      duplicate_lead: 'Este e-mail já está na lista de espera!',
      service_unavailable: GENERIC_WAITLIST_ERROR,
    };

    return messages[errorCode] || GENERIC_WAITLIST_ERROR;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams(window.location.search);
      const data = {
        email,
        utm_source: params.get('utm_source'),
        utm_campaign: params.get('utm_campaign'),
      };

      const result = await submitWaitlistLead(data);

      if (result.success) {
        trackEvent('waitlist_email_enviado', { email_domain: email.split('@')[1] });
        setSubmitted(true);
        return;
      }

      setError(getSubmitErrorMessage(result.error));
    } catch {
      setError(GENERIC_WAITLIST_ERROR);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} id="waitlist-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="modal-success">
            <div className="modal-success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3>Você está na lista!</h3>
            <p>
              Assim que liberarmos novas vagas de lançamento,
              você será o primeiro a saber. Fique de olho no seu e-mail.
            </p>
          </div>
        ) : (
          <>
            <div className="modal-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Lançamento - vagas limitadas
            </div>

            <h2>Seja avisado quando liberarmos novas vagas de lançamento</h2>

            <p className="modal-desc">
              Tenha acesso antecipado ao Masca para testar o agente de vendas
              integrado ao estoque no seu próprio WhatsApp. Sem cartão.
            </p>

            <form onSubmit={handleSubmit} className="modal-form" id="waitlist-form">
              <div className="modal-input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  id="waitlist-email"
                  autoFocus
                />
                <button type="submit" disabled={loading} className="modal-submit" id="waitlist-submit">
                  {loading ? (
                    <span className="modal-spinner" />
                  ) : (
                    <>
                      Quero testar o agente
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
              <label className="privacy-consent modal-consent">
                <input type="checkbox" name="privacy_ack" value="accepted" required />
                <span>
                  Li e concordo com o <a href="#privacidade">Aviso de Privacidade</a>.
                  Autorizo o uso do meu e-mail para avisos sobre vagas do Masca.
                </span>
              </label>
              {error && (
                <p className="modal-error">{error}</p>
              )}
              <p className="modal-privacy">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                Seus dados estão seguros. Sem spam, cancelamento a qualquer momento.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
