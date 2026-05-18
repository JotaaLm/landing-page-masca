export default function ComparisonTable() {
  const options = [
    {
      title: 'Chatbot comum',
      items: ['Segue fluxos travados', 'Responde perguntas simples', 'Costuma perder contexto'],
    },
    {
      title: 'Atendimento manual',
      items: ['Depende de horário e disponibilidade', 'Pode criar fila no WhatsApp', 'Exige acompanhamento constante'],
    },
    {
      title: 'Planilha ou controle manual',
      items: ['Espalha informações', 'Aumenta chance de erro', 'Dificulta acompanhar oportunidades'],
    },
    {
      title: 'Agente do Masca',
      items: ['Atende 24 horas por dia', 'Recomenda produtos e ajuda a vender', 'Organiza pedidos e passa contexto ao time'],
      featured: true,
    },
  ];

  return (
    <section className="resources-section" id="recursos">
      <div className="container">
        <div className="resource-copy comparison-heading reveal">
          <p className="section-label centered">DIFERENTE DO BÁSICO</p>
          <h2 className="section-title centered">Por que o agente do Masca é diferente de um chatbot comum?</h2>
          <p className="section-subtitle">
            Ele não existe só para responder mensagens. O agente ajuda a vender, organizar o atendimento e reduzir perda de clientes por demora.
          </p>
        </div>

        <div className="alternative-grid">
          {options.map((option, index) => (
            <article className={`alternative-card reveal reveal-delay-${(index % 3) + 1}${option.featured ? ' featured' : ''}`} key={option.title}>
              <h3>{option.title}</h3>
              <ul>
                {option.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
