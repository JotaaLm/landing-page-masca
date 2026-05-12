import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

export default function Pricing() {
  const plans = [
    {
      name: 'Start',
      tag: 'PARA COMEÇAR',
      price: '297',
      description: 'Para lojas que querem validar atendimento IA no WhatsApp com controle simples de pedidos.',
      features: [
        '1 número de WhatsApp conectado',
        'Atendimento IA para perguntas frequentes',
        'Cadastro de produtos e disponibilidade',
        'Histórico das conversas',
        'Suporte na ativação inicial',
      ],
    },
    {
      name: 'Growth',
      tag: 'MAIS INDICADO',
      price: '497',
      description: 'Para operações que precisam vender mais, organizar estoque e aumentar ticket médio.',
      features: [
        'Tudo do Start',
        'Recomendações e combos automáticos',
        'Gestão de estoque em tempo real',
        'Pedidos estruturados no painel',
        'Transferência para atendimento humano',
      ],
      featured: true,
    },
    {
      name: 'Scale',
      tag: 'PARA ESCALAR',
      price: '997',
      description: 'Para lojas com maior volume, equipe de atendimento e necessidade de mais controle operacional.',
      features: [
        'Tudo do Growth',
        'Múltiplos atendentes no painel',
        'Relatórios avançados',
        'Regras comerciais personalizadas',
        'Onboarding acompanhado',
      ],
    },
  ];

  const faqs = [
    ['Preciso cadastrar cartão para testar?', 'Não. O teste é sem cartão e sem cobrança automática.'],
    ['Quanto tempo leva para ativar?', 'A configuração inicial pode ser feita rapidamente, com apoio do time para conectar WhatsApp, catálogo e regras da loja.'],
    ['Posso assumir uma conversa manualmente?', 'Sim. A IA pode pausar e transferir a conversa para um atendente quando houver exceção ou oportunidade especial.'],
    ['Funciona com meu estoque atual?', 'A proposta é centralizar produtos, disponibilidade e pedidos no painel da Masca para reduzir erro operacional.'],
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
          <p className="section-label centered">PLANOS</p>
          <h2 className="section-title centered">Escolha como a Masca entra na sua operação</h2>
          <p className="section-subtitle centered">
            Comece com atendimento inteligente e evolua para uma rotina completa de vendas, estoque e delivery.
          </p>
        </div>

        <div className="plans-grid">
          {plans.map((plan, index) => (
            <article className={`plan-card reveal reveal-delay-${index + 1}${plan.featured ? ' featured' : ''}`} key={plan.name}>
              <span className="plan-tag">{plan.tag}</span>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <div className="plan-price">
                <small>R$</small>
                <strong>{plan.price}</strong>
                <span>/mês</span>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button className="plan-cta" onClick={() => handleClick(plan.name)}>
                Testar gratuitamente
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
