import { trackEvent, trackInterestClick } from '../hooks/useAnalytics';

export default function Pricing() {
  const sharedFeatures = [
    'Atendimento IA no WhatsApp para dúvidas, recomendações e pedidos',
    'Cadastro de produtos, categorias, preços e disponibilidade',
    'Gestão de estoque e pedidos em tempo real',
    'Carrinho, checkout, pagamentos e formas de entrega',
    'Cupons, promoções, combos e aumento de ticket médio',
    'Relatórios de vendas, clientes e produtos',
    'Painel operacional com histórico de conversas',
    'Transferência para atendimento humano quando necessário',
    'Suporte na ativação inicial',
  ];

  const plans = [
    {
      name: 'Prime',
      tag: 'NO SISTEMA DO MASCA',
      oldPrice: '1.297',
      price: '997',
      priceSuffix: '/mês',
      promo: 'Preço beta limitado',
      description: 'Para lojas que querem vender com atendimento IA e operar catálogo, pedidos, estoque, pagamentos e entregas dentro do sistema do Masca.',
      features: sharedFeatures,
      featured: true,
    },
    {
      name: 'Connect',
      tag: 'NO SEU SISTEMA ATUAL',
      oldPrice: '1.497',
      price: '997',
      priceSuffix: '/mês + taxa de integração',
      promo: 'Preço beta limitado',
      description: 'Para lojas que querem as mesmas funcionalidades do Prime, mas conectadas ao sistema que já usam hoje. A única diferença é a taxa de integração consultada.',
      features: sharedFeatures.map((feature) =>
        feature === 'Suporte na ativação inicial' ? 'Suporte na integração' : feature
      ),
    },
  ];

  const faqs = [
    ['Como faço para reservar minha vaga?', 'Preencha o formulário e nosso time entra em contato para alinhar o acesso ao beta e os próximos passos.'],
    ['Quanto tempo leva para ativar?', 'A configuração inicial pode ser feita rapidamente, com apoio do time para conectar WhatsApp, catálogo e regras da loja.'],
    ['Posso assumir uma conversa manualmente?', 'Sim. A IA pode pausar e transferir a conversa para um atendente quando houver exceção ou oportunidade especial.'],
    ['Qual é a diferença entre os planos?', 'Os dois têm as mesmas funcionalidades. No Prime, a operação roda no sistema do Masca. No Connect, conectamos o Masca ao sistema atual da loja e a taxa de integração deve ser consultada.'],
    ['A taxa de integração já está inclusa?', 'Não. O plano Connect custa R$ 997/mês, assim como o Prime, mas a taxa de integração é consultada conforme o sistema usado pela loja.'],
    ['Essa condição é por tempo limitado?', 'Sim. A condição beta depende da disponibilidade de vagas para implantação acompanhada e pode mudar conforme a abertura de novas turmas.'],
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
            Garanta o valor beta antes da próxima turma de implantação.
          </p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <article className={`plan-card${plan.featured ? ' featured' : ''}`} key={plan.name}>
              <span className="plan-tag">{plan.tag}</span>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <div className="plan-promo">{plan.promo}</div>
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
