---
name: gsd-create-roadmap
description: Create roadmap and state files from project requirements.
---

# gsd-create-roadmap

## Objective
Create a phase-based roadmap and state tracker under `.planning/`.

## Process

1. Read `.planning/PROJECT.md`.
2. Create `.planning/ROADMAP.md` with milestone and numbered phases.
3. Create `.planning/STATE.md` with:
- current milestone
- current phase
- completed plans
- decisions
- open issues
4. Create `.planning/phases/` and one folder per phase using format:
`NN-phase-name`

## Output Contract

- `ROADMAP.md` and `STATE.md` are consistent.
- At least one phase is ready for `gsd-plan-phase`.
