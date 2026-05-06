---
description: Update existing documentation by analyzing the git diff. No input needed — reads the diff and current docs automatically.
---

# /docs-update - Surgical Documentation Update

Reads the staged or recent git diff, compares it against the existing documentation, and surgically updates only the sections that changed. The programmer just runs the command after making code changes.

---

## Steps

1. **Get the code changes**
   // turbo
   - Run `git diff --cached --stat` to check if there are staged changes
   - If staged changes exist, run `git diff --cached` to get the full diff
   - If nothing is staged, run `git diff HEAD~1` to get the last commit's diff
   - Store the diff output for analysis

2. **Classify the diff impact**
   - Analyze the diff and classify which documentation areas are affected:

   | Changed File Pattern | Affected Doc |
   |---|---|
   | `src/database/entities/*.entity.ts` | `docs/architecture/database-erd.md` |
   | `src/modules/*/*.controller.ts` | `docs/api/main-features.md` |
   | `src/modules/*/*.service.ts` | `docs/api/main-features.md` |
   | `src/modules/*/dto/*.dto.ts` | `docs/api/main-features.md` |
   | `src/app.module.ts` | `docs/architecture/system-design.md` |
   | `src/main.ts` | `docs/architecture/system-design.md` |
   | `src/common/**` | `docs/architecture/system-design.md` |
   | `src/database/data-source.ts` | `docs/architecture/database-erd.md` |
   | `package.json` | `README.md` |
   | `src/database/migrations/*` | `docs/architecture/database-erd.md` |

   - If the diff touches NONE of these patterns, report "No documentation impact" and stop

3. **Read affected documentation files**
   // turbo
   - Read ONLY the docs identified in Step 2
   - Run `cat docs/architecture/system-design.md` (if affected)
   - Run `cat docs/architecture/database-erd.md` (if affected)
   - Run `cat docs/api/main-features.md` (if affected)
   - Run `cat README.md` (if affected)

4. **Read the changed source files (full versions)**
   // turbo
   - For each file in the diff, read the FULL current version (not just the diff hunks)
   - This gives you the complete context to write accurate documentation
   - Example: `cat src/modules/sessions/sessions.controller.ts`

5. **Surgically update affected docs**
   - For each affected documentation file:
     - **DO NOT** rewrite the entire file
     - **Only edit** the specific sections, tables, Mermaid blocks, or bullet points that need to change
     - If a new entity was added → update the ERD Mermaid block, add a table description, update relationships
     - If an endpoint changed → update that endpoint's section in main-features.md
     - If a new module was added → add a row to the module table in system-design.md, update the C4 diagram if it adds an external service
     - If an enum changed → update the ENUM table in database-erd.md
   - **Explain trade-offs**: If the diff introduces a new pattern or changes an existing one, add a brief explanation of *why* the change was made

6. **Check for ADR-worthy changes**
   - An ADR is needed if the diff introduces:
     - A new external service integration (e.g., adding Redis, S3, a new payment provider)
     - A fundamental schema change (e.g., switching from soft deletes to hard deletes)
     - A new architectural pattern (e.g., adding event-driven messaging, CQRS)
     - A major dependency change (e.g., switching from TypeORM to Prisma)
   - If an ADR is needed:
     - Check existing ADRs: `ls docs/adrs/` to get the next number
     - Generate: `docs/adrs/NNNN-short-topic-name.md`
     - Include: summary, context, decision, trade-offs, rules for juniors
   - If no ADR is needed, skip this step

7. **Update the "Missing Information" sections**
   - If the diff resolves a previously listed gap (e.g., adds pagination, adds CORS), remove it from "Missing Information"
   - If the diff introduces a new known limitation, add it

8. **Present changes to user**
   - List exactly which doc files were updated and what sections changed
   - If an ADR was generated, highlight it
   - Summarize the change in 2-3 sentences
   - Wait for user review before any git operations

---

## Rules

- **Zero input required.** The diff is read from git automatically. The programmer just runs `/docs-update`.
- **Surgical, not wholesale.** Never rewrite an entire doc file. Only touch the sections affected by the diff.
- **No hallucination.** If the diff is ambiguous, read the full source file for context. If still unclear, add to "Missing Information."
- **Preserve voice.** Keep the existing document's tone and formatting style. Don't introduce a different writing style.
- **Mermaid must compile.** When updating Mermaid diagrams, ensure the full block is valid syntax. Quote labels with parens/brackets.
- **Explain the why.** When a change introduces a trade-off or new pattern, always include a brief rationale for junior developers.

### Writing Standards (Mandatory)

When adding new content to existing docs, follow these standards to match the established quality:

- **Emoji titles.** Every doc H1 must have an emoji prefix (🏗️ System Design, 🗄️ Database, 🚀 API).
- **GitHub Alerts.** Use `> [!IMPORTANT]` for critical design decisions. Use `> [!NOTE]` for caveats and environment-specific behavior.
- **Diagrams never stand alone.** If updating a Mermaid diagram, ensure there is a rationale section after it.
- **Number everything referenceable.** Sequence diagram steps must be numbered. Document sections must be numbered.
- **Trade-off tables over paragraphs.** When documenting new schema or design decisions, use comparison tables with per-item rationale.
- **Error codes are mandatory.** New API endpoints must document specific error status codes, not just the happy path.
- **C4 Container notation.** If updating the C4 diagram, use `System_Boundary`, `Container`, `ContainerDb` — not flat `C4Context`.

---

## Examples

```
/docs-update
```
