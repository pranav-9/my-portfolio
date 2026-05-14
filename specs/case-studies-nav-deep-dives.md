# Case studies → navbar + decision sub-pages

**Status:** draft
**Created:** 2026-05-14

## Problem
Case studies are currently buried inside project carousel cards — visitors only find them if they scroll to the Project section, scan cards, and click the one with a case study. The single existing case study (concall-alpha) has substantial engineering depth, and the architectural decisions inside it deserve their own link-deepable pages. Promoting case studies to the navbar and giving each decision its own page makes the engineering work navigable, citable in conversations / Toptal intros, and signals that "case study" means a real deep-dive, not a marketing card.

## User-facing behavior
- **NavBar** gains a "Case Studies" entry between Work and Skills. Always rendered as a dropdown, even with one case study (signals "more coming").
- **Dropdown content** shows a two-level hierarchy: each case study title at the top level; each decision indented beneath it. Clicking the title goes to `/projects/[slug]`; clicking a decision goes to `/projects/[slug]/decisions/[decisionSlug]`.
- **Dropdown interaction**: click-to-open (not hover) on desktop. Outside-click closes. Esc closes. `aria-expanded`, `aria-haspopup="menu"`, items get `role="menuitem"`.
- **Mobile** (hamburger sheet): "Case Studies" becomes an accordion row inside the existing sheet. Tap expands to show the same hierarchy; tap again collapses. No nested dropdown overlay on mobile.
- **Project carousel cards** stop linking to case studies. All cards now link to `website`. (Cards remain visually unchanged — only the click target changes for projects that previously linked to a case study.)
- **Case study page** ([src/app/projects/[slug]/page.tsx](src/app/projects/[slug]/page.tsx)): the existing decision-summary cards are replaced with linked cards: title + rationale (current copy, now as a teaser) + "View →" affordance pointing at the decision sub-page.
- **Decision sub-page** shows: NavBar with breadcrumb `Case study · {project.title} · {decision.title}`; the decision title; the rationale as an intro paragraph; an optional longer-form body; an optional metrics block (label + value pairs); a back-link to the parent case study.

## Surface
- NavBar dropdown — modifies [src/app/navbar.tsx](src/app/navbar.tsx).
- New route: `src/app/projects/[slug]/decisions/[decisionSlug]/page.tsx` *(new)*.
- Existing case study page modification: [src/app/projects/[slug]/page.tsx](src/app/projects/[slug]/page.tsx).
- Project card click target: [src/app/projectCarousel.tsx](src/app/projectCarousel.tsx).
- Data + helpers: [src/lib/projects.ts](src/lib/projects.ts).

## Data
Extend the existing `Decision` type in [src/lib/projects.ts](src/lib/projects.ts):

```ts
type Metric = { label: string; value: string; caption?: string };

type Decision = {
  slug: string;            // NEW — kebab-case, used in the URL
  title: string;           // existing
  rationale: string;       // existing — also used as the sub-page intro paragraph
  body?: string;           // NEW — longer-form prose for the sub-page (optional)
  metrics?: Metric[];      // NEW — optional stats block on the sub-page
};
```

New helper in [src/lib/projects.ts](src/lib/projects.ts):
- `getDecision(projectSlug: string, decisionSlug: string): { project: Project; decision: Decision } | undefined`

For `generateStaticParams` on the new route: iterate `projects.filter(p => p.caseStudy).flatMap(p => p.caseStudy!.decisions.map(d => ({ slug: p.slug, decisionSlug: d.slug })))`.

The 3 existing concall-alpha decisions need slugs filled in. Suggested slugs (kebab-case derived from title — confirm during `/build`):
- "Schema-first JSON contracts everywhere — no regex on free text" → `schema-first-contracts`
- "LLM proposes, code verifies" → `llm-proposes-code-verifies`
- "Deterministic post-processing for scores" → `deterministic-scoring`

Bodies and metrics for each decision are left empty in v1 — the sub-page renders the rationale only, and authoring deeper content is a separate pass.

## Files to touch
- [src/lib/projects.ts](src/lib/projects.ts) — add `Metric` type; extend `Decision` with `slug`, `body?`, `metrics?`; add `getDecision` helper; fill in slugs for the 3 concall-alpha decisions.
- [src/app/navbar.tsx](src/app/navbar.tsx) — add Case Studies dropdown (desktop click-to-open + mobile accordion); pull `getProjectsWithCaseStudies()` for data; outside-click + Esc + ARIA handling.
- [src/app/projects/[slug]/page.tsx](src/app/projects/[slug]/page.tsx) — replace inline decision rendering with linked cards; each card links to `/projects/[slug]/decisions/[decisionSlug]`.
- `src/app/projects/[slug]/decisions/[decisionSlug]/page.tsx` *(new)* — sub-page route with `generateStaticParams` and `generateMetadata`; uses `notFound()` if the slug doesn't resolve.
- [src/app/projectCarousel.tsx](src/app/projectCarousel.tsx) — remove the case-study link branch; all cards link to `website`.

## Edge cases
- **Decision without `body`**: sub-page renders the rationale only, no empty section.
- **Decision without `metrics`**: hide the metrics block entirely.
- **Unknown decisionSlug**: `notFound()` → Next.js 404.
- **Mobile accordion**: must not break the existing hamburger sheet animation. Accordion lives inside the sheet's max-height transition.
- **Keyboard nav**: Enter/Space opens the dropdown when the trigger is focused; Esc closes; Tab cycles items.
- **Reduced motion**: dropdown open/close uses opacity + minimal translate, respecting `prefers-reduced-motion`.
- **Project carousel cards**: removing the case-study branch means existing visitors who knew the card was clickable to a deep-dive will now land on the live site instead. The case study is still reachable from the navbar — that's the intended tradeoff per the discussion.

## Non-goals
- Phases as sub-pages — phases stay inline as summary cards on the case study page.
- Authoring new case studies for other projects (on-the-move, easy-leads-ai) — the dropdown shape generalizes, but no new content is created here.
- "Recent deep dives" discovery surface anywhere on the site.
- Code samples / images / charts inside decision sub-pages — v1 is title + rationale + optional body + optional metrics. Markdown-in-body or rich content is a separate feature.
- Per-sub-page Open Graph metadata customization — sub-pages inherit/derive from parent route metadata.
- Dark mode for the dropdown — site is light-only.
- Hover-to-open dropdown — click-only is the chosen interaction.

## Open questions
- URL shape: `/projects/[slug]/decisions/[decisionSlug]` (chosen — leaves room for future categories like `/phases/`) vs `/projects/[slug]/[decisionSlug]` (flatter, but collides with parent's slug namespace). Going with the nested form; flag if you'd rather flatten.
- Decision teaser on the case study page: use the existing `rationale` as the card body (one paragraph, currently substantial), or introduce a shorter `teaser?: string` field for a tighter card? Defaulting to rationale to avoid extra authoring; promote to a separate field only if cards feel too dense at build time.
- Dropdown trigger label: "Case Studies", "Deep Dives", or "Work · Deep Dives"? Defaulting to "Case Studies" — matches the existing CaseStudy type name and the user-facing concept.
