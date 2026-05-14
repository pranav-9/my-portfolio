---
name: shape
description: |
  Turn a vague feature idea into a concrete spec written to specs/<slug>.md.
  Asks 3-5 clarifying questions, then writes user-facing behavior, route/section
  layout, data shape, edge cases, and explicit non-goals. Stops at the spec —
  does not implement. Use when the user says "I want to add X", "let's build Y",
  or describes a feature without yet knowing the shape.
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - AskUserQuestion
  - Bash
---

# shape — idea → spec

You are converting a vague feature idea into a written spec. Do NOT write any code. Do NOT scaffold files. The only artifact this skill produces is `specs/<slug>.md`.

## Phase 1 — Understand the idea

If the user invoked `/shape <text>`, treat `<text>` as the seed idea. Otherwise ask: "What's the feature in one sentence?"

Then read [CLAUDE.md](CLAUDE.md) and [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) once if you haven't this session — the spec must respect the section-alongside-routes architecture and the project-data-→-two-surfaces pattern.

## Phase 2 — Ask 3-5 clarifying questions

Use **AskUserQuestion** for each. Cover, in order, only the ones that are actually unclear:

1. **Surface** — is this a new section on the home page, a new route, an unlisted page (like `/volvo`), or a modification to an existing section?
2. **Data shape** — does it extend the existing `Project`/`CaseStudy` types in [src/lib/projects.ts](src/lib/projects.ts), need a new typed source, or no persistent data?
3. **Linked surfaces** — does it link out, link to a case study, or both?
4. **Visual primitive** — is there an existing daisyUI/shadcn primitive that fits, or does it need a new section component?
5. **Non-goals** — what's explicitly out of scope (anti-creep)?

Skip questions where the answer is obvious from the seed idea. Three good questions beats five rote ones.

## Phase 3 — Write the spec

Generate a kebab-case slug from the feature title. Write `specs/<slug>.md` with this structure (no other sections — terseness is a feature):

```markdown
# <Feature title>

**Status:** draft
**Created:** <YYYY-MM-DD>

## Problem
<1-2 sentences. What's missing today. Why this is worth building.>

## User-facing behavior
<Bulleted. What the visitor sees and does. Concrete, not abstract.>

## Surface
<Route path + section placement. e.g. "New section in src/app/, inserted between Skills and TimeLine in src/app/page.tsx" or "New route /foo with its own page.tsx".>

## Data
<Types touched or added. If extending Project/CaseStudy, name the fields. If no data, say "none".>

## Files to touch
<Bulleted file paths. Mark new files with (new).>

## Edge cases
<Bulleted. What happens with no data, on mobile, with prefers-reduced-motion, etc.>

## Non-goals
<Bulleted. Explicit things this feature does NOT do.>

## Open questions
<Bulleted, or "none". Things you couldn't resolve in Q&A.>
```

Use today's date from the environment. Get it with `date +%Y-%m-%d` if needed.

## Phase 4 — Hand off

After writing the spec, output exactly:

```
Spec written to specs/<slug>.md.
Next: review the spec, edit if needed, then run /build <slug>.
```

Do not continue past this point. Do not offer to implement. The user reviews the spec before `/build` runs.
