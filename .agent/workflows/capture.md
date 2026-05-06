---
description: Capture knowledge from the current conversation as an Architecture Decision Record (ADR). Use at the end of any meaningful technical discussion.
---

# /capture - Knowledge Capture

$ARGUMENTS

---

## Purpose

Distill the current conversation into a structured ADR that the engineering team can reference as a definitive technical guide. This captures the reasoning, trade-offs, and conclusions before they are lost.

---

## Steps

1. **Detect the next ADR number**
   - List files in `./docs/adrs/`
   - Find the highest `NNNN` prefix
   - Increment by 1 (e.g., if `0004` exists → next is `0005`)

2. **Analyze the conversation**
   - Silently identify the core architectural, implementation, or debugging themes
   - Do NOT ask the user what the topic is — infer it from context

3. **Generate the ADR file**
   - Path: `./docs/adrs/[NNNN]-[short-topic-in-kebab-case].md`
   - Use the exact structure below

4. **Update the README**
   - Add a link to the new ADR in the Documentation Hub section of `README.md`
   - Place it in the correct numbered position under "For Core Backend Developers"

5. **Present to user**
   - Show the file path and a one-line summary of what was captured

---

## ADR Template (MANDATORY)

```markdown
# [Auto-Generated Title: Clear, professional, searchable]
**Date:** [Current Date]

### 1. The Core Problem & Context
* Concise summary of the goal, bug, or architectural dilemma from this session.

### 2. Deep Dive & Trade-offs
* Detailed explanation of approaches discussed.
* Pros and cons of each approach.
* Constraints, performance implications, or design patterns that factored in.
* **Mandatory Comparison Table:** When two or more concepts were compared, create a table comparing them across Performance, Storage, Flexibility, and Use Case.

### 3. What a Junior Developer Needs to Know
* Core concepts and the "why" in plain, accessible language.
* Common pitfalls, misconceptions, and gotchas.

### 4. Decision Framework & Rules of Thumb
* Actionable "If X, then choose Y" heuristics.
* Checklist or rules based on conclusions.
```

---

## Constraints

- **Do not invent information.** Ground the document strictly in facts discussed in this conversation.
- **Professional, objective, didactic tone.** No fluff. Highly technical and precise.
- **Accessible to juniors and non-native English speakers.** Use simple sentence structures.

---

## Examples

```
/capture
/capture after discussing database migration strategy
/capture we just decided on the auth flow
```
