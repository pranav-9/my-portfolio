# Now section

**Status:** draft
**Created:** 2026-05-14

## Problem
The home page shows what's been built (Project) and what's been done (TimeLine), but nothing about current focus. A "Now" section gives visitors a concrete signal of momentum and current direction — it makes the page feel alive instead of archival, and gives recruiters / collaborators a faster read on fit.

## User-facing behavior
- New section appears between Hero and Project on the home page.
- Section uses the standard section skeleton: kicker label, section title ("Now"), short subtitle, then content.
- Two labelled blocks side-by-side on desktop, stacked on mobile:
  - **Currently working on** — 1-3 items (short prose or bullets).
  - **Currently learning** — 1-3 items (short prose or bullets).
- Small "Last updated: <date>" caption at the section foot, in `font-mono` to match the established subtitle voice.
- Fades in on scroll via `<Reveal>` like other sections.

## Surface
New section component at `src/app/now.tsx`. Inserted into [src/app/page.tsx](src/app/page.tsx) between `<Hero />` and `<Project />`. No new route. Follows the section skeleton from [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — gradient surface (alternating `brand-surface` / `brand-surface-alt`), `sectionHeader` pattern, `brand-tint` tinted blocks for the two content columns.

## Data
Content lives inline in `src/app/now.tsx` as typed constants — small enough that a separate `src/lib/now.ts` would be ceremony. Shape:

```ts
type NowContent = {
  workingOn: string[];
  learning: string[];
  lastUpdated: string; // ISO date, e.g. "2026-05-14"
};
```

## Files to touch
- `src/app/now.tsx` *(new)* — section component, inline content constants, types.
- [src/app/page.tsx](src/app/page.tsx) — add `import Now from "./now"` and `<Now />` between `<Hero />` and `<Project />`.

## Edge cases
- **Mobile (<sm):** the two columns stack vertically.
- **Reduced motion:** handled by existing `<Reveal>` + `prefers-reduced-motion` CSS in [src/app/globals.css](src/app/globals.css).
- **Empty array:** if `workingOn` or `learning` is empty, render an em-dash placeholder inside the column so the layout doesn't collapse asymmetrically.
- **Stale date:** the `lastUpdated` date is rendered as-is. No automatic "stale" warning — that's a non-goal.

## Non-goals
- No RSS / Goodreads / Last.fm / external feed integration.
- No "currently reading" or "available for" fields — deferred to a v2 if the section earns its real estate.
- No CMS, no admin UI, no edit-from-the-browser.
- No automatic `lastUpdated` timestamp — the date is hand-edited alongside the content.
- No dark-mode variant — site is light-theme only per DESIGN_SYSTEM.

## Open questions
- Visual treatment for the two columns: equal-width cards on a tinted surface, or prose with sub-headings under the section title? Resolve during `/build` with a quick visual pass.
