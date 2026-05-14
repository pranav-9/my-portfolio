# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for Pranav Yadav. Next.js 15 App Router, deployed on Vercel. Design language and stack overview live in [README.md](README.md) and [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — read both before doing UI work; the latter is detailed and is the source of truth for color, typography, spacing, and the section pattern.

## Commands

```bash
npm run dev      # Next dev server with Turbopack
npm run build    # production build (also Turbopack — note this in CI)
npm run start    # serve the production build
npm run lint     # ESLint (eslint-config-next, flat config in eslint.config.mjs)
```

There is no test suite. There is no formatter configured beyond ESLint defaults.

TypeScript: project uses `strict` and `noEmit`. Type-check with `npx tsc --noEmit`. Path alias `@/*` resolves to `src/*` (see [tsconfig.json](tsconfig.json)).

## Architecture

### Sections-alongside-routes

Page-level section components (Hero, Project, Skills, TimeLine, Footer, NavBar) live **inside [src/app/](src/app/)** next to `page.tsx`, not under `src/components/`. Only shadcn primitives live under [src/components/ui/](src/components/ui/). Treat anything in `src/app/` as either a route, a section component, or a section helper — don't move them out unless you're refactoring intentionally.

The home page ([src/app/page.tsx](src/app/page.tsx)) just composes those sections in order; section content lives inside the section files themselves.

### Project data → two surfaces

A single typed source of truth in [src/lib/projects.ts](src/lib/projects.ts) (`Project` + `CaseStudy` shapes) feeds two places:

- The home grid at [src/app/project.tsx](src/app/project.tsx) → [src/app/projectCarousel.tsx](src/app/projectCarousel.tsx). Cards with a `caseStudy` link to the internal route; cards without one link out to `website`.
- The dynamic case-study route [src/app/projects/[slug]/page.tsx](src/app/projects/[slug]/page.tsx). It uses `getProjectsWithCaseStudies()` for `generateStaticParams` (so only projects with a `caseStudy` get a static page) and `getProject(slug)` + `notFound()` to gate.

When adding a project: add the entry to `projects` in [src/lib/projects.ts](src/lib/projects.ts). Add `caseStudy` only if you want the dedicated case-study page; otherwise the card just links to `website`.

### Standalone unlisted pages

[src/app/volvo/page.tsx](src/app/volvo/page.tsx) is an unlisted landing page (`robots: { index: false, follow: false }`) used as a tailored "fit signal" doc. Pattern: standalone route with its own data inlined and a local helper component ([src/app/volvo/quadrantGrid.tsx](src/app/volvo/quadrantGrid.tsx)). If a similar one-off arrives, mirror this shape rather than wedging it into the project data.

### Styling: three overlapping layers

Order of preference when adding section UI:

1. **Brand tokens** (`--brand-*` in [src/app/globals.css](src/app/globals.css), exposed via `@theme inline` as `bg-brand-*` / `text-brand-*` / `border-brand-*` / `from-brand-*` / `to-brand-*`). Use these first for any color decision.
2. **Tailwind v4 utilities** for layout, spacing, typography.
3. **daisyUI** (`@plugin "daisyui"`, light theme only) for `badge`, `btn`, `progress`, `link`, `navbar`, `footer`, `bg-base-*`, `bg-neutral`. Reach for daisyUI when the primitive already exists; don't hand-roll one.
4. **shadcn tokens** (`--primary`, `--foreground`, etc.) are wired up but consumed only by shadcn primitives in [src/components/ui/](src/components/ui/). Don't introduce them into page sections.

Hard rule: **never hardcode hex literals in JSX**. If a needed color isn't in the brand palette, add a `--brand-*` token in [globals.css](src/app/globals.css) and expose it via `@theme inline`.

The full section skeleton, surface conventions, type scale, and iconography rules are in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md). When adding a new section, follow its "Quick reference for new components" checklist.

**Drift warning:** [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) references `src/app/skillDomain.tsx` and `src/app/skillbox.tsx`, but those files no longer exist — that content is now inlined into [src/app/skills.tsx](src/app/skills.tsx). Treat the design tokens and patterns it documents as accurate; treat the file paths in its tables as illustrative rather than current.

### Scroll-reveal pattern

[src/app/reveal.tsx](src/app/reveal.tsx) is a client component that wraps children with a `data-reveal` attribute and an IntersectionObserver. The actual fade-in is CSS in [globals.css](src/app/globals.css) (`[data-reveal]` + `[data-reveal][data-revealed="true"]`, with a `prefers-reduced-motion` opt-out). Pass `delay={n}` for a staggered cascade (used in the project grid). Don't reach for a third-party animation library — use this.

### Other conventions worth knowing

- Custom Tailwind utilities `@utility kicker` and `@utility kicker-dot` in [globals.css](src/app/globals.css) are used for the small uppercase-mono labels above section/case-study titles.
- [src/lib/utils.ts](src/lib/utils.ts) exports `cn()` (clsx + tailwind-merge) — use it whenever conditionally composing class names.
- [next.config.ts](next.config.ts) sets `images.dangerouslyAllowSVG: true` with a sandboxed CSP. Some project logos in [public/](public/) are SVG (`easy-leads.svg`); this is intentional, don't remove the flag without checking.
- `NavBar` accepts an optional `breadcrumb` prop — case-study pages pass `Case study · {project.title}`; the home page omits it.
- Geist Sans / Geist Mono are loaded as `next/font` CSS variables in [src/app/layout.tsx](src/app/layout.tsx); use `font-mono` for descriptive/caption text per the design system.
- `@vercel/analytics` is wired in [layout.tsx](src/app/layout.tsx); changes that affect navigation should keep `<Analytics />` mounted in the root layout.
