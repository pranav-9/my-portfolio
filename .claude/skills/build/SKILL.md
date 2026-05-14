---
name: build
description: |
  Implement a feature from a spec in specs/<slug>.md. Reads the spec, follows
  project conventions from CLAUDE.md and DESIGN_SYSTEM.md, stops at the first
  failing typecheck or lint. Does not commit. Use after /shape has produced a
  spec, or when the user says "build <slug>" / "implement the spec".
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - AskUserQuestion
---

# build — spec → code

You are implementing a feature from a written spec. The spec is the contract — do not invent scope it doesn't mention. Do not commit.

## Phase 1 — Locate the spec

If the user invoked `/build <slug>`, read `specs/<slug>.md`. Otherwise list `specs/` with `ls -t specs/*.md | head -5`, ask which to build via **AskUserQuestion** if more than one is recent.

If the spec doesn't exist, stop and say: "No spec found. Run /shape first."

## Phase 2 — Load conventions

Read these once if not already in context this session:
- [CLAUDE.md](CLAUDE.md) — architecture rules
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — section skeleton, brand tokens, surface conventions

Non-negotiable rules (do not violate without explicit user override):
- Section components go in `src/app/`, not `src/components/`. Only shadcn primitives live in `src/components/ui/`.
- Never hardcode hex literals in JSX. Use `bg-brand-*` / `text-brand-*` etc., or add a new `--brand-*` token to [src/app/globals.css](src/app/globals.css).
- Don't introduce shadcn tokens (`--primary`, `--foreground`) into page sections.
- Use `cn()` from [src/lib/utils.ts](src/lib/utils.ts) for conditional class composition.
- Wrap new sections in `<Reveal>` from [src/app/reveal.tsx](src/app/reveal.tsx) for fade-in. No third-party animation libraries.
- New projects: add to `projects` in [src/lib/projects.ts](src/lib/projects.ts). `caseStudy` field only if a dedicated page is wanted.
- daisyUI is light-theme only. Use daisyUI primitives (`badge`, `btn`, `progress`, `link`, `navbar`, `footer`) before hand-rolling.

## Phase 3 — Plan execution

From the spec's "Files to touch" list, write a TodoWrite list with one item per file. Order: types first, then data, then components, then route/page wiring. If the spec is missing the file list or is ambiguous, ask the user to update the spec — don't guess.

## Phase 4 — Implement

Work through the todos one at a time, marking complete as you go. For new section components, use the skeleton from DESIGN_SYSTEM.md. Use `font-mono` for descriptive/caption text. Use `@utility kicker` and `@utility kicker-dot` for the small uppercase labels above section titles.

## Phase 5 — Verify

After all files are written, run in order (stop at first failure):

```bash
npx tsc --noEmit
npm run lint
```

If either fails: fix the issue and re-run. Do not proceed to ship — that's a separate skill.

## Phase 6 — Hand off

After typecheck and lint pass, output exactly:

```
Built <slug>. Typecheck + lint pass. No commit yet.
Next: review the diff (git diff), then run /ship to verify build + commit + push.
```

Do not commit. Do not push. Do not run `npm run build` — that's `/ship`'s job. Stop here.
