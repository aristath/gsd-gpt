---
name: gsd-execute-plan
description: Execute a phase PLAN file with verification and state updates.
---

# gsd-execute-plan

## Objective
Execute one `PLAN.md` file safely and update project memory.

## Inputs

- Path to `PLAN.md` (required)

## Process

1. Validate `.planning/` and plan path exist.
2. Parse tasks and execute sequentially.
3. For each task:
- use TDD where code changes are made
- run verification commands before completion claims
- stage only relevant files
- create one commit per task when requested by user policy
4. Create `SUMMARY.md` adjacent to the plan.
5. Update `.planning/STATE.md` with completed work and decisions.
6. Update `.planning/ROADMAP.md` plan status when applicable.

## Deviation Rules

- Auto-fix blockers required to continue.
- Log non-critical enhancements to issue tracking docs.
- Pause and ask user before major architecture shifts.

## Output Contract

- Plan tasks completed or clearly blocked with evidence.
- `SUMMARY.md` and `STATE.md` updated.
