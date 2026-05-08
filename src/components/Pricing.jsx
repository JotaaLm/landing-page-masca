import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

export default function Pricing() {
  const plans = [
    {
      name: 'Agent',
      tag: 'MAIS POPULAR',
      price: '497',
      period: '/mês',
      description: 'Tudo que você precisa para vender pelo WhatsApp com IA e gerenciar sua operação no painel.',
      features: [
        '1 conexão de WhatsApp',
        'Atendente Virtual 24/7 com recomendação',
        'Painel web completo (catálogo, pedidos, logística)',
        'Aprovação manual quando necessário',
        'Configuração de frete por região',
        'Feed de conversas em tempo real',
        'Integração direta com o seu estoque',
        'Suporte prioritário',
      ],
      highlighted: true,
    },
    {
      name: 'Scale',
      tag: 'PARA CRESCER',
      price: '997',
      period: '/mês',
      description: 'Para quem tem múltiplos atendentes e precisa de mais conexões e relatórios avançados.',
      features: [
        'Tudo do plano Agent, mais:',
        'Até 3 conexões de WhatsApp',
        'Multi-atendente no painel',
        'Relatórios avançados de conversão e upsell',
        'API para integrações futuras',
        'Onboarding dedicado com o time técnico',
        'Suporte responde em até 2h',
        'Prioridade em novas features',
      ],
      highlighted: false,
    },
  ];

  function handlePlanClick(planName) {
    trackEvent('pricing_plano_selecionado', { plan: planName });
    trackInterestClick('pricing', { plan: planName });
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="pricing-section" id="precos">
      <div className="container">
        <p className="section-label reveal">PLANOS</p>
        <h2 className="section-title reveal reveal-delay-1">
          Custa menos que um atendente. Vende mais que três.
        </h2>
        <p className="section-subtitle reveal reveal-delay-2">
          Quanto você perde por mês com vendas não respondidas e estoque descontrolado?
          A Masca se paga na primeira semana — e trabalha 24h sem folga.
        </p>

        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <article
              key={plan.name}
              className={`pricing-card${plan.highlighted ? ' pricing-highlighted' : ''} reveal reveal-delay-${i + 1}`}
              id={`pricing-${plan.name.toLowerCase()}`}
            >
              {plan.highlighted && (
                <div className="pricing-badge">{plan.tag}</div>
              )}
              {!plan.highlighted && (
                <div className="pricing-tag">{plan.tag}</div>
              )}

              <h3 className="pricing-plan-name">{plan.name}</h3>
              <p className="pricing-desc">{plan.description}</p>

              <div className="pricing-value">
                <span className="pricing-currency">R$</span>
                <span className="pricing-amount">{plan.price}</span>
                <span className="pricing-period">{plan.period}</span>
              </div>

              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`pricing-cta${plan.highlighted ? ' pricing-cta-primary' : ''}`}
                onClick={() => handlePlanClick(plan.name)}
                id={`btn-plan-${plan.name.toLowerCase()}`}
              >
                Testar Gratuitamente
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </article>
          ))}
        </div>

        <p className="pricing-note reveal">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          Valores de lançamento para os primeiros design partners. Sem multa, cancele quando quiser.
        </p>
      </div>
    </section>
  );
}
