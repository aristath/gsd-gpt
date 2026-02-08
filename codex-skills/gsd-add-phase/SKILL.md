---
name: gsd-add-phase
description: Add a new phase to the end of the active milestone roadmap.
---

# gsd-add-phase

Input: phase description from user.

1. Read `.planning/ROADMAP.md`.
2. Append a new phase with next sequential number.
3. Create phase folder under `.planning/phases/NN-phase-name`.
4. Update `.planning/STATE.md` if current milestone metadata changes.

Output: roadmap and phase folder updated consistently.
