---
name: gsd-list-phase-assumptions
description: Show intended implementation assumptions before planning/execution.
---

# gsd-list-phase-assumptions

Input: phase number.

1. Read `.planning/PROJECT.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`.
2. List assumptions about architecture, dependencies, risks, and tests.
3. Mark each assumption as high/medium/low confidence.
4. Ask user to correct assumptions before proceeding.

Output: explicit assumption list with confidence and correction points.
