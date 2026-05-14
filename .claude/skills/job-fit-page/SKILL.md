---
name: job-fit-page
description: |
  Build a tailored, unlisted landing page for a specific job/company — a "fit signal"
  doc you can walk an interviewer through. Reads prep docs from
  public/job-interview-prep/<slug>/, takes a free-form brief about what sections you
  want, then generates src/app/<slug>/page.tsx (robots-blocked) following the
  project's design system. Section structure is derived from your brief, not
  templated. Use when asked to "build a page for <company>", "make me a fit-signal
  doc", or "create the <company> interview page".
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - AskUserQuestion
---

# job-fit-page — company-specific fit page

You are generating an unlisted landing page tailored to a specific job. The Volvo
page at `src/app/volvo/page.tsx` is the reference for the *kind* of artifact
this is, NOT a template to copy. Section structure is derived from the user's brief.

## Phase 1 — Gather inputs

If the user invoked `/job-fit-page <text>`, treat `<text>` as the seed brief.
Use **AskUserQuestion** to fill any gaps. Only ask for what's actually unclear:

1. **Company + slug** — display name (e.g. "Volvo Cars") and kebab-case route slug
   (e.g. `volvo`). The route will be `/<slug>` and prep docs are expected at
   `public/job-interview-prep/<slug>/`.
2. **Role + stack** — one-line role title and the technical keywords that matter
   (e.g. "LLM engineer · Azure · RAG · production chat").
3. **Purpose** — how this page will be used (interview walkthrough? sent before
   a screen? recruiter share?). Shapes tone and density.
4. **Section brief** — free-form: what sections should the page have, in order,
   and what should each emphasize. This is the load-bearing input. If vague,
   push back for specifics before proceeding.
5. **Anything to avoid** — claims, projects, or framings the user wants kept off
   the page.

## Phase 2 — Read sources

Once per skill run, read:
- [CLAUDE.md](CLAUDE.md) and [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — for tokens,
  section conventions, and the iconography rules.
- [src/app/volvo/page.tsx](src/app/volvo/page.tsx) — reference for hero/index,
  `SectionHeader` usage, `Reveal` cascades, badge patterns, and unlisted-page
  metadata.

Then read every file under `public/job-interview-prep/<slug>/`. If the folder
doesn't exist, ask the user where the prep docs live (or whether to proceed with
just the brief).

## Phase 3 — Build the page

Create `src/app/<slug>/page.tsx`. Required shape:

- `export const metadata: Metadata = { title: "<Company> × Pranav Yadav — Fit signal", robots: { index: false, follow: false } }`.
- Main wrapper: `<main className="min-h-screen bg-brand-surface text-brand-ink">`.
- Hero section uses `hero-backdrop` and centers the title; include an index/TOC
  block only if there are 3+ sections.
- Each content section: `<section id="..." className="scroll-mt-8 bg-gradient-to-b ... px-6 py-12 sm:py-16">` with `<SectionHeader compact sectionDetails={{ kicker, title, subtitle }} />` at the top.
- Alternate background between `from-brand-surface to-brand-surface-alt` and
  `from-brand-surface-alt to-brand-surface` across sections for rhythm.
- Wrap reveal-eligible content in `<Reveal>` (and `<Reveal delay={n}>` for
  staggered grids — 80ms increments are the established cadence).
- Close with a short italic muted line in `bg-brand-surface-alt`.

Content rules:
- **Derive section content from prep docs + brief.** Quote pull-out lines
  verbatim where they're sharp; rewrite where they're not.
- **Never hardcode hex literals.** Use `brand-*` tokens or daisyUI semantic
  classes (`badge-success`, `badge-warning`, `badge-neutral`). If a needed color
  isn't in the palette, add a `--brand-*` token in `globals.css` and surface it
  via `@theme inline` — don't inline hex.
- **Reach for daisyUI primitives first** (`badge badge-soft badge-*`, `link`).
- **Helpers go alongside.** If a section needs custom layout (a diagram, a
  matrix, a non-trivial grid), create a sibling component at
  `src/app/<slug>/<helperName>.tsx`. Don't put one-off helpers in `src/components/`.
- Use `font-mono` for kickers, markers, pill labels, and captions per the design
  system.

After writing, run `npx tsc --noEmit` and `npm run lint` to catch errors. Fix
any issues before handing off.

## Phase 4 — Hand off

Output exactly:

```
Page written to src/app/<slug>/page.tsx.
Prep docs read: <list>.
Preview: npm run dev → http://localhost:3000/<slug>
```

Do not commit. Do not add the page to any nav. The route is unlisted by design.
