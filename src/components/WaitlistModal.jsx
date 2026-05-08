import { useState, useEffect } from 'react';
import { trackEvent } from '../hooks/useAnalytics';
import { submitWaitlistLead } from '../lib/leads';

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

  // Fecha com ESC
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const params = new URLSearchParams(window.location.search);
    const data = {
      email,
      utm_source: params.get('utm_source'),
      utm_campaign: params.get('utm_campaign'),
    };

    trackEvent('waitlist_email_enviado', { email_domain: email.split('@')[1] });

    const result = await submitWaitlistLead(data);

    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error?.includes('duplicate')
        ? 'Este e-mail já está na lista de espera!'
        : 'Erro ao salvar. Tente novamente.');
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
            <h3>Você está na lista! 🎉</h3>
            <p>
              Assim que liberarmos novas vagas no Beta fechado,
              você será o primeiro a saber. Fique de olho no seu e-mail.
            </p>
          </div>
        ) : (
          <>
            <div className="modal-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Beta Fechado — Vagas Limitadas
            </div>

            <h2>Seja avisado quando liberarmos novas vagas para o Beta</h2>

            <p className="modal-desc">
              Tenha acesso antecipado à Masca para testar o vendedor IA
              integrado ao estoque no seu próprio WhatsApp. Sem compromisso, sem cartão.
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
                      Testar Gratuitamente
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
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
