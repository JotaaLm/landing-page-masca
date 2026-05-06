---
description: Create a GitHub Pull Request using AI
---

# `gh` PR Command Script

> **MANDATORY**: Use this workflow to generate a structured PR body based on recent commits and create a pull request on GitHub via the `gh` CLI. Do NOT begin writing the PR locally, but create the PR remotely.

## Workflow Actions

1. Check if the current branch is pushed to origin.
   - If missing on origin, attempt to push the current branch.
2. Read the changes by generating a diff (`git diff origin/main` or `git diff main`).
   - If there are no changes, stop the workflow and clearly notify the user that there is nothing to open a PR for.
3. Summarize the changes into the following elements based on the template:
    - **What changed**: Bulleted list of the high-level changes.
    - **Why are these changes needed**: Explain the rationale.
    - **Type of change**: Check the relevant boxes ('x').
4. Determine an appropriate Pull Request title.
5. Check if a Pull Request already exists for the current branch (`gh pr view`).
6. If a PR **already exists**:
   - Update it using `gh pr edit`. Append new details or rewrite the description if necessary.
   - Example command execution:
   ```bash
   gh pr edit --title "[Your Updated PR Title]" --body "[Your updated PR body]"
   ```
7. If a PR **does not exist**:
   - Create the PR using `gh pr create`.
   - Use the generated summary for the `.body` parameter and use your assigned title for `.title`
   - Example command execution:
   ```bash
   gh pr create --title "[Your PR Title]" --body "[Your generated PR body matching the .github/pull_request_template.md]"
   ```
6. (Optional) Provide the link of the newly created pull request to the user.
