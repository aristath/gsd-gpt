---
name: gsd-map-codebase
description: Analyze an existing codebase and generate a focused planning map.
---

# gsd-map-codebase

## Objective
Generate `.planning/codebase/` knowledge docs for brownfield planning.

## Required Outputs

Create these files:

- `.planning/codebase/STACK.md`
- `.planning/codebase/ARCHITECTURE.md`
- `.planning/codebase/STRUCTURE.md`
- `.planning/codebase/CONVENTIONS.md`
- `.planning/codebase/TESTING.md`
- `.planning/codebase/INTEGRATIONS.md`
- `.planning/codebase/CONCERNS.md`

## Process

1. Inspect repository structure and key configs.
2. Use parallel exploration where safe.
3. Keep docs concise and actionable for future planning.
4. Capture known risks and assumptions explicitly.

## Output Contract

All seven files exist and can be used by `gsd-new-project` and `gsd-plan-phase`.
