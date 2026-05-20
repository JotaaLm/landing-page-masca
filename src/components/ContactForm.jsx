import { useState } from 'react';
import { trackEvent } from '../hooks/useAnalytics';
import { submitFullLead } from '../lib/leads';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [whatsapp, setWhatsapp] = useState('');
  const [utmParams] = useState(() => {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    const utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
      const val = params.get(key);
      if (val) utm[key] = val;
    });
    return utm;
  });

  function formatWhatsapp(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    const area = digits.slice(0, 2);
    const firstPart = digits.length > 10 ? digits.slice(2, 7) : digits.slice(2, 6);
    const secondPart = digits.length > 10 ? digits.slice(7, 11) : digits.slice(6, 10);

    if (digits.length <= 2) return area ? `(${area}` : '';
    if (digits.length <= 6) return `(${area}) ${digits.slice(2)}`;
    return `(${area}) ${firstPart}-${secondPart}`;
  }

  function handleWhatsappChange(e) {
    setWhatsapp(formatWhatsapp(e.target.value));
  }

  function getSubmitErrorMessage(errorCode) {
    const messages = {
      duplicate_email: 'Este e-mail já está cadastrado.',
      duplicate_whatsapp: 'Este WhatsApp já está cadastrado.',
      duplicate_lead: 'Este contato já foi cadastrado.',
      supabase_not_configured: 'Formulário indisponível no momento. Verifique a configuração do Supabase.',
    };

    return messages[errorCode] || 'Erro ao enviar. Tente novamente.';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.utm = utmParams;

    trackEvent('lead_formulario_enviado');
    const result = await submitFullLead(data);

    setLoading(false);
    if (result.success) {
      setSubmitted(true);
      return;
    }

    setError(getSubmitErrorMessage(result.error));
  }

  return (
    <section className="contact-section" id="contato">
      <div className="container contact-card reveal">
        <div className="contact-info">
          <p className="section-label">RESERVE SUA VAGA</p>
          <h2>Quer ver o agente do Masca vendendo pela sua loja?</h2>
          <p>
            Deixe seu nome, e-mail e número. O time do Masca entra em contato para apresentar a condição de lançamento.
          </p>
          <div className="contact-trust">
            <span>Valor exclusivo de lançamento</span>
            <span>Vagas limitadas</span>
          </div>
        </div>

        {submitted ? (
          <div className="form-success">
            <h3>Cadastro recebido.</h3>
            <p>O time do Masca vai entrar em contato para combinar os próximos passos.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Nome
              <input type="text" name="name" placeholder="Seu nome" required />
            </label>
            <label>
              E-mail
              <input type="email" name="email" placeholder="seu@email.com" autoComplete="email" required />
            </label>
            <label>
              Número
              <input
                type="tel"
                name="whatsapp"
                placeholder="(11) 99999-9999"
                value={whatsapp}
                onChange={handleWhatsappChange}
                inputMode="numeric"
                maxLength="15"
                required
              />
            </label>

            {Object.entries(utmParams).map(([key, val]) => (
              <input key={key} type="hidden" name={key} value={val} />
            ))}

            <button type="submit" className="form-submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Reservar Vaga'}
            </button>
            {error && <p className="form-error">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
