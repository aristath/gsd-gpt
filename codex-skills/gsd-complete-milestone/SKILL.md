---
name: gsd-complete-milestone
description: Archive completed milestone context and prep next milestone.
---

# gsd-complete-milestone

## Objective
Close one milestone and prepare the next iteration.

## Inputs

- Version label (required, e.g. `1.0.0`)

## Process

1. Validate all milestone phases are complete or explicitly deferred.
2. Create milestone archive under `.planning/milestones/`.
3. Append milestone summary to `.planning/MILESTONES.md`.
4. Update `.planning/STATE.md` to next milestone baseline.
5. If git policy allows, propose tag creation command:
`git tag v<version>`

## Output Contract

Milestone is archived with clear transition context for next cycle.
