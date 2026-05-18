import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

const planFeatures = [
  'Agente inteligente no WhatsApp',
  'Produtos e preços organizados para o atendimento',
  'Pedidos mais claros para o time finalizar',
  'Recomendações de produtos e combos',
  'Passagem para atendimento humano quando precisar',
  'Acompanhamento das oportunidades de venda',
];

export default function Pricing() {
  const plans = [
    {
      name: 'Prime',
      tag: 'COM O MASCA',
      oldPrice: '2.997',
      price: '2.300',
      priceSuffix: '/mês',
      description: 'Para lojas que querem começar rápido com o agente do Masca atendendo, recomendando produtos e ajudando a vender pelo WhatsApp.',
      features: planFeatures,
      featured: true,
    },
    {
      name: 'Connect',
      tag: 'NO JEITO DA SUA LOJA',
      oldPrice: '2.997',
      price: '2.300',
      priceSuffix: '/mês + conexão personalizada',
      description: 'Para lojas que já têm uma operação montada e querem conectar o agente do Masca ao jeito que a equipe trabalha hoje.',
      features: planFeatures,
    },
  ];

  const faqs = [
    ['Esse valor é definitivo?', 'Não. É uma condição especial de lançamento para os primeiros clientes. A próxima turma pode ter outro valor.'],
    ['Qual é a diferença entre Prime e Connect?', 'No Prime, você começa mais rápido com o Masca como base da operação. No Connect, o agente entra no fluxo que sua loja já usa hoje, com uma conexão personalizada para deixar tudo mais integrado.'],
    ['Preciso contratar agora?', 'Não. Ao preencher o formulário, você reserva uma conversa com o Masca para entender se faz sentido para sua loja.'],
    ['Posso assumir uma conversa manualmente?', 'Sim. O agente pode passar a conversa para um atendente quando houver exceção, negociação ou oportunidade especial.'],
    ['O agente substitui minha equipe?', 'Não é essa a proposta. Ele trabalha junto com o time para responder mais rápido, filtrar oportunidades e vender fora do horário comercial.'],
  ];

  function handleClick(planName = 'pricing') {
    trackEvent('cta_click_pricing', { plan: planName });
    trackInterestClick('pricing', { plan: planName });
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="pricing-section" id="precos">
      <div className="container">
        <div className="plans-heading reveal">
          <p className="section-label centered">PLANOS COM VALOR DE LANÇAMENTO</p>
          <h2 className="section-title centered">Garanta a condição especial antes da próxima turma</h2>
          <p className="section-subtitle centered">
            Preço exclusivo por tempo limitado para as primeiras lojas que querem colocar um agente de vendas no WhatsApp.
          </p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <article className={`plan-card${plan.featured ? ' featured' : ''}`} key={plan.name}>
              <span className="plan-tag">{plan.tag}</span>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <span className="plan-promo">Preço de lançamento</span>
              <div className="plan-old-price">
                <span>De</span>
                <s>R$ {plan.oldPrice}</s>
                <span>por</span>
              </div>
              <div className="plan-price">
                <small>R$</small>
                <strong>{plan.price}</strong>
                <span>{plan.priceSuffix}</span>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button className="plan-cta" onClick={() => handleClick(plan.name)}>
                Garantir valor de lançamento
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </article>
          ))}
        </div>

        <div className="faq-wrap">
          <p className="section-label centered reveal">PERGUNTAS FREQUENTES</p>
          {faqs.map(([question, answer], index) => (
            <details className={`faq-item reveal reveal-delay-${(index % 3) + 1}`} key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
