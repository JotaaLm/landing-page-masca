import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

const planFeatures = [
  'Agente de vendas no WhatsApp',
  'Catálogo, preços e estoque sincronizados',
  'Pedidos organizados',
  'Recomendações de produtos e combos',
  'Acompanhamento de conversas e oportunidades',
  'Atendimento humano quando precisar',
];

export default function Pricing() {
  const plans = [
    {
      name: 'Masca Prime',
      tag: 'NO SISTEMA DO MASCA',
      oldPrice: '2.497',
      price: '997',
      priceSuffix: '/mês',
      description: 'Ideal para lojas que querem começar rápido, usando o painel Masca para gerenciar produtos, estoque, pedidos e atendimento pelo WhatsApp.',
      detail: 'Sem taxa de integração',
      cta: 'Usar o sistema Masca',
      features: ['Painel Masca para gerenciar a loja', ...planFeatures],
      highlightExtra: false,
      featured: true,
    },
    {
      name: 'Masca Connect',
      tag: 'NO SEU SISTEMA ATUAL',
      oldPrice: '2.497',
      price: '997',
      priceSuffix: '/mês',
      description: 'Ideal para lojas que já têm um sistema e querem conectar o Masca ao catálogo, estoque e pedidos sem mudar a operação atual.',
      detail: '+ implantação da integração',
      extra: 'Painel Masca incluso sem custo adicional',
      cta: 'Conectar meu sistema',
      features: planFeatures,
      highlightExtra: true,
    },
  ];

  const faqs = [
    ['Esse valor é definitivo?', 'Não. É uma condição especial de lançamento para os primeiros clientes. O valor pode mudar quando essa condição encerrar.'],
    ['Qual é a diferença entre Prime e Connect?', 'Os dois planos têm as mesmas funcionalidades. A diferença está em como sua loja prefere operar: usando o sistema do Masca ou conectando o Masca ao sistema que você já usa.'],
    ['O painel Masca está incluso no Connect?', 'Sim. No Connect, o painel Masca também fica incluso para acompanhamento da operação, sem custo adicional.'],
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
          <h2 className="section-title centered">Escolha como sua loja prefere operar com o Masca</h2>
          <p className="section-subtitle centered">
            Os dois planos têm as mesmas funcionalidades. A diferença está em como sua loja prefere operar: usando o sistema do Masca ou conectando o Masca ao sistema que você já usa.
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
              <div className="plan-detail">{plan.detail}</div>
              <ul>
                {plan.extra && <li className={plan.highlightExtra ? 'plan-extra-item' : undefined}>{plan.extra}</li>}
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button className="plan-cta" onClick={() => handleClick(plan.name)}>
                {plan.cta}
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
