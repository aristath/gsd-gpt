---
name: gsd-plan-fix
description: Create a focused fix plan for a bug or regression.
---

# gsd-plan-fix

Input: issue description.

1. Capture bug scope, impact, and reproduction.
2. Create a small fix plan file under current phase folder:
`NN-YY-FIX-PLAN.md`.
3. Include TDD steps: failing test, minimal fix, verification, regression checks.
4. Add rollback/risk notes if behavior-sensitive.

Output: executable fix plan ready for `gsd-execute-plan`.
