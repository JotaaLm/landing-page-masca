import { useState } from 'react';
import { trackEvent } from '../hooks/useAnalytics';
import { submitFullLead } from '../lib/leads';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
              <input type="tel" name="whatsapp" placeholder="(11) 99999-9999" required />
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
