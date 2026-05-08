import { useState, useEffect } from 'react';
import { trackEvent } from '../hooks/useAnalytics';
import { submitFullLead } from '../lib/leads';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [utmParams, setUtmParams] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
      const val = params.get(key);
      if (val) utm[key] = val;
    });
    setUtmParams(utm);
  }, []);

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
    } else {
      setError(result.error?.includes('duplicate')
        ? 'Este e-mail já foi cadastrado!'
        : 'Erro ao enviar. Tente novamente.');
    }
  }

  return (
    <section className="contact-section" id="contato">
      <div className="container">
        <p className="section-label reveal">COMECE AGORA</p>

        <div className="contact-wrapper">
          <div className="contact-info reveal reveal-delay-1">
            <h2>Sua loja vendendo 24 horas. Sem contratar ninguém.</h2>
            <p>
              Preencha o formulário e nosso time entra em contato para
              ativar seu vendedor IA no WhatsApp. Em poucos dias, seus
              clientes já serão atendidos no automático.
            </p>

            <div className="contact-trust">
              <div className="trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Setup rápido — rodando em até 48h
              </div>
              <div className="trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Funciona no seu próprio número de WhatsApp
              </div>
              <div className="trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Suporte direto com o time técnico
              </div>
              <div className="trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Sem contrato. Cancele quando quiser.
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            {submitted ? (
              <div className="contact-form form-success">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3>Você está na lista! 🎉</h3>
                <p>
                  Quando o Beta abrir, a equipe Masca vai entrar
                  em contato para ativar sua conta. Fique de olho no seu WhatsApp ou e-mail cadastrado.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} id="lead-form">
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input type="text" id="name" name="name" placeholder="Seu nome completo" required />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" placeholder="email@exemplo.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="whatsapp">WhatsApp</label>
                    <input type="tel" id="whatsapp" name="whatsapp" placeholder="(11) 99999-9999" required />
                  </div>
                </div>

                {Object.entries(utmParams).map(([key, val]) => (
                  <input key={key} type="hidden" name={key} value={val} />
                ))}

                <button type="submit" className="form-submit" disabled={loading}>
                  {loading ? 'Enviando...' : 'Quero Entrar no Beta'}
                </button>
                {error && (
                  <p className="form-error">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
