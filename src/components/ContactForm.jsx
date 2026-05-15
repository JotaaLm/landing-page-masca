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
    const firstPart = digits.slice(2, 7);
    const secondPart = digits.slice(7, 11);

    if (digits.length <= 2) return area ? `(${area}` : '';
    if (digits.length <= 7) return `(${area}) ${firstPart}`;
    return `(${area}) ${firstPart}-${secondPart}`;
  }

  function handleWhatsappChange(e) {
    setWhatsapp(formatWhatsapp(e.target.value));
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
    if (result.error === 'supabase_not_configured') {
      setError('Formulario indisponivel no momento. Verifique a configuracao do Supabase.');
      return;
    }

    setError(result.error?.includes('duplicate') ? 'Este e-mail já foi cadastrado.' : 'Erro ao enviar. Tente novamente.');
  }

  return (
    <section className="contact-section" id="contato">
      <div className="container contact-card reveal">
        <div className="contact-info">
          <p className="section-label">PRONTO PARA O PRÓXIMO NÍVEL</p>
          <h2>Ative sua loja inteligente no WhatsApp</h2>
          <p>
            Deixe seus dados e receba o caminho de ativação. Nosso time ajuda a mapear catálogo,
            estoque, regras de entrega e pontos onde a IA pode gerar mais vendas.
          </p>
          <div className="contact-trust">
            <span>Vagas limitadas no beta</span>
            <span>Ativação acompanhada</span>
            <span>Suporte na ativação</span>
          </div>
        </div>

        {submitted ? (
          <div className="form-success">
            <h3>Cadastro recebido.</h3>
            <p>A equipe Masca vai entrar em contato para combinar os próximos passos.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Nome
              <input type="text" name="name" placeholder="Seu nome" required />
            </label>
            <label>
              E-mail
              <input type="email" name="email" placeholder="email@empresa.com" required />
            </label>
            <label>
              WhatsApp
              <input
                type="tel"
                name="whatsapp"
                placeholder="(00) 00000-0000"
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
              {loading ? 'Enviando...' : 'Quero reservar vaga'}
            </button>
            {error && <p className="form-error">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
