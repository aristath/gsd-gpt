---
name: gsd-help
description: Show the Codex GSD command reference and usage flow.
---

# GSD for Codex: Command Reference

Use these skill names in prompts to run each workflow:

1. `gsd-help`
2. `gsd-new-project`
3. `gsd-map-codebase`
4. `gsd-create-roadmap`
5. `gsd-plan-phase`
6. `gsd-execute-plan`
7. `gsd-progress`
8. `gsd-resume-work`
9. `gsd-resume-task`
10. `gsd-pause-work`
11. `gsd-research-phase`
12. `gsd-discuss-phase`
13. `gsd-list-phase-assumptions`
14. `gsd-plan-fix`
15. `gsd-verify-work`
16. `gsd-consider-issues`
17. `gsd-add-todo`
18. `gsd-check-todos`
19. `gsd-add-phase`
20. `gsd-insert-phase`
21. `gsd-remove-phase`
22. `gsd-discuss-milestone`
23. `gsd-new-milestone`
24. `gsd-complete-milestone`

## Quick Start

1. Use `gsd-new-project` to initialize `.planning/PROJECT.md` and `.planning/config.json`.
2. Use `gsd-create-roadmap` to create `.planning/ROADMAP.md`, `.planning/STATE.md`, and phase directories.
3. Use `gsd-plan-phase` to produce a concrete phase plan markdown file.
4. Use `gsd-execute-plan` to implement the plan with tests and verification.

## Notes

- Keep `.planning` as the source of truth.
- Favor small plans (2-3 tasks) and verifiable checkpoints.
- Use `gsd-progress` before starting a new session.
