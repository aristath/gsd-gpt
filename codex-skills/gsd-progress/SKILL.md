---
name: gsd-progress
description: Report current GSD state and suggest next action.
---

# gsd-progress

## Objective
Summarize progress and route to the next high-value command.

## Process

1. Read `.planning/STATE.md` and `.planning/ROADMAP.md`.
2. Report:
- milestone progress
- current phase and latest plan
- recently completed work from summaries
- open blockers/issues
3. Provide next recommended command from:
- `gsd-plan-phase`
- `gsd-execute-plan`
- `gsd-complete-milestone`

## Output Contract

A concise status report with one recommended next step.
