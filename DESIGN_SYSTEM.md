# Design System

A living description of the visual language used across the site. The system is **descriptive, not prescriptive** — it documents what the code currently does. Conventions here grew organically from the page sections in [src/app/](src/app/).

## Stack & layering

The styling stack has three overlapping layers. Knowing which one to reach for matters when adding new UI.

| Layer | Defined in | Used for |
|---|---|---|
| **Brand tokens** | `--brand-*` vars in [src/app/globals.css](src/app/globals.css), exposed via `@theme` as `bg-brand-*` / `text-brand-*` / `border-brand-*` / `from-brand-*` / `to-brand-*` | All page-section colors — accent, tinted surfaces, dividers, hero gradient |
| **Tailwind v4 utilities** | [src/app/globals.css](src/app/globals.css) | Layout, spacing, typography |
| **daisyUI components** | `@plugin "daisyui"` in [globals.css](src/app/globals.css) (light theme only) | `badge`, `btn`, `progress`, `navbar`, `footer`, `link`, `bg-base-*`, `bg-neutral` |
| **shadcn/ui tokens** | `--primary`, `--foreground`, etc. in [globals.css](src/app/globals.css), components in [src/components/ui/](src/components/ui/) | `card`, `chart` primitives — defined but page sections use brand tokens instead |

> **Today's reality:** page sections (`hero`, `project`, `skills`, `time`, `footer`) consume the brand tokens + daisyUI. Raw hex literals have been eliminated from the component layer. The shadcn token layer is still wired up and used by shadcn primitives under [src/components/ui/](src/components/ui/). Light theme only — no `.dark` block.

## Color

### Brand tokens

Defined in `:root` in [globals.css](src/app/globals.css) and exposed as Tailwind color utilities via `@theme inline`. Reach for these first for any page-section color.

| Token | Value | Utility classes | Where it shows up |
|---|---|---|---|
| `--brand-accent` | `#355794` | `text-brand-accent`, `bg-brand-accent`, `var(--brand-accent)` | Skill domain titles ([skillDomain.tsx:17](src/app/skillDomain.tsx#L17)), "Level:" label ([skillbox.tsx:47](src/app/skillbox.tsx#L47)), company name + timeline marker ([jobHolder.tsx:26](src/app/jobHolder.tsx#L26), [jobHolder.tsx:48](src/app/jobHolder.tsx#L48)) |
| `--brand-tint` | `#e6ebf5` | `bg-brand-tint` | Tinted container surface: skill domain grid ([skillDomain.tsx:20](src/app/skillDomain.tsx#L20)), job card ([jobHolder.tsx:32](src/app/jobHolder.tsx#L32)), project card ([projectCarousel.tsx:14](src/app/projectCarousel.tsx#L14)) |
| `--brand-surface` | `#ffffff` | `bg-brand-surface`, `from-brand-surface`, `to-brand-surface` | Skillbox card ([skillbox.tsx:24](src/app/skillbox.tsx#L24)), section gradient stop |
| `--brand-surface-alt` | `#f8f8f8` | `from-brand-surface-alt`, `to-brand-surface-alt` | Section gradient stop (alternates with `brand-surface`) |
| `--brand-divider` | `#e9ebee` | `border-brand-divider` | Horizontal rules flanking section titles ([sectionHeader.tsx:10](src/app/sectionHeader.tsx#L10)) |
| `--brand-warm-from` | `#61605e` | `from-brand-warm-from` | Hero highlight pill — gradient start ([hero.tsx:31](src/app/hero.tsx#L31)) |
| `--brand-warm-to` | `#b1afa9` | `to-brand-warm-to` | Hero highlight pill — gradient end ([hero.tsx:31](src/app/hero.tsx#L31)) |

**Surface convention:** tinted containers (`brand-tint`) hold white (`brand-surface`) items. The two section-gradient stops alternate per section to create visual layering.

### shadcn tokens

Defined in `:root` of [globals.css](src/app/globals.css). Consumed by shadcn primitives under [src/components/ui/](src/components/ui/) (`card`, `chart`):

`--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--chart-1..5`, `--sidebar-*`.

Base color is **neutral** (per [components.json](components.json)), all expressed in `oklch()`. Light theme only — no dark mode wiring.

### daisyUI semantic colors

Used via class names: `bg-base-100`, `bg-base-200`, `bg-neutral`, `text-neutral-content`. Badges: `badge-primary`, `badge-secondary`, `badge-accent`, `badge-info`, `badge-neutral`. Progress: `progress-success`, `progress-warning`, `progress-error`. Buttons: `btn-primary`, `btn-success`.

## Typography

### Fonts

- **Geist Sans** — default body font ([layout.tsx:7](src/app/layout.tsx#L7))
- **Geist Mono** — `--font-geist-mono` CSS var, applied via `font-mono`
- **Serif** — system serif via `font-serif` (used once, in the hero sub-tagline)

### Scale

The site uses Tailwind's default size scale, paired with `sm:` jumps for desktop. There is **no centralized type scale**, but a clear hierarchy emerges:

| Role | Classes | Example |
|---|---|---|
| Hero name | `text-5xl sm:text-8xl font-bold` | "Pranav Yadav" |
| Hero tagline | `text-2xl sm:text-4xl font-serif` | "Blending structure with creativity." |
| Hero body | `text-xl/12 sm:text-4xl/22 font-mono` | "Full Stack Developer with a…" |
| Section title (h1) | `text-4xl sm:text-7xl font-bold` | "Projects", "Skills", "Experience" |
| Section subtitle (h3) | `text-md sm:text-xl font-extralight font-mono italic` | description under section title |
| Subsection title | `text-2xl sm:text-4xl font-bold` + `text-[#355794]` | "Backend Work", "Frontend Work" |
| Card title | `font-bold text-2xl` | Project title, skill name |
| Card body | `font-mono` (default size) | Project descriptions |
| Job role | `font-bold text-lg sm:text-2xl` | role inside a job card |
| Timeline year | `text-xl font-extrabold` | year above a job card |
| Caption / label | `text-md font-bold` or `text-lg font-semibold` | "Level:" |

**Pattern:** display text is sans-bold, body/captions trend toward `font-mono`, the hero tagline is the only `font-serif` use. Italic + extralight + mono is the established "subtitle voice."

## Spacing & layout

### Section pattern

Every page section follows the same skeleton:

```tsx
<div className="flex flex-col p-10 bg-gradient-to-b from-brand-surface[-alt] to-brand-surface[-alt] min-h-screen">
  <SectionHeader sectionDetails={...} />
  {/* section content, usually a flex/grid */}
</div>
```

Conventions:

- `min-h-screen` per section so each fills the viewport
- `p-10` outer padding (Skills uses `pt-16 p-10`)
- Background gradient alternates direction section-to-section so adjacent sections feel layered:
  - Project: `from-brand-surface-alt to-brand-surface`
  - Skills: `from-brand-surface to-brand-surface-alt`
  - Experience: `from-brand-surface-alt to-brand-surface`
- `mb-16` below the section header

### Spacing rhythm

Tailwind's default scale is used freely, but the most common values are:

- **Stack gaps:** `gap-2`, `gap-4`, `gap-8` (`gap-4` is the default rhythm; `gap-8` for major separations)
- **Padding:** `p-2`, `p-4`, `p-10`
- **Responsive grid margins:** timeline uses `sm:mr-[12%] sm:ml-[12%]` for inset

### Radius

`rounded-2xl` is the universal corner radius for cards, images, hero photo frame. The shadcn token `--radius: 0.625rem` exists but is only consumed by the shadcn `card`/`chart` components.

### Borders

- `border-10 border-white` — thick white frame around the hero photo
- `border-2 rounded-2xl` — project image frame
- `border-b-4 border-brand-divider` — section header rule
- `border-b-2` — divider above timeline year markers

## Responsive breakpoints

Mobile-first. The codebase relies almost exclusively on:

- `sm:` (≥640px) — the main "now we're on a real screen" jump (most type sizes, layout direction)
- `xl:` (≥1280px) — used for skill grid columns
- `2xl:` (≥1536px) — used to bump skill grid to 4 columns

`md:` and `lg:` are largely unused. Layouts go from a single mobile column straight to a desktop grid at `sm:`.

## Components & patterns

### Section header

[src/app/sectionHeader.tsx](src/app/sectionHeader.tsx) — title centered between two horizontal rules, with an italic mono subtitle below. Used by every section except hero.

### Card surfaces (two flavors)

| Card | Surface | Where |
|---|---|---|
| Skill grid container | `bg-brand-tint rounded-2xl p-2 sm:p-8` | [skillDomain.tsx:20](src/app/skillDomain.tsx#L20) |
| Project card | `bg-brand-tint rounded-2xl min-h-[500px]` (width `w-80 sm:w-100`) | [projectCarousel.tsx:14](src/app/projectCarousel.tsx#L14) |
| Job card | `bg-brand-tint rounded-2xl p-2 m-2` | [jobHolder.tsx:32](src/app/jobHolder.tsx#L32) |
| Skill item (nested inside grid container) | `bg-brand-surface rounded-2xl p-4` | [skillbox.tsx:24](src/app/skillbox.tsx#L24) |

### Badges

- **Skill badges** — daisyUI `badge badge-soft badge-info p-2`
- **Project tech badges** — daisyUI `badge badge-neutral p-2`
- **Job tag pills** — daisyUI buttons styled as pills: `btn btn-primary btn-xs btn-soft` / `btn btn-success btn-xs btn-soft` with `btn-disabled` for "not applicable"

### Progress bar (skill level)

daisyUI `<progress>` with conditional class ([skillbox.tsx:13-18](src/app/skillbox.tsx#L13-L18)):

- ≥ 70 → `progress-success`
- ≥ 40 → `progress-warning`
- otherwise → `progress-error`

### Timeline marker

Year sits centered above a horizontal rule, with a small `Octagon` icon (lucide, `size={10}`, `color="var(--brand-accent)"`) overlapping the rule as a node ([jobHolder.tsx:22-28](src/app/jobHolder.tsx#L22-L28)).

### Links

`link link-hover underline` (daisyUI) — used in footer + project "Visit Website" CTA.

### Footer

daisyUI `footer sm:footer-horizontal bg-neutral text-neutral-content` ([footer.tsx:5](src/app/footer.tsx#L5)).

### Navbar

daisyUI `navbar bg-base-100 shadow-sm` with logo image + name as `btn btn-ghost text-3xl` ([navbar.tsx:50-61](src/app/navbar.tsx#L50-L61)).

## Iconography

- [lucide-react](https://lucide.dev) is the icon library (per [components.json](components.json)). Only `Octagon` is in active use.
- Footer logo + social icons are inline SVGs.

## Imagery

- All raster assets live in [public/](public/) (project screenshots, profile photos, company logos).
- Profile and project images use `next/image` with `rounded-2xl`, sometimes wrapped in a thick white border for the hero.
- Aspect ratios are not constrained — width/height are passed per component.

## Known inconsistencies (worth fixing eventually)

These aren't bugs, just places the system is talking out of both sides of its mouth:

1. **Section components live in [src/app/](src/app/)** alongside routes rather than [src/components/](src/components/). Only shadcn primitives live under `components/ui/`.
2. **Lots of commented-out code** in [navbar.tsx](src/app/navbar.tsx), [layout.tsx](src/app/layout.tsx), [hero.tsx](src/app/hero.tsx), [time.tsx](src/app/time.tsx) — alternate designs left in place. Worth pruning.
3. **Responsive scale skips the middle.** Only `sm:`, `xl:`, `2xl:` are in use — tablets and small laptops render the mobile layout. Adding `md:` / `lg:` breakpoints would smooth the jumps.
4. **No component abstraction for card surfaces.** The `bg-brand-tint rounded-2xl` pattern repeats across four places; a `<Card variant="tinted">` primitive would reduce drift.

## Quick reference for new components

If you're adding a new section:

1. Wrap in `flex flex-col p-10 bg-gradient-to-b from-brand-surface[-alt] to-brand-surface[-alt] min-h-screen` and alternate the gradient direction vs. the neighboring section.
2. Lead with `<SectionHeader sectionDetails={{ title, subtitle }} />`.
3. Use `rounded-2xl` for any card-like surface, `gap-4` as your default stack rhythm.
4. For accent color (titles, markers, emphasis) use `text-brand-accent`; for tinted card backgrounds use `bg-brand-tint`; for nested item cards use `bg-brand-surface`.
5. Use `font-mono` for descriptive/caption text, `font-bold` for titles, `font-extralight italic font-mono` for subtitles.
6. Reach for daisyUI when you need a `badge`, `btn`, `progress`, or `link` — don't hand-roll them.
7. **Never hardcode hex literals in JSX.** If you need a color that isn't in the brand palette, add a new `--brand-*` token in [globals.css](src/app/globals.css) and expose it via `@theme inline`.
