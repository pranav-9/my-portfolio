# Pranav Yadav — Personal Site

Personal portfolio site for Pranav Yadav, a full stack developer with a product mindset. Built with Next.js 15 and the App Router.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) with Turbopack for both dev and build
- React 19
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) + [daisyUI](https://daisyui.com) for UI primitives
- [shadcn/ui](https://ui.shadcn.com) style components in [src/components/ui](src/components/ui) (configured via [components.json](components.json))
- [lucide-react](https://lucide.dev) for icons
- [recharts](https://recharts.org) for charts

## Project structure

```
src/
  app/            # App Router routes + page-level section components
    page.tsx      # Home page — composes Hero, Project, Skills, TimeLine, Footer
    layout.tsx    # Root layout (Geist + Geist Mono fonts, global metadata)
    hero.tsx      # Landing hero
    project.tsx   # Projects section (data defined inline)
    skills.tsx    # Skills section (data defined inline)
    time.tsx      # Career timeline
    footer.tsx
    navbar.tsx
    ...
  components/ui/  # Reusable shadcn-style components (card, chart)
  lib/utils.ts    # cn() helper
public/           # Images for projects, profile, logos
```

Page sections live alongside routes in [src/app/](src/app/) rather than in a separate components folder. Project and skills content is hard-coded inside [project.tsx](src/app/project.tsx) and [skills.tsx](src/app/skills.tsx) — edit those files to update content.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — Next.js dev server (Turbopack)
- `npm run build` — production build (Turbopack)
- `npm run start` — serve the production build
- `npm run lint` — ESLint

## Deployment

Deployed on [Vercel](https://vercel.com).
