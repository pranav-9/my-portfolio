import React from "react";
import type { Metadata } from "next";
import SectionHeader from "../sectionHeader";
import Reveal from "../reveal";
import FeatureCarousel, { type FeatureGroup } from "./featureCarousel";

export const metadata: Metadata = {
  title: "Foundra × Pranav Yadav — Fit signal",
  robots: { index: false, follow: false },
};

type IndexCard = {
  href: string;
  marker: string;
  title: string;
  tag: string;
};

const indexCards: IndexCard[] = [
  {
    href: "#what",
    marker: "01",
    title: "What is this?",
    tag: "the product · what's being built",
  },
  {
    href: "#users",
    marker: "02",
    title: "User interaction",
    tag: "three user types · backbone",
  },
  {
    href: "#architecture",
    marker: "03",
    title: "System architecture",
    tag: "users · surfaces · data · integrations",
  },
  {
    href: "#features",
    marker: "04",
    title: "Engineering feature map",
    tag: "v1, organized by component",
  },
  {
    href: "#search",
    marker: "05",
    title: "Search architecture",
    tag: "ONVC → Foundra",
  },
  {
    href: "#sync",
    marker: "06",
    title: "Sync architecture",
    tag: "bidirectional, with sync-token",
  },
];

type ProductStage = {
  stage: string;
  status: "live" | "build" | "next";
  statusLabel: string;
  headline: string;
  caption: string;
};

const productStages: ProductStage[] = [
  {
    stage: "01",
    status: "live",
    statusLabel: "Live",
    headline: "Pipeline ready",
    caption:
      "Data pipeline already built and producing clean, structured records ready for publication.",
  },
  {
    stage: "02",
    status: "build",
    statusLabel: "Build",
    headline: "~8 wks · v1",
    caption:
      "Consumer-facing site and the operator-side tooling that monetizes it.",
  },
  {
    stage: "03",
    status: "next",
    statusLabel: "Next",
    headline: "1 → 100+ markets",
    caption:
      "Architected from day one for expansion into additional regions, verticals, and domains.",
  },
];

const stageStatusClass: Record<ProductStage["status"], string> = {
  live: "badge badge-soft badge-success",
  build: "badge badge-soft badge-info",
  next: "badge badge-soft badge-neutral",
};

const productPills: string[] = [
  "Consumer-facing",
  "Curated directory",
  "Kids activities",
  "Two-sided",
  "Subscription monetization",
];

type UserType = {
  who: string;
  context: string;
  primary: {
    label: string;
    detail: string;
  };
  touchpoints: string[];
  chipClass: string;
};

const userTypes: UserType[] = [
  {
    who: "Parents",
    context: "Mobile · no account",
    primary: {
      label: "Consumer site",
      detail: "Browse · search · map · click out",
    },
    touchpoints: [
      "No sign-up, no inquiry forms, no booking",
      "Click out to provider site / phone is the lead",
      "Favorites via localStorage",
    ],
    chipClass: "badge badge-soft badge-info",
  },
  {
    who: "Business owners",
    context: "Desktop · paid",
    primary: {
      label: "Provider portal",
      detail: "Claim · onboarding · dashboard · stats",
    },
    touchpoints: [
      "Stripe — hosted Checkout + customer portal",
      "Email — magic links + dunning",
      "30-day stats dashboard is the value prop",
    ],
    chipClass: "badge badge-soft badge-success",
  },
  {
    who: "Admin team",
    context: "Haley + curators",
    primary: {
      label: "Airtable (90%)",
      detail: "Listings CRUD · founding-tier counter · editorial",
    },
    touchpoints: [
      "Ops panel (10%) — claim approval, DSAR, audit log",
      "Airtable Interfaces for prettier dashboards",
      "White-glove 'act as operator' impersonation",
    ],
    chipClass: "badge badge-soft badge-warning",
  },
];

type BackboneNode = {
  label: string;
  sub: string;
};

const backbone: BackboneNode[] = [
  { label: "Airtable", sub: "Source of truth" },
  { label: "Postgres / Supabase", sub: "Operational mirror" },
  { label: "Algolia", sub: "Search index" },
];

const interactionPunchline =
  "Airtable edits auto-propagate to the consumer site + provider portal via the sync layer — no deployment cycle for editorial changes.";

const featureGroups: FeatureGroup[] = [
  {
    kicker: "Surface",
    title: "Consumer site",
    sub: "Next.js · mobile-first",
    flagged: true,
    buckets: [
      {
        label: "Routing & rendering",
        items: [
          "Region-scoped routing: /[region]/[category]/[listing-slug], region resolved server-side",
          "ISR with on-demand revalidation triggered by Airtable webhooks",
        ],
      },
      {
        label: "Search & map",
        items: [
          "Instant search + faceted filters powered by Algolia",
          "URL-synced filter state, deep-linkable and sharable",
          "Filter relaxation on zero results — fallback queries, optionalFilters",
          "Sort variants via Algolia replicas (relevance, newest, distance, alphabetical)",
          "Mapbox map view with clustered pins; full filter parity between list and map",
        ],
      },
      {
        label: "Async UX",
        items: [
          "Skeleton / empty / error states on every async surface",
        ],
      },
      {
        label: "SEO & metadata",
        items: [
          "schema.org JSON-LD per page (LocalBusiness + subtypes) from versioned mapping doc",
          "Dynamic OG images via @vercel/og",
          "Favicons · PWA manifest · installable · bottom tab nav",
          "Region-aware sitemap, auto-regenerated on Airtable change",
        ],
      },
      {
        label: "Engagement & analytics",
        items: [
          "Click-tracking (Visit website + Call) feeds operator stats dashboard",
          "Favorites via localStorage (no account required)",
          "Analytics (PostHog or Plausible) · Sentry for errors",
        ],
      },
      {
        label: "Performance & compliance",
        items: [
          "Lighthouse 90+ mobile · Core Web Vitals 'Good' · sub-2s on 4G",
          "Cookie consent, 'Do Not Sell My Info', accessibility statement",
          "WCAG 2.1 AA — automated Axe/Lighthouse + manual audit",
        ],
      },
    ],
  },
  {
    kicker: "Surface",
    title: "Provider portal",
    sub: "Next.js · desktop-first",
    buckets: [
      {
        label: "Auth & access",
        items: [
          "Magic-link auth: passwordless, session-based, account recovery",
        ],
      },
      {
        label: "Claim & checkout",
        items: [
          "3-field pre-payment claim form (lowest friction before money changes hands)",
          "Stripe Checkout (hosted): two tiers + annual, founding-tier badge with live counter",
          "Stripe Tax handles multi-state automatically",
          "Timestamped Operator Agreement + Consumer ToS acceptance at checkout",
        ],
      },
      {
        label: "Onboarding",
        items: [
          "Multi-step onboarding wizard with progress indicator",
          "Save-and-resume across sessions, state persisted to Postgres",
          "Operator-owned-fields-only enforcement — UI hides pipeline-owned fields",
        ],
      },
      {
        label: "Content management",
        items: [
          "Photo gallery (up to 8, drag-to-reorder), R2 direct upload via signed URLs",
          "Type/size/dimension validation · virus scan before commit",
          "Structured CRUD for programs/offerings",
          "Preview-before-publish for every edit",
        ],
      },
      {
        label: "Insights & billing",
        items: [
          "30-day operator stats: page views, search appearances, click-throughs, calls",
          "Embedded Stripe customer portal for billing self-service",
        ],
      },
      {
        label: "Safety",
        items: ["Idempotent form submissions"],
      },
    ],
  },
  {
    kicker: "Surface",
    title: "Ops panel",
    sub: "Custom admin UI · thin operational layer",
    buckets: [
      {
        label: "Claims & subscriptions",
        items: [
          "Claim approval queue with anti-fraud signals",
          "Subscription drill-down with Stripe actions (refund, cancel, plan change)",
          "Live revenue dashboard (MRR, churn, founding-tier spots remaining)",
        ],
      },
      {
        label: "Compliance & data rights",
        items: [
          "Audit log viewer — filterable by actor/action/date/target, diff per change",
          "DSAR handler — export across Postgres + Airtable + Stripe + R2 + logs",
          "Right-to-erasure execution — hard-delete cascade across all systems",
          "Per-account data export (CSV / JSON)",
        ],
      },
      {
        label: "Operator support",
        items: [
          "White-glove 'act as operator' impersonation — audit-logged",
          "Hidden URL honeypot management (anti-scraper)",
        ],
      },
    ],
  },
  {
    kicker: "Data",
    title: "Airtable",
    sub: "Source of truth + primary admin workspace",
    buckets: [
      {
        label: "Editorial workspace",
        items: [
          "Editorial CRUD on all listings — Haley's team lives here for ~90% of admin",
          "Airtable Interfaces for prettier dashboards without custom code",
          "Bulk operations native to Airtable",
        ],
      },
      {
        label: "Schema discipline",
        items: [
          "Pipeline-owned vs. operator-owned field separation",
          "Provenance columns: created_at, updated_at, change_log, source_of_change",
        ],
      },
      {
        label: "Sync trigger",
        items: ["Webhook publishing on record change drives the sync layer"],
      },
    ],
  },
  {
    kicker: "Data",
    title: "Postgres / Supabase",
    sub: "Operational mirror + app data",
    buckets: [
      {
        label: "Schema",
        items: [
          "Mirror of Airtable, denormalized where it helps query performance",
          "Region-scoped query indexes",
        ],
      },
      {
        label: "App-only tables",
        items: [
          "Claims, Stripe customers, sessions, audit log, click events, image metadata, sync state, DLQ, onboarding state",
        ],
      },
      {
        label: "Discipline & boundary",
        items: [
          "Provenance columns enforced at the write layer",
          "Service-role access only — boundary is server-side route handlers",
        ],
      },
      {
        label: "Resilience",
        items: [
          "Supabase backup + point-in-time recovery",
          "90-day retention for transient tables",
        ],
      },
    ],
  },
  {
    kicker: "Data",
    title: "Algolia",
    sub: "Search index · single index, region-scoped",
    buckets: [
      {
        label: "Index design",
        items: [
          "Single listings_prod index, region_slug as filterOnly facet (multi-tenancy via filter)",
        ],
      },
      {
        label: "Ranking",
        items: [
          "tier as customRanking — Founding > Premium > Tier 1 > unclaimed",
          "searchableAttributes ordered by weight (name > tags > description)",
        ],
      },
      {
        label: "Faceting & sorting",
        items: [
          "attributesForFaceting: category, age range, indoor/outdoor, price tier, neighborhood",
          "Replicas for sort variants (newest, alphabetical, distance)",
        ],
      },
      {
        label: "Query intelligence",
        items: [
          "optionalFilters for soft constraints — powers filter relaxation",
          "Typo tolerance + synonyms management",
        ],
      },
      {
        label: "Failure isolation",
        items: [
          "Downstream-only: Postgres → Algolia, never written from Airtable",
        ],
      },
    ],
  },
  {
    kicker: "Cross-cutting",
    title: "Sync layer",
    sub: "Built throughout v1, not a discrete phase",
    flagged: true,
    buckets: [
      {
        label: "Bidirectional flow",
        items: [
          "Airtable → Postgres: webhook → signature verification → idempotent upsert",
          "Postgres → Airtable: API call with sync-token in metadata for echo-loop prevention",
        ],
      },
      {
        label: "Idempotency",
        items: [
          "Idempotency keys per change (record_id + revision + field_hash)",
        ],
      },
      {
        label: "Reliability",
        items: [
          "Exponential-backoff retry on transient failures",
          "Dead-letter queue for permanent failures + admin review surface",
          "Nightly full-scan reconciliation as backstop",
        ],
      },
      {
        label: "Conflict prevention",
        items: [
          "Field-level ownership enforced at write layer (no co-owned races)",
          "Last-write-wins with provenance, only for true co-owned fields (~zero)",
        ],
      },
      {
        label: "Future-proofing",
        items: [
          "Direction-agnostic — Postgres-as-SoT flip in 12–24mo is a config change",
        ],
      },
    ],
  },
  {
    kicker: "Cross-cutting",
    title: "Image pipeline",
    sub: "Cloudflare R2",
    buckets: [
      {
        label: "Upload path",
        items: [
          "Signed upload URLs — browser uploads directly to R2, no server passthrough",
        ],
      },
      {
        label: "Validation",
        items: [
          "Type / size / dimension validation (client + server)",
          "Virus scanning before final commit",
        ],
      },
      {
        label: "Delivery",
        items: ["CDN-fronted delivery via Cloudflare"],
      },
      {
        label: "Governance",
        items: [
          "Metadata in Postgres (filename, size, dimensions, scan status, ownership)",
          "Per-operator quota enforcement",
        ],
      },
    ],
  },
  {
    kicker: "Cross-cutting",
    title: "Stripe integration",
    sub: "Billing + tax + dunning",
    buckets: [
      {
        label: "Checkout & tax",
        items: [
          "Hosted Checkout (no PCI exposure)",
          "Stripe Tax for multi-state sales tax automation",
        ],
      },
      {
        label: "Subscription lifecycle",
        items: [
          "Customer portal embedded in operator dashboard",
          "Webhook handlers with signature verification (subscription + invoice events)",
        ],
      },
      {
        label: "Recovery",
        items: [
          "Dunning sequence on failed payments (days 1 / 3 / 7)",
          "Abandoned-claim event firing to CRM for recovery",
        ],
      },
      {
        label: "Ops actions",
        items: ["Refund / plan-change actions surfaced in Ops panel"],
      },
      {
        label: "Founding tier",
        items: [
          "Spots-locked-during-checkout — prevents double-allocation",
        ],
      },
    ],
  },
  {
    kicker: "Cross-cutting",
    title: "Email · transactional",
    sub: "Magic links · dunning · receipts · notifications",
    buckets: [
      {
        label: "Flows",
        items: [
          "Magic-link delivery (claim verification, returning sessions, recovery)",
          "Dunning sequence (days 1 / 3 / 7 for failed Stripe payments)",
          "Receipt emails (Stripe-delivered)",
          "Operator notifications (claim approved, listing live, monthly digest)",
        ],
      },
      {
        label: "Deliverability",
        items: ["SPF / DKIM / DMARC configured before first send"],
      },
    ],
  },
  {
    kicker: "Cross-cutting",
    title: "Security · compliance · performance",
    sub: "Cloudflare Pro + GDPR/CCPA + WCAG",
    buckets: [
      {
        label: "Edge defenses",
        items: [
          "Cloudflare Pro: WAF, bot management, rate limiting, CDN",
          "CSP + full security header set",
        ],
      },
      {
        label: "Application safety",
        items: [
          "Anti-fraud rate limiting on claim attempts + manual review queue",
          "Hidden URL honeypots (anti-scraper)",
          "Per-route rate limiting at the application layer",
          "Idempotent API operations across the board",
        ],
      },
      {
        label: "Secrets & retention",
        items: [
          "Vercel env vars with rotation strategy",
          "90-day server log retention",
        ],
      },
      {
        label: "Compliance",
        items: [
          "GDPR / CCPA — cookie consent, DSAR handler, right-to-erasure, portability",
          "WCAG 2.1 AA — automated + manual audit",
        ],
      },
    ],
  },
  {
    kicker: "Launch",
    title: "Testing & launch readiness",
    sub: "Pre-launch hardening",
    buckets: [
      {
        label: "Functional",
        items: [
          "End-to-end tests of critical flows (claim, search, dashboard, sync)",
          "Load test at 1,000 concurrent users target",
        ],
      },
      {
        label: "Security",
        items: [
          "Automated security scan (Snyk / ZAP) with documented remediation",
          "OWASP Top 10 versioned checklist in repo",
          "Independent security reviewer in final 1–2 weeks",
        ],
      },
      {
        label: "SEO & content",
        items: [
          "Google Rich Results validation",
          "SEO checklist",
        ],
      },
      {
        label: "Resilience",
        items: [
          "Backup restoration test",
          "Disaster recovery runbook reviewed",
        ],
      },
    ],
  },
  {
    kicker: "Launch",
    title: "Documentation deliverables",
    sub: "What Day-1 next dev gets",
    buckets: [
      {
        label: "Onboarding",
        items: [
          "README — Day-1 onboarding for next dev",
          "Future-developer onboarding guide",
        ],
      },
      {
        label: "Architecture & data",
        items: [
          "ADRs (architecture decision records, versioned)",
          "Data dictionary",
          "Field ownership matrix (pipeline vs. operator)",
          "Source-of-truth → schema.org mapping document",
        ],
      },
      {
        label: "API & integration",
        items: [
          "OpenAPI for internal APIs",
          "Webhook documentation",
        ],
      },
      {
        label: "Operations",
        items: [
          "Runbooks for common incidents",
          "Deployment guide",
          "Monitoring / alerting documentation",
        ],
      },
    ],
  },
];

type SearchDecision = {
  title: string;
  body: string;
};

const onvcDecisions: SearchDecision[] = [
  {
    title: "Single SSR fetch + client-side filtering",
    body: "Full transformed dataset hydrated once, all filtering/sorting/pagination on the client against a Zustand store. No per-interaction network latency.",
  },
  {
    title: "KV cache with shape-compatible envelope",
    body: "5-minute TTL, write-through on cold miss. Shape-detected cache envelope let me migrate the on-disk format without flushing — old array-shaped entries kept deserializing alongside new {timestamp, data} entries until everything rotated through.",
  },
  {
    title: "Edge-side fan-out",
    body: "Cold requests fan out to 5 Webflow lookup collections in parallel via Promise.all, joined into a denormalized Listing[] blob at the edge.",
  },
  {
    title: "URL-synced filter state, bidirectional",
    body: "Server reads ?destination= / ?cruiseline= / ?startdate= on SSR; client writes back on every filter change. Marketing campaign links land users directly in any filtered view.",
  },
  {
    title: "Param coercion + legacy aliases",
    body: "Month-token coercion (startdate → departureMonth) and both camelCase + lowercase aliases for filter params. Backward compatibility for legacy marketing URLs.",
  },
];

type FoundraMap = {
  from: string;
  to: string;
};

const foundraMappings: FoundraMap[] = [
  {
    from: "Single Webflow dataset, hydrated client-side",
    to: "Single Algolia listings_prod index, region_slug as filterOnly — multi-tenancy via filter, scales cleanly to 100+ markets",
  },
  {
    from: "Manual sort by departure date",
    to: "tier as customRanking signal — Founding > Premium > Tier 1 > unclaimed. Monetization signal lives inside ranking, not as post-process",
  },
  {
    from: "6 facet dimensions, client-side filtering",
    to: "attributesForFaceting: category (searchable), age range, indoor/outdoor, price tier, neighborhood",
  },
  {
    from: "Manual sort orders",
    to: "Algolia replicas: listings_newest, listings_distance (geo), listings_alphabetical",
  },
  {
    from: "Hard fail on zero results",
    to: "Filter relaxation: drop in priority order (price → neighborhood → age → category). optionalFilters for soft constraints. Helpful copy: 'No exact matches for soccer for 13–17 in $-$ — here are 14 nearby.'",
  },
  {
    from: "Direct CMS reads",
    to: "Sync direction: Postgres → Algolia only, on every change. Algolia never written from Airtable directly — failure isolation",
  },
];

type SyncDirection = {
  label: string;
  steps: string[];
};

const syncDirections: SyncDirection[] = [
  {
    label: "Direction 1 · Airtable → Postgres",
    steps: [
      "Airtable webhook fires on record change",
      "Handler verifies HMAC signature",
      "Idempotent upsert keyed by Airtable record ID",
      "Idempotency key = record_id + revision + field_hash — deduplicates retries cleanly",
      "On success → enqueue Algolia sync job",
    ],
  },
  {
    label: "Direction 2 · Postgres → Airtable",
    steps: [
      "Operator saves in dashboard → Postgres write",
      "Worker fires Airtable API PATCH with a UUID sync-token in a metadata field on the record",
      "Inbound handler recognizes its own echo via that token and short-circuits — zero re-write loop, no state machine needed",
    ],
  },
];

const reliabilityPrimitives: string[] = [
  "Exponential-backoff retry — 3 attempts at 1s / 5s / 30s",
  "Dead-letter queue: Postgres table + admin review surface in the Ops panel",
  "Nightly full-scan reconciliation as the backstop — scan Airtable, diff against Postgres, flag and replay deltas",
];

type FieldOwnership = {
  surface: string;
  fields: string[];
  writers: string;
};

const ownership: FieldOwnership[] = [
  {
    surface: "Pipeline-owned",
    fields: [
      "address",
      "lat / lng",
      "categories",
      "region",
      "claim status",
      "moderation flags",
    ],
    writers: "Only the Airtable sync path writes these",
  },
  {
    surface: "Operator-owned",
    fields: ["description", "photos", "hours", "programs", "tags"],
    writers: "Only the dashboard write path writes these",
  },
];

type ArchNode = { label: string; accent?: boolean };
type ArchConnector = "left" | "both";
type ArchLayer = {
  label: string;
  nodes: ArchNode[];
  connectors?: ArchConnector[];
};

const archLayers: ArchLayer[] = [
  {
    label: "Users",
    nodes: [
      { label: "Parents" },
      { label: "Operators" },
      { label: "Admin" },
    ],
  },
  {
    label: "Surfaces",
    nodes: [
      { label: "Consumer site" },
      { label: "Provider portal" },
      { label: "Ops panel / Airtable" },
    ],
  },
  {
    label: "Data",
    nodes: [
      { label: "Algolia" },
      { label: "Postgres" },
      { label: "Airtable (SoT today)", accent: true },
    ],
    connectors: ["left", "both"],
  },
  {
    label: "Integrations",
    nodes: [
      { label: "Stripe" },
      { label: "R2 / CDN" },
      { label: "Email" },
      { label: "Cloudflare Pro" },
      { label: "Mapbox" },
      { label: "Analytics + Sentry" },
    ],
  },
];

const FoundraFitPage = () => {
  return (
    <main className="min-h-screen bg-brand-surface text-brand-ink">
      {/* Hero — index */}
      <section className="hero-backdrop relative overflow-hidden px-6 pt-24 pb-20 sm:pt-32 sm:pb-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-12">
          <div className="flex flex-col items-center gap-5 text-center">
            <Reveal>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                Foundra × Pranav Yadav
              </h1>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-muted">
                Interview walkthrough · my read of the spec
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {indexCards.map((card, idx) => (
              <Reveal key={card.href} delay={120 + idx * 80}>
                <a
                  href={card.href}
                  className="group flex h-full flex-col gap-6 rounded-2xl border border-brand-divider bg-brand-surface p-6 transition hover:-translate-y-0.5 hover:border-brand-accent hover:shadow-accent-soft sm:p-8"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-3xl font-semibold text-brand-accent sm:text-4xl">
                      {card.marker}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-brand-muted transition group-hover:text-brand-accent">
                      Jump →
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-brand-ink sm:text-2xl">
                    {card.title}
                  </h3>
                  <div className="mt-auto pt-2">
                    <span className="badge badge-soft badge-neutral p-2 font-mono text-xs">
                      {card.tag}
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 1 — What is this? */}
      <section
        id="what"
        className="scroll-mt-8 bg-gradient-to-b from-brand-surface to-brand-surface-alt px-6 py-12 sm:py-16"
      >
        <SectionHeader
          compact
          sectionDetails={{
            kicker: "Section 1",
            title: "What is this?",
            subtitle:
              "Curated local kids activity directory launching in Palm Beach County, built to scale to 100+ markets without rebuilding.",
          }}
        />

        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {productStages.map((s, idx) => {
              const isBuild = s.status === "build";
              return (
                <Reveal key={s.stage} delay={idx * 80}>
                  <div
                    className={`flex h-full flex-col gap-3 rounded-2xl border p-5 sm:p-6 ${
                      isBuild
                        ? "border-brand-accent bg-brand-accent-soft"
                        : "border-brand-divider bg-brand-surface"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                        Stage {s.stage}
                      </span>
                      <span
                        className={`${stageStatusClass[s.status]} px-2 py-0.5 font-mono text-[10px]`}
                      >
                        {s.statusLabel}
                      </span>
                    </div>
                    <p
                      className={`font-mono text-xl font-semibold tracking-tight sm:text-2xl ${
                        isBuild ? "text-brand-accent" : "text-brand-ink"
                      }`}
                    >
                      {s.headline}
                    </p>
                    <p className="text-[13px] leading-snug text-brand-muted sm:text-sm">
                      {s.caption}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={240}>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-muted">
                Product shape
              </p>
              {productPills.map((p) => (
                <span
                  key={p}
                  className="badge badge-soft badge-neutral px-3 py-2 font-mono text-[11px]"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2 — User interaction */}
      <section
        id="users"
        className="scroll-mt-8 bg-gradient-to-b from-brand-surface-alt to-brand-surface px-6 py-12 sm:py-16"
      >
        <SectionHeader
          compact
          sectionDetails={{
            kicker: "Section 2",
            title: "How users interact with the platforms",
            subtitle:
              "Three user types, each with a primary surface plus supporting touchpoints. Airtable, Postgres, and Algolia back all three — never directly touched by any user.",
          }}
        />

        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          {/* User type columns */}
          <div className="grid gap-3 lg:grid-cols-3">
            {userTypes.map((u, idx) => {
              return (
                <Reveal key={u.who} delay={idx * 80}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-brand-divider bg-brand-surface p-5 sm:p-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-baseline gap-2">
                        <h4 className="text-lg font-semibold text-brand-ink sm:text-xl">
                          {u.who}
                        </h4>
                        <span className={`${u.chipClass} px-2 py-0.5 font-mono text-[10px]`}>
                          {u.context}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-brand-divider bg-brand-tint p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-muted">
                        Primary surface
                      </p>
                      <p className="mt-1 text-[14px] font-semibold text-brand-accent">
                        {u.primary.label}
                      </p>
                      <p className="text-[12px] leading-snug text-brand-muted">
                        {u.primary.detail}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-muted">
                        Supporting touchpoints
                      </p>
                      <ul className="mt-1 flex flex-col gap-1.5">
                        {u.touchpoints.map((t) => (
                          <li
                            key={t}
                            className="flex gap-2 text-[13px] leading-snug text-brand-ink"
                          >
                            <span
                              className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-accent/60"
                              aria-hidden
                            />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Data backbone */}
          <Reveal>
            <div className="flex flex-col gap-3 rounded-2xl border border-brand-divider bg-brand-tint p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent">
                  Data backbone
                </p>
                <p className="font-mono text-[10px] italic text-brand-muted">
                  Never directly touched by any user
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {backbone.map((b, idx) => (
                  <div
                    key={b.label}
                    className="flex flex-col gap-0.5 rounded-lg border border-brand-divider bg-brand-surface px-4 py-3"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-muted">
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                    <p className="text-[14px] font-semibold text-brand-ink">
                      {b.label}
                    </p>
                    <p className="text-[12px] leading-snug text-brand-muted">
                      {b.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-r-lg border-l-4 border-brand-accent bg-brand-accent-soft px-4 py-3 sm:px-5">
              <p className="text-[13px] leading-snug text-brand-ink sm:text-sm">
                <span className="font-semibold text-brand-accent">
                  Sync behavior:{" "}
                </span>
                {interactionPunchline}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 3 — System architecture */}
      <section
        id="architecture"
        className="scroll-mt-8 bg-gradient-to-b from-brand-surface to-brand-surface-alt px-6 py-12 sm:py-16"
      >
        <SectionHeader
          compact
          sectionDetails={{
            kicker: "Section 3",
            title: "System architecture",
            subtitle:
              "Four layers stacked top to bottom: users, the surfaces they touch, the data layer that backs everything, and the external integrations bolted on.",
          }}
        />

        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          <Reveal>
            <div className="flex flex-col gap-2 rounded-2xl border border-brand-divider bg-brand-tint p-5 sm:p-6">
              {archLayers.map((layer, layerIdx) => (
                <React.Fragment key={layer.label}>
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent sm:w-28 sm:shrink-0">
                      {layer.label}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] sm:text-[13px]">
                      {layer.nodes.map((node, nodeIdx) => (
                        <React.Fragment key={node.label}>
                          <span
                            className={`rounded-md px-2.5 py-1 ${
                              node.accent
                                ? "border border-brand-accent bg-brand-accent-soft font-semibold text-brand-accent"
                                : "border border-brand-divider bg-brand-surface text-brand-ink"
                            }`}
                          >
                            {node.label}
                          </span>
                          {layer.connectors &&
                            nodeIdx < layer.nodes.length - 1 && (
                              <span
                                className="text-brand-muted"
                                aria-hidden
                              >
                                {layer.connectors[nodeIdx] === "both"
                                  ? "↔"
                                  : "←"}
                              </span>
                            )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  {layerIdx < archLayers.length - 1 && (
                    <div
                      className="flex justify-center sm:justify-start sm:pl-32"
                      aria-hidden
                    >
                      <span className="font-mono text-brand-muted">↓</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-r-lg border-l-4 border-brand-accent bg-brand-accent-soft px-4 py-3 sm:px-5">
              <p className="text-[13px] leading-snug text-brand-ink sm:text-sm">
                <span className="font-semibold text-brand-accent">
                  SoT flip:{" "}
                </span>
                Airtable is source-of-truth today. In 12–24 months Postgres
                becomes SoT — the Data-layer arrows flip, every other layer is
                unchanged.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 4 — Engineering feature map */}
      <section
        id="features"
        className="scroll-mt-8 bg-gradient-to-b from-brand-surface-alt to-brand-surface px-6 py-12 sm:py-16"
      >
        <SectionHeader
          compact
          sectionDetails={{
            kicker: "Section 4",
            title: "Engineering feature map",
            subtitle:
              "Comprehensive view of the meaningful engineering surfaces in v1, organized by component. The two flagged in Haley's note — production search/filtering and bidirectional Airtable ↔ Postgres sync — are marked.",
          }}
        />

        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-brand-divider bg-brand-surface px-4 py-2.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-muted">
                Legend
              </p>
              <span className="badge badge-soft badge-success px-2 py-0.5 font-mono text-[10px]">
                Flagged in interviewer note
              </span>
              <span className="badge badge-soft badge-neutral px-2 py-0.5 font-mono text-[10px]">
                Scroll or use arrows
              </span>
            </div>
          </Reveal>

          <FeatureCarousel groups={featureGroups} />
        </div>
      </section>

      {/* Section 5 — Search architecture */}
      <section
        id="search"
        className="scroll-mt-8 bg-gradient-to-b from-brand-surface to-brand-surface-alt px-6 py-12 sm:py-16"
      >
        <SectionHeader
          compact
          sectionDetails={{
            kicker: "Section 5",
            title: "Production search & filtering",
            subtitle:
              "Anchor: ONVC cruise-package search. Then mapped piece-by-piece to Foundra's Algolia design.",
          }}
        />

        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <Reveal>
            <div className="flex flex-col gap-2 rounded-2xl border border-brand-divider bg-brand-tint p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent">
                Anchor · ONVC (Online Vacation Center)
              </p>
              <p className="text-[14px] leading-snug text-brand-ink sm:text-[15px]">
                Production consumer search on Cloudflare Workers via OpenNext,
                Webflow CMS as upstream, Tailwind v4 with Headless UI for
                modals. Hundreds of listings across{" "}
                <span className="font-semibold text-brand-accent">
                  6 facet dimensions
                </span>
                : package type, cruise line, ship, destination, departure
                month, duration.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-3">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Architectural decisions I owned
              </p>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {onvcDecisions.map((d, idx) => (
                <Reveal key={d.title} delay={idx * 80}>
                  <div className="flex h-full flex-col gap-1.5 rounded-xl border border-brand-divider bg-brand-surface p-4 sm:p-5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-sm font-semibold text-brand-accent">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-[15px] font-semibold text-brand-ink">
                        {d.title}
                      </h4>
                    </div>
                    <p className="text-[13px] leading-snug text-brand-muted">
                      {d.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Mapped to Foundra
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="overflow-hidden rounded-2xl border border-brand-divider bg-brand-surface">
                <div className="grid grid-cols-1 divide-y divide-brand-divider sm:grid-cols-[1fr_auto_2fr] sm:divide-x sm:divide-y-0">
                  <div className="bg-brand-tint px-4 py-2 sm:px-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-muted">
                      From ONVC
                    </p>
                  </div>
                  <div
                    className="hidden bg-brand-tint sm:block"
                    aria-hidden
                  />
                  <div className="bg-brand-tint px-4 py-2 sm:px-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent">
                      To Foundra
                    </p>
                  </div>
                </div>
                <ul className="flex flex-col divide-y divide-brand-divider">
                  {foundraMappings.map((m) => (
                    <li
                      key={m.from}
                      className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-[1fr_auto_2fr] sm:gap-4 sm:px-5"
                    >
                      <p className="text-[13px] leading-snug text-brand-muted">
                        {m.from}
                      </p>
                      <span
                        className="hidden self-center font-mono text-brand-accent sm:inline"
                        aria-hidden
                      >
                        →
                      </span>
                      <p className="text-[13px] leading-snug text-brand-ink">
                        {m.to}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="rounded-r-lg border-l-4 border-brand-accent bg-brand-accent-soft px-4 py-3">
              <p className="text-[13px] leading-snug text-brand-ink sm:text-sm">
                <span className="font-semibold text-brand-accent">
                  Honest framing:{" "}
                </span>
                I&apos;ve shipped all the underlying patterns — faceting, filter
                relaxation, multi-tenant filtering, URL-synced state, ranking —
                at production scale. ONVC didn&apos;t need Algolia at that
                record count, so I&apos;ve configured Algolia indices but
                not owned one end-to-end. The index design + sync worker for
                Foundra is day-one work — small ramp, not a gap.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 6 — Sync architecture */}
      <section
        id="sync"
        className="scroll-mt-8 bg-gradient-to-b from-brand-surface-alt to-brand-surface px-6 py-12 sm:py-16"
      >
        <SectionHeader
          compact
          sectionDetails={{
            kicker: "Section 6",
            title: "Bidirectional Airtable ↔ Postgres sync",
            subtitle:
              "Primary anchor: Freight Expert (FMCSA + Zoho ↔ Supabase, in production). Airtable-specific anchor: Rox Radar (Airtable ↔ Webflow via WhaleSync).",
          }}
        />

        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          {/* Flow diagram */}
          <Reveal>
            <div className="flex flex-col gap-4 rounded-2xl border border-brand-divider bg-brand-tint p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent">
                Topology
              </p>
              <div className="flex flex-col gap-3 font-mono text-[12px] leading-snug sm:text-[13px]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-brand-accent bg-brand-accent-soft px-2.5 py-1 font-semibold text-brand-accent">
                    Airtable (SoT)
                  </span>
                  <span className="text-brand-muted">──[webhook]──▶</span>
                  <span className="rounded-md border border-brand-divider bg-brand-surface px-2.5 py-1 text-brand-ink">
                    sync handler
                  </span>
                  <span className="text-brand-muted">──▶</span>
                  <span className="rounded-md border border-brand-divider bg-brand-surface px-2.5 py-1 text-brand-ink">
                    Postgres
                  </span>
                  <span className="text-brand-muted">──▶</span>
                  <span className="rounded-md border border-brand-divider bg-brand-surface px-2.5 py-1 text-brand-ink">
                    Algolia
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-brand-divider bg-brand-surface px-2.5 py-1 text-brand-ink">
                    Provider dashboard
                  </span>
                  <span className="text-brand-muted">──writes──▶</span>
                  <span className="rounded-md border border-brand-divider bg-brand-surface px-2.5 py-1 text-brand-ink">
                    Postgres
                  </span>
                  <span className="text-brand-muted">
                    ──[API + sync-token]──▶
                  </span>
                  <span className="rounded-md border border-brand-accent bg-brand-accent-soft px-2.5 py-1 font-semibold text-brand-accent">
                    Airtable
                  </span>
                </div>
              </div>
              <p className="text-[12px] italic leading-snug text-brand-muted sm:text-[13px]">
                Airtable is SoT today. In 12–24 months Postgres becomes SoT.
                The sync layer doesn&apos;t know which side is authoritative
                — flipping is a config change, not a rewrite.
              </p>
            </div>
          </Reveal>

          {/* Directions */}
          <div className="grid gap-4 lg:grid-cols-2">
            {syncDirections.map((dir, idx) => (
              <Reveal key={dir.label} delay={idx * 80}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-brand-divider bg-brand-surface p-5 sm:p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent">
                    {dir.label}
                  </p>
                  <ol className="flex flex-col gap-2">
                    {dir.steps.map((s, sIdx) => (
                      <li key={s} className="flex gap-3">
                        <span className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-brand-accent">
                          {String(sIdx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[13px] leading-snug text-brand-ink">
                          {s}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Reliability primitives + field ownership */}
          <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
            <Reveal>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-brand-divider bg-brand-surface p-5 sm:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent">
                  Reliability primitives
                </p>
                <ul className="flex flex-col gap-2">
                  {reliabilityPrimitives.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span
                        className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent"
                        aria-hidden
                      />
                      <span className="text-[13px] leading-snug text-brand-ink">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-brand-divider bg-brand-surface p-5 sm:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent">
                  Field ownership at the write layer
                </p>
                <p className="text-[12px] leading-snug text-brand-muted">
                  The key idea: disjoint write paths, enforced at the API
                  surface. No co-owned fields → no last-write-wins races to
                  resolve at runtime.
                </p>
                <div className="flex flex-col gap-2">
                  {ownership.map((o) => (
                    <div
                      key={o.surface}
                      className="rounded-lg border border-brand-divider bg-brand-tint p-3"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent">
                        {o.surface}
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {o.fields.map((f) => (
                          <span
                            key={f}
                            className="badge badge-soft badge-neutral px-1.5 py-0.5 font-mono text-[10px]"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 text-[12px] italic leading-snug text-brand-muted">
                        {o.writers}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Scale + honest framing */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col gap-2 rounded-2xl border border-brand-divider bg-brand-surface p-5 sm:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent">
                  Scale at 100+ markets
                </p>
                <p className="text-[13px] leading-snug text-brand-ink">
                  The bottleneck isn&apos;t Postgres — it&apos;s Airtable&apos;s
                  API rate limits (5 req/s per base).
                </p>
                <ul className="flex flex-col gap-1.5 pt-1">
                  <li className="flex gap-2 text-[13px] leading-snug text-brand-muted">
                    <span
                      className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-accent/60"
                      aria-hidden
                    />
                    <span>
                      Per-region Airtable bases (sharding) + queue-based
                      ingestion buffer between webhook and Postgres write
                    </span>
                  </li>
                  <li className="flex gap-2 text-[13px] leading-snug text-brand-muted">
                    <span
                      className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-accent/60"
                      aria-hidden
                    />
                    <span>Webhook back-pressure handling via queue depth</span>
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex h-full rounded-r-lg border-l-4 border-brand-accent bg-brand-accent-soft px-4 py-3 sm:px-5">
                <p className="text-[13px] leading-snug text-brand-ink sm:text-sm">
                  <span className="font-semibold text-brand-accent">
                    Honest framing:{" "}
                  </span>
                  I&apos;ve shipped this exact pattern with FMCSA + Zoho. The
                  Airtable webhook specifics — payload shape, rate limits,
                  scope tokens — need a day of ramp. The architecture and
                  failure modes I already know. Rox Radar gave me direct
                  Airtable production experience, including the operational
                  pain.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closer */}
      <section className="bg-brand-surface px-6 pb-20 pt-8">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-sm italic leading-relaxed text-brand-muted sm:text-base">
            Happy to walk through any section, anchor, or assumption in detail
            on the call.
          </p>
        </Reveal>
      </section>
    </main>
  );
};

export default FoundraFitPage;
