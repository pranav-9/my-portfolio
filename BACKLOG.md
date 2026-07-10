# Backlog

Open items from working sessions, grouped by theme. Check off / delete as done.
Claude: read this at the start of site-work sessions; add new deferred items here.

## Distribution & SEO (from 2026-07-08 session)

- [ ] **Google Search Console** — verify pranavyadav.dev (DNS or meta tag), submit
      `/sitemap.xml`. This is the feedback loop for which queries bring visitors.
      *(Pranav — requires Google account)*
- [ ] **Bing Webmaster Tools** — same drill; Bing feeds ChatGPT browsing.
      *(Pranav)*
- [ ] **LinkedIn Post Inspector** — run https://pranavyadav.dev through
      https://www.linkedin.com/post-inspector/ once to bust the old preview cache
      and pick up the new OG card. *(Pranav, 2 min)*
- [ ] **Concall Alpha case study → LinkedIn post** — rewrite the case study
      (schema-first contracts, LLM-proposes-code-verifies, deterministic scoring)
      as a first content experiment. Claude can draft.
- [ ] **Gallery submissions** — godly.website, land-book, Next.js showcase, and
      similar. Backlinks + design-audience traffic. One evening. *(Pranav submits;
      Claude can prep blurbs/screenshots)*
- [ ] **Story of a Stock public launch** — ship it publicly, share to Indian
      investing communities (X fintwit, ValuePickr, r/IndiaInvestments). Product
      users become referral paths to services.
- [ ] **Content cadence** — one case study or "how I decided X" piece per month
      on LinkedIn. Niche angles that rank: LLM pipelines for financial
      disclosures; Webflow ⇄ Next.js hybrids.

## Brand ("Slow Down, Aesthetic")

- [ ] **Answer ABOUT.md open questions** — especially "the one sentence a visitor
      should remember." Everything below depends on this. *(Pranav)*
- [ ] **Brand-driven hero copy pass** — tagline currently sells velocity ("I ship
      products end-to-end"); rework to carry deliberate-craft positioning while
      keeping the concrete bits (LLM pipelines, pixel-tight frontends).
- [ ] **Give "Slow Down, Aesthetic" a visible home** — kicker, hero signature, or
      short manifesto line. Decide placement after copy pass.
- [ ] **Story / About section** — turn the timeline's breadth (Citi → Xendit →
      CTO → Toptal) into a narrative arc; weave in personal threads from
      ABOUT.md once answered. Biggest gap for the "founders/collaborators"
      audience.
- [ ] **Decide: ABOUT.md in a public repo?** — fine today (brand notes only), but
      revisit before personal-life answers go in. Option: move out of repo.

## Design system & code hygiene

- [ ] **DESIGN_SYSTEM.md refresh** — hero description, type-scale table, and file
      paths are stale (describe the old serif-tagline hero; reference deleted
      skillDomain.tsx/skillbox.tsx). Tokens/patterns sections are still accurate.
- [ ] **Remove dead `--brand-warm-from/to` tokens** — only used by the old hero
      pill design that no longer exists.
- [ ] **Prune commented-out code** — navbar.tsx, layout.tsx, hero.tsx, time.tsx
      carry alternate designs in comments (DESIGN_SYSTEM.md known-inconsistency #2).
- [ ] **`md:`/`lg:` pass on remaining sections** — hero tablet layout fixed
      2026-07-08; other sections still jump mobile → `sm:` desktop grid
      (known-inconsistency #3).
- [ ] **Card surface abstraction** — `border-brand-divider bg-white rounded-2xl
      hover:shadow-accent-soft` card recipe now repeats across ~8 places; extract
      a shared component when next touching several of them.

## Projects grid — remaining additions (started 2026-07-08)

- [ ] **Freight Expert card** — insurance-renewal microsites for trucking
      carriers (Next.js, Supabase, OpenAI, Instantly.ai). Blocked on: a public
      URL to link (card links to client/marketing sites per Pranav's call) and
      a screenshot for the card image. *(Pranav provides both)*
- [ ] **ASAPP portal card** — care-provider ops portal (Next.js, Firebase,
      Airtable). Same blockers: public client URL + screenshot. Also confirm
      the anonymized title ("Care-Provider Ops Portal"?).
- [ ] **Confirm impact lines** on the two shipped cards — "~500 curated
      sailings" and "3,500+ vetted programs" were read off the live sites;
      correct if there are better numbers.

## Small / opportunistic

- [ ] Remove stale git remote `origin-1` (points to old pranav-9/portfolio-website).
- [ ] Update `Now` section `lastUpdated` (2026-05-14) when its content next changes.
