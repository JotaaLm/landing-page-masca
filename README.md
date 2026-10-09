<div align="center">

# Mascate — Landing Page

**Venda suplementos no WhatsApp com um agente de IA que atende 24×7, fecha pedidos e pede a sua aprovação só quando precisa.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Leads-3FCF8E?logo=supabase&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Deploy-Cloudflare-F38020?logo=cloudflare&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white)

</div>

---

## Sobre o projeto

Este repositório contém a **landing page pública do Mascate**, uma plataforma vertical para lojistas brasileiros de suplementos alimentares (faturamento entre R$ 30 mil e R$ 100 mil/mês) que hoje vendem por WhatsApp manual, sem e-commerce próprio nem ERP.

A página tem um objetivo claro: **apresentar o produto e capturar leads qualificados** (nome, e-mail, WhatsApp, faixa de faturamento e origem/UTM) para abordagem comercial, conforme o requisito **RF11** do [PRD do MVP](./0001-prd.md).

### O que é o Mascate?

O MVP do produto entrega dois pilares integrados:

| Pilar | O que faz |
| --- | --- |
| **Admin web** | Catálogo, estoque, pedidos, regras de frete, configurações do agente e feed de conversas em tempo real. |
| **Agente no WhatsApp** | Atende o cliente final, recomenda produtos, coleta endereço, fecha pedido por PIX ou pagamento na entrega e escala decisões ao lojista quando necessário. |

**Diferencial:** o agente lê catálogo e estoque do mesmo banco do admin, sem integração externa. Setup zero-config.

> Esta landing é apenas a vitrine. O admin e o agente são tratados no PRD e em specs separadas.

---

## Funcionalidades da landing

- Apresentação da proposta de valor do Mascate para o lojista
- Formulário de captura de leads com persistência no **Supabase**
- Rastreamento de **UTM** e fonte de origem
- Layout responsivo
- Deploy na borda com **Cloudflare**

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| Interface | [React 19](https://react.dev) |
| Build e dev server | [Vite 8](https://vite.dev) com `@vitejs/plugin-react` |
| Banco de dados (leads) | [Supabase](https://supabase.com) |
| Hospedagem e backend leve | [Cloudflare](https://developers.cloudflare.com/workers/) via [Wrangler](https://developers.cloudflare.com/workers/wrangler/) |
| Qualidade de código | ESLint 10 com `react-hooks` e `react-refresh` |

---

## Estrutura do repositório

```
landing-page-masca/
├── .agent/                 # Configurações e instruções para agentes de IA
├── .github/workflows/      # Pipelines de CI/CD (GitHub Actions)
├── design-system/masca.ai/ # Design system da marca
├── public/                 # Arquivos estáticos
├── src/                    # Código-fonte da aplicação React
├── supabase/               # Schema e migrations do banco
├── worker/                 # Código do Cloudflare Worker
├── .env.example            # Variáveis do front-end (Vite)
├── .dev.vars.example       # Variáveis do Worker (Wrangler, dev local)
├── 0001-prd.md             # PRD do MVP Mascate
├── index.html              # Entrada HTML
├── vite.config.js          # Configuração do Vite
├── wrangler.jsonc          # Configuração do Cloudflare
└── eslint.config.js        # Regras de lint
```

---

## Começando

### Pré-requisitos

- [Node.js](https://nodejs.org) 20 ou superior
- npm
- Um projeto no [Supabase](https://supabase.com) (para o armazenamento de leads)
- Conta na [Cloudflare](https://dash.cloudflare.com) (apenas para deploy)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/JotaaLm/landing-page-masca.git
cd landing-page-masca

# Instale as dependências
npm install
```

### Variáveis de ambiente

**Front-end (Vite).** Copie o exemplo e preencha com os dados do seu projeto Supabase:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

**Worker (Wrangler).** Para rodar o ambiente Cloudflare localmente:

```bash
cp .dev.vars.example .dev.vars
```

Preencha os valores conforme indicado no arquivo de exemplo.

> **Atenção:** nunca faça commit de `.env` ou `.dev.vars`. Ambos já estão cobertos pelo `.gitignore`. A `anon key` do Supabase é pública por design, mas depende de **RLS (Row Level Security)** bem configurada para proteger seus dados.

### Banco de dados

As definições de schema ficam em [`supabase/`](./supabase). Aplique-as no seu projeto Supabase (via painel SQL ou Supabase CLI) antes de rodar o formulário de leads.

---

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Serve localmente o build de produção |
| `npm run lint` | Executa o ESLint em todo o projeto |
| `npm run dev:cloudflare` | Faz o build e sobe o ambiente local com `wrangler dev` |
| `npm run deploy:cloudflare` | Faz o build e publica na Cloudflare com `wrangler deploy` |

---

## Deploy

O deploy é feito na Cloudflare:

```bash
# Autentique-se (apenas na primeira vez)
npx wrangler login

# Build + publicação
npm run deploy:cloudflare
```

Configure as variáveis e secrets de produção no painel da Cloudflare (ou via `npx wrangler secret put`). As configurações do projeto estão em [`wrangler.jsonc`](./wrangler.jsonc).

---

## Contexto de produto

Os detalhes completos do produto estão no [**PRD — MVP Mascate**](./0001-prd.md). Resumo do que vale saber:

- **Público-alvo:** lojistas de suplementos que vendem por WhatsApp manual
- **Meta de validação:** 5 ou mais design partners pagantes, com 30 dias ou mais de operação estável
- **Conformidade:** guardrails da **Anvisa** (RDC 843/2024) e **LGPD** (opt-in, opt-out, direito ao esquecimento) são requisitos não negociáveis do produto
- **Arquitetura:** multi-tenant desde o dia 1, com RLS no banco como segunda linha de defesa
- **Fora do escopo do MVP:** storefront próprio, app mobile, cartão automático, integrações com marketplaces

---

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feat/minha-feature`
3. Rode o lint antes de commitar: `npm run lint`
4. Faça o commit: `git commit -m "feat: descreve a mudança"`
5. Envie para o seu fork: `git push origin feat/minha-feature`
6. Abra um Pull Request

Sugestão de convenção de commits: [Conventional Commits](https://www.conventionalcommits.org/pt-br/).

---

## Licença

Este projeto ainda não define uma licença. Entre em contato com o autor antes de reutilizar o código.

---

<div align="center">

Feito por [JotaaLm](https://github.com/JotaaLm)

</div>
