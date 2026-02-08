---
name: gsd-plan-phase
description: Plan one roadmap phase into small, executable tasks.
---

# gsd-plan-phase

## Objective
Turn one phase from `ROADMAP.md` into an executable plan markdown file.

## Inputs

- Phase number (required from user prompt)

## Process

1. Validate `.planning/ROADMAP.md` and `.planning/STATE.md` exist.
2. Read target phase context from roadmap/state/project docs.
3. Create plan file in phase folder using pattern:
`.planning/phases/NN-phase-name/NN-YY-PLAN.md`
4. Keep scope small:
- 2-3 tasks
- each task has concrete files
- each task has verification steps
5. Include checkpoints for risky steps.

## Output Contract

A single new `PLAN.md` exists and is ready for `gsd-execute-plan`.
