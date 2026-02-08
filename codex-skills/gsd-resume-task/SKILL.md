---
name: gsd-resume-task
description: Resume a specific interrupted task with exact next action.
---

# gsd-resume-task

Input: task reference or plan path.

1. Read latest summary, `.planning/STATE.md`, and `.planning/.continue-here.md`.
2. Locate exact incomplete task and verification status.
3. Provide immediate next command/action.
4. Update continuity notes if task target changes.

Output: user gets a concrete task restart point.
