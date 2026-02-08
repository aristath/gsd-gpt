---
name: gsd-remove-phase
description: Remove a future phase and reindex subsequent phases safely.
---

# gsd-remove-phase

Input: phase number.

1. Validate target phase is future/unstarted.
2. Remove it from `.planning/ROADMAP.md`.
3. Rename/reindex following phase labels and directories.
4. Update `.planning/STATE.md` references.

Output: roadmap and directories reindexed consistently.
