import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

export default function Pricing() {
  const plans = [
    {
      name: 'Start',
      tag: 'NO SISTEMA DO MASCA',
      price: '997',
      priceSuffix: '/mês',
      description: 'Para lojas que querem vender com atendimento IA e operar catálogo, pedidos, estoque, pagamentos e entregas dentro do sistema do Masca.',
      features: [
        'Atendimento IA no WhatsApp para dúvidas, recomendações e pedidos',
        'Cadastro de produtos, categorias, preços e disponibilidade',
        'Gestão de estoque e pedidos em tempo real',
        'Carrinho, checkout, pagamentos e formas de entrega',
        'Cupons, promoções, combos e aumento de ticket médio',
        'Relatórios de vendas, clientes e produtos',
        'Painel operacional com histórico de conversas',
        'Suporte na ativação inicial',
      ],
      featured: true,
    },
    {
      name: 'Integração',
      tag: 'NO SEU SISTEMA ATUAL',
      price: '997',
      priceSuffix: '/mês + taxa de integração',
      description: 'Para lojas que querem manter a operação no sistema atual e conectar o Masca como vendedor IA integrado ao catálogo, estoque e pedidos existentes.',
      features: [
        'Todas as funcionalidades do plano Start',
        'Atendimento IA no WhatsApp para dúvidas, recomendações e pedidos',
        'Conexão com catálogo, estoque e pedidos do sistema atual',
        'Regras comerciais, cupons, combos e recomendações da IA',
        'Histórico de conversas e pedidos sincronizados',
        'Transferência para atendimento humano quando necessário',
        'Taxa de integração consultada conforme o sistema utilizado',
        'Suporte técnico para implantação da integração',
      ],
    },
  ];

  const faqs = [
    ['Como faço para reservar minha vaga?', 'Preencha o formulário e nosso time entra em contato para alinhar o acesso ao beta e os próximos passos.'],
    ['Quanto tempo leva para ativar?', 'A configuração inicial pode ser feita rapidamente, com apoio do time para conectar WhatsApp, catálogo e regras da loja.'],
    ['Posso assumir uma conversa manualmente?', 'Sim. A IA pode pausar e transferir a conversa para um atendente quando houver exceção ou oportunidade especial.'],
    ['Funciona com meu estoque atual?', 'Sim. No plano Start, o estoque fica centralizado no sistema do Masca. No plano Integração, avaliamos o seu sistema atual e informamos a taxa de integração necessária.'],
    ['A taxa de integração já está inclusa?', 'Não. O plano Integração custa R$ 997/mês e a taxa de integração deve ser consultada conforme o sistema usado pela loja.'],
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
          <h2 className="section-title centered">Escolha como o Masca entra na sua operação</h2>
          <p className="section-subtitle centered">
            Escolha operar tudo no sistema do Masca ou conectar nossa IA à estrutura que sua loja já usa.
          </p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <article className={`plan-card${plan.featured ? ' featured' : ''}`} key={plan.name}>
              <span className="plan-tag">{plan.tag}</span>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
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
                Reservar vaga no beta
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
