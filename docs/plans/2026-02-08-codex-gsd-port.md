# Codex GSD Port Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a reproducible Codex/GPT-native equivalent of GSD with installable skills that mirror the original command workflow.

**Architecture:** Keep existing Claude assets untouched and add a parallel Codex distribution path. Provide a dedicated Codex installer that writes skills to `~/.codex/skills`, where each `gsd-*` command maps to one Codex skill directory (`SKILL.md`). Reuse GSD concepts (`.planning`, phases, roadmap/state) while adapting instructions from Claude tool syntax to Codex-compatible behavior.

**Tech Stack:** Node.js (no external deps), markdown skill files, npm bin scripts, shell verification.

---

### Task 1: Add test scaffolding for Codex installer helpers (TDD red)

**Files:**
- Create: `tests/codex-install.test.js`
- Create: `lib/codex-install.js` (stub only)
- Modify: `package.json`

1. Write failing tests for:
- `parseCodexInstallArgs(argv)` handling `--global`, `--local`, `--codex-dir`, `--help`, invalid combinations.
- `resolveCodexInstallDir({isGlobal,codexDirArg,env,home,cwd})` precedence and path selection.
2. Run `npm test` and confirm failures.
3. Implement minimal helper code to make tests pass.
4. Run `npm test` and confirm pass.

### Task 2: Implement Codex installer CLI and packaging

**Files:**
- Create: `bin/install-codex.js`
- Modify: `package.json`

1. Add `get-shit-done-codex` bin command.
2. Implement installer behavior:
- Global install target default: `~/.codex/skills`
- Local install target: `./.codex/skills`
- Optional override: `--codex-dir` for global installs
- Copy all skills from repo `codex-skills/*` into target skills dir
- Print clear success/help output
3. Verify with `node bin/install-codex.js --help` and `node bin/install-codex.js --local` in repo.

### Task 3: Add multi-skill mirrored Codex workflow pack

**Files:**
- Create directories/files under `codex-skills/`:
  - `codex-skills/gsd-help/SKILL.md`
  - `codex-skills/gsd-new-project/SKILL.md`
  - `codex-skills/gsd-map-codebase/SKILL.md`
  - `codex-skills/gsd-create-roadmap/SKILL.md`
  - `codex-skills/gsd-plan-phase/SKILL.md`
  - `codex-skills/gsd-execute-plan/SKILL.md`
  - `codex-skills/gsd-progress/SKILL.md`
  - `codex-skills/gsd-resume-work/SKILL.md`
  - `codex-skills/gsd-pause-work/SKILL.md`
  - `codex-skills/gsd-complete-milestone/SKILL.md`

1. Mirror original command intent and output contracts.
2. Replace Claude-specific tool references with Codex-compatible instructions.
3. Keep `.planning` artifact contract compatible with existing repo templates.
4. Add minimal, actionable argument handling guidance inside each skill.

### Task 4: Update repository docs for Codex usage

**Files:**
- Modify: `README.md`

1. Add a new “Codex/GPT Usage” section with:
- install command (`node bin/install-codex.js --global` and local option)
- list of installed `gsd-*` Codex skills
- how to invoke them in Codex (mentioning skill name in prompt)
- compatibility notes with original Claude workflow
2. Keep Claude workflow docs intact; present Codex as additional supported mode.

### Task 5: Verify end-to-end and summarize

**Files:**
- No required file edits

1. Run verification commands:
- `npm test`
- `node bin/install-codex.js --help`
- `node bin/install-codex.js --local`
- `find ./.codex/skills -maxdepth 2 -name SKILL.md | sort`
2. Confirm installed skills are present and named correctly.
3. Capture any limitations explicitly in final summary.
