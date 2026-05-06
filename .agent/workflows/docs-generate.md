---
description: Generate all Docs-as-Code documentation from scratch by analyzing the codebase. No input needed.
---

# /docs-generate - Full Documentation Generation

Generate the complete documentation suite by reading the codebase directly. The programmer runs this once and all docs are created automatically.

---

## Steps

1. **Read the project structure**
   // turbo
   - Run `find src -type f -name "*.ts" | head -80` to map the full source tree
   - Run `cat package.json` to understand dependencies and scripts

2. **Read all entity files**
   // turbo
   - Run `cat src/database/entities/*.entity.ts` to understand the full data model
   - Run `cat src/database/data-source.ts` to understand DB configuration

3. **Read all controllers and DTOs**
   // turbo
   - Run `cat src/modules/*/\*.controller.ts` to map all API endpoints
   - Run `find src/modules -name "*.dto.ts" -exec cat {} +` to understand all input contracts

4. **Read all services**
   // turbo
   - Run `cat src/modules/*/*.service.ts` to understand business logic
   - Run `cat src/common/guards/*.ts src/common/decorators/*.ts` to understand cross-cutting concerns

5. **Read main.ts and app.module.ts**
   // turbo
   - Run `cat src/main.ts src/app.module.ts` to understand bootstrap and module registration

6. **Read existing docs (if any)**
   // turbo
   - Run `find docs -name "*.md" -exec echo "--- {} ---" \; -exec cat {} \;` to load current documentation state
   - If docs already exist, update them instead of overwriting blindly

7. **Generate `docs/architecture/system-design.md`**
   - Title: `# 🏗️ System Design — [Project Name] Backend`
   - Create or update the file with:
     - **TL;DR summary box** at the very top (2-3 sentence overview of the entire architecture)
     - 3-Tier architecture explanation table (Presentation / Application / Data)
     - **Mermaid C4 Container diagram** using PROPER C4 notation:
       - Use `System_Boundary` to group internal containers
       - Use `Container` for the API server, `ContainerDb` for the database
       - Use `System_Ext` for external services (Supabase, Stripe, AWS SES, etc.)
       - Use `Person` for client/trainer actors with role descriptions
       - Do NOT use flat `C4Context` with only `System` nodes — use the full Container vocabulary
     - **Mermaid sequenceDiagram** showing the full request lifecycle (auth → query → Stripe → webhook):
       - **Number every step** (1, 2, 3...) in the message labels for easy reference in discussions
       - After the diagram, add a **"Key Design Decisions"** section with 2–3 bullet points explaining *why* the architecture works this way (e.g., Auth Proxy pattern, Two-Step Payment, Quorum-Based Capture)
     - Module breakdown table (one row per NestJS module)
     - Module dependency graph (text-based, showing which modules depend on which)
     - Cross-cutting concerns section:
       - Auth: document the JWT validation strategy specifics (algorithm selection, JWKS vs symmetric secret, local vs production differences)
       - Validation: document `ValidationPipe` status and DTO decorators
       - Swagger: document the endpoint and configuration
       - Raw body handling: explain why it's needed (webhook signature verification)
     - External services integration summary table (columns: Service, SDK, Used By, Purpose)
     - **Environment Variables** reference table:
       - One row per env var. Columns: Variable, Required, Default, Description
       - Mark secrets with 🔒 icon
       - Group by service (Database, Supabase, Stripe, AWS)
     - **Gotchas & Pitfalls** section listing surprising behaviors discovered in the code
     - **"Missing Information"** section listing any gaps found

8. **Generate `docs/architecture/database-erd.md`**
   - Title: `# 🗄️ Database Schema & Entity-Relationship Diagram`
   - Create or update the file with:
     - **TL;DR summary box** at the very top (table count, PK strategy, key relationship summary in 2-3 sentences)
     - **Mermaid erDiagram**:
       - Define entity attributes FIRST, then relationships at the bottom of the block
       - This reads top-down: understand the tables, then see how they connect
       - **SYNTAX RULE**: Never use hyphens in attribute type positions (e.g., `PK-FK` is invalid). Use comment strings: `uuid id "PK,FK - description"`
     - Table descriptions section (one paragraph per entity explaining business purpose)
     - **State Machine Diagrams** for every ENUM that represents a lifecycle:
       - Use **Mermaid stateDiagram-v2** to visualize transitions
       - At minimum: `SessionStatus` (OPEN → CONFIRMED → COMPLETED / CANCELLED) and `SessionStatusFlowEnum` (PENDING → APPROVED → ATTENDED / CANCELLED)
       - After each diagram, explain when each transition happens in the business logic
     - Key schema decisions, each with a dedicated subsection:
       - **UUID strategy**: use `> [!IMPORTANT]` GitHub Alert to highlight the shared PK pattern for client/personal
       - **ENUMs vs Dictionary Tables**: create a comparison table with **one row per column** (not grouped by strategy). Columns: Column Name, Strategy, Rationale
       - **Soft Deletes**: explain why with business context (financial audit trails)
       - **Cascade rules**: table with Relationship, Direction, Behavior columns
       - **Test ENUM fallback**: use `> [!NOTE]` GitHub Alert to document the `NODE_ENV === 'test' ? 'varchar' : 'enum'` pattern
     - Index documentation table — include BOTH `@Index()` decorators AND unique constraints (`email UK`, `name UK`)
     - **"Missing Information"** section

9. **Generate `docs/api/main-features.md`**
   - Title: `# 🚀 Main Features & API Contracts`
   - Create or update the file with:
     - **TL;DR summary box** at the very top (endpoint count, auth strategy, payment flow in 2-3 sentences)
     - **Standard Error Response Format** section before the endpoint docs:
       - Document the NestJS default error shape: `{ statusCode, message, error }`
       - Show one example for 400, 404, 409
     - One section per controller/module (numbered: ## 1. Authentication, ## 2. User Profiles, etc.)
     - For each endpoint:
       - HTTP method, route, auth requirement
       - Input table with Field, Type, Required, Example/Notes columns
       - **Business Logic** as a numbered step list explaining the flow
       - Response example as a JSON code block
       - **Specific error codes** documented per endpoint (`400`, `401`, `404`, `409` — not just generic errors)
       - **cURL example** for critical endpoints (at minimum: login, create booking, webhook). Other endpoints can omit cURL.
     - Include `created_at`/`updated_at` in response examples where the entity returns them
     - Note any localization details (e.g., emails sent in Portuguese)
     - Note internal-only modules (no controller) explicitly
     - **Gotchas & Pitfalls** section listing surprising behaviors (e.g., hardcoded quorum, hardcoded currency, string date comparison)
     - API summary table at the end (all endpoints in one table: Method, Route, Auth, Description)
     - **"Missing Information"** section listing gaps (pagination, RBAC, update/delete endpoints, etc.)

10. **Update `README.md`**
    - Add or update an "Architecture & API Reference" section in the Documentation Hub linking to the 3 generated docs
    - Do NOT rewrite existing README content — only add the new links section

11. **Check for implicit ADRs**
    - Review the code for architectural decisions NOT already documented in `docs/adrs/`
    - If a new pattern is found (e.g., shared PK strategy, test-env ENUM fallback), generate a new ADR:
      - File format: `docs/adrs/NNNN-short-topic-name.md` where NNNN is the next sequential number
    - If all decisions are already covered by existing ADRs, skip this step

12. **Present results to user**
    - List all files created or updated
    - Summarize the "Missing Information" items found across all docs
    - Wait for user review

---

## Rules

- **Zero input required.** The workflow reads everything from the filesystem. The programmer just runs `/docs-generate`.
- **No hallucination.** Only document features that exist in the code. If something is unclear, add it to "Missing Information."
- **Mermaid syntax must compile.** Quote labels with special characters. No HTML tags in nodes.
- **Beginner-friendly tone.** Write for junior developers and non-native English speakers. Explain *why*, not just *what*.
- **Respect existing docs.** If docs exist, update them surgically. Don't destroy manually-written content.

### Writing Standards (Mandatory)

These standards ensure consistent, high-quality output:

- **TL;DR first.** Every doc must start with a 2-3 sentence summary box after the H1. The reader should understand the entire scope without scrolling.
- **Emoji titles.** Every doc H1 must have an emoji prefix (🏗️ System Design, 🗄️ Database, 🚀 API).
- **GitHub Alerts.** Use `> [!IMPORTANT]` for critical design decisions (shared PK, cascade behavior). Use `> [!NOTE]` for caveats and environment-specific behavior (test ENUM fallback, JWKS vs HS256).
- **Diagrams never stand alone.** After every Mermaid diagram, add a rationale section explaining 2–3 key *why* decisions. Diagrams show *what*; prose explains *why*.
- **Number everything referenceable.** Sequence diagram steps must be numbered. Document sections must be numbered (## 1., ## 2.).
- **Trade-off tables over paragraphs.** When comparing approaches (ENUM vs Dictionary, UUID vs Integer), use a comparison table with per-item rationale — not a prose block.
- **Error codes are mandatory.** Every API endpoint must document its specific error status codes, not just the happy path.
- **cURL examples for critical paths.** At minimum: login, the core transaction (booking), and webhook. Show copy-pasteable commands.
- **Gotchas section.** Each doc must list surprising behaviors discovered in the code — hardcoded values, fragile patterns, implicit assumptions.
- **Mermaid ERD syntax.** Never use hyphens in attribute type positions. Use comment strings: `uuid id "PK,FK - description"`.
- **State machines visualized.** Any ENUM representing a lifecycle must include a `stateDiagram-v2` with transitions labeled by what triggers them.

---

## Examples

```
/docs-generate
```
