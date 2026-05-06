---
description: Stage changes, generate a summary commit message, and commit. No push.
---

# /commit - Smart Commit

$ARGUMENTS

---

## Steps

1. **Check staged changes**
   // turbo
   - Run `git diff --cached --stat`
   - If nothing is staged, run `git add .` and re-check

2. **Analyze the diff**
   // turbo
   - Run `git diff --cached` to understand what changed
   - Group changes by component (entities, modules, docs, config, tests)

3. **Generate commit message**
   - Use [Conventional Commits](https://www.conventionalcommits.org/) format
   - Structure:

   ```
   <type>(<optional scope>): <short summary>

   <optional body grouped by component>
   ```

   - Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`, `perf`
   - If changes span multiple types, use the dominant one
   - Keep the summary line under 72 characters
   - Body lines under 80 characters

4. **Present to user for review**
   - Show the full commit message
   - Wait for user approval or edits
   - Do NOT commit until user confirms

5. **Commit (after approval)**
   - Run `git commit -m "<approved message>"`
   - Do NOT push

---

## Rules

- **Never push.** This workflow ends at commit.
- **Never force-add.** Respect `.gitignore`.
- **Always wait for approval.** The commit message is a proposal, not final.
- **Group logically.** If 20 files changed, don't list all 20 — summarize by area.

---

## Examples

```
/commit
/commit just the docs changes
/commit fix: corrected the gym entity type
```
