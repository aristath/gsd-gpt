---
name: gsd-insert-phase
description: Insert an intermediate roadmap phase between existing phases.
---

# gsd-insert-phase

Input: position and description.

1. Read `.planning/ROADMAP.md`.
2. Insert a decimal phase number between existing phases (e.g. 3.1).
3. Create matching folder under `.planning/phases/`.
4. Update phase ordering references in `.planning/STATE.md`.

Output: new midstream phase inserted without breaking roadmap continuity.
