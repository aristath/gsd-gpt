---
name: gsd-new-project
description: Initialize a GSD project in Codex by creating PROJECT and config artifacts.
---

# gsd-new-project

## Objective
Create `.planning/PROJECT.md` and `.planning/config.json` from user intent.

## Process

1. Ensure `.planning/` exists; create if missing.
2. Ask focused requirements questions only if required to avoid ambiguity.
3. Write `.planning/PROJECT.md` with:
- vision
- goals
- non-goals
- constraints
- acceptance criteria
4. Write `.planning/config.json` with mode:
- `interactive` (safe default)
- `yolo` (maximum autonomy)
5. If git exists, stage only new planning files and propose commit message:
`docs(gsd): initialize project planning artifacts`

## Output Contract

- `.planning/PROJECT.md` exists and is specific enough to plan phases.
- `.planning/config.json` exists and is valid JSON.
