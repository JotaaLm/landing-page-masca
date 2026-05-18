export default function HumanComparison() {
  const employeeItems = [
    'Tem horário limitado e pausas naturais durante o dia',
    'Pode demorar em horários de pico ou fora do expediente',
    'Exige salário, encargos, benefícios e treinamento',
    'Atende uma quantidade limitada de clientes ao mesmo tempo',
    'Pode faltar, tirar férias ou sair da empresa',
    'Depende de acompanhamento constante para manter o padrão',
  ];

  const agentItems = [
    'Atende clientes 24 horas por dia, inclusive quando a loja está fechada',
    'Responde várias conversas ao mesmo tempo sem deixar fila crescer',
    'Recomenda produtos e conduz o cliente até a compra',
    'Reduz perda de venda por demora no atendimento',
    'Organiza dúvidas, pedidos e oportunidades antes do time assumir',
    'Trabalha junto com a equipe humana para ganhar velocidade',
  ];

  return (
    <section className="human-comparison-section" id="comparativo-clt">
      <div className="container">
        <p className="section-label centered reveal">CUSTO E VELOCIDADE</p>
        <h2 className="section-title centered reveal reveal-delay-1">
          Agente do Masca vs atendimento humano tradicional
        </h2>
        <p className="section-subtitle centered reveal reveal-delay-2">
          Seu time continua importante. O agente do Masca entra para atender mais rápido, filtrar oportunidades e vender mesmo quando ninguém está online.
        </p>

        <div className="compare-panels human-panels">
          <article className="compare-panel old reveal reveal-delay-1">
            <p>FUNCIONÁRIO CLT</p>
            <h3>Atendimento com limite de horário</h3>
            <ul>
              {employeeItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>

          <article className="compare-panel new reveal reveal-delay-2">
            <p>AGENTE DO MASCA</p>
            <h3>Mais velocidade sem perder o toque humano</h3>
            <ul>
              {agentItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
