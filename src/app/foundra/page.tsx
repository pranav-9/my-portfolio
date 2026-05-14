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
  {
    href: "#pushback",
    marker: "07",
    title: "Honest pushback",
    tag: "what I'd cut · what I'd ask",
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

const productShapeNote =
  "Two-sided directory, but the two sides never meet: parents don't auth, operators don't see parents. Discovery + click-out + lead-gen visibility is the entire value prop — no booking, no in-platform transactions.";

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
        label: "Performance targets",
        items: [
          "Lighthouse 90+ mobile · Core Web Vitals 'Good' · sub-2s on 4G",
          "Accessibility + privacy compliance handled in the cross-cutting layer",
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

type SearchCompare = {
  dimension: string;
  onvc: string;
  algolia: string;
};

const searchComparison: SearchCompare[] = [
  {
    dimension: "Dataset size ceiling",
    onvc: "~5–10k items before payload + filter cost gets ugly",
    algolia: "Effectively unlimited (millions+)",
  },
  {
    dimension: "Per-interaction latency",
    onvc: "0 ms (in-memory)",
    algolia: "20–100 ms (network round-trip)",
  },
  {
    dimension: "First-load cost",
    onvc: "Heavier — ships full dataset in SSR HTML",
    algolia: "Light — only ships shell + first results",
  },
  {
    dimension: "Typo tolerance",
    onvc: "None (“Carribean” matches nothing)",
    algolia: "Built-in, tunable",
  },
  {
    dimension: "Relevance ranking",
    onvc: "None — equality matches only",
    algolia: "Tf-idf, custom ranking, business rules",
  },
  {
    dimension: "Synonyms / aliases",
    onvc: "Hand-coded normalize() helper",
    algolia: "Synonym dictionaries in dashboard",
  },
  {
    dimension: "Faceted counts",
    onvc: "Recomputed on every render in JS",
    algolia: "Returned by API in one call",
  },
  {
    dimension: "Geo / numeric / sort tie-breakers",
    onvc: "Hand-rolled per facet",
    algolia: "Native",
  },
  {
    dimension: "Analytics",
    onvc: "None unless you wire it",
    algolia:
      "Click-through, conversion, no-result tracking out of the box",
  },
  {
    dimension: "Cost",
    onvc: "Cloudflare KV reads (cents/month)",
    algolia: "$0.50 per 1k searches, ~$500/mo at modest scale",
  },
  {
    dimension: "Vendor lock-in",
    onvc: "None",
    algolia: "High — your search becomes their schema",
  },
  {
    dimension: "Data freshness",
    onvc: "Up to 5-min lag on Webflow edits",
    algolia: "Near-instant (push on write)",
  },
  {
    dimension: "Offline / no-JS",
    onvc: "Initial filters work via SSR URL params",
    algolia: "Requires JS + network",
  },
];

type SolutionLayer = {
  step: string;
  label: string;
  framing: string;
  body: string;
};

const solutionLayers: SolutionLayer[] = [
  {
    step: "01",
    label: "Disjoint writers",
    framing: "Design · eliminates ~99% of conflicts",
    body: "Dashboard API only exposes operator-owned fields (description, photos, hours, programs, tags). Admins use an Airtable Interface that hides those same fields once claim_status = claimed. The two writers don't share a surface, so most conflicts never happen.",
  },
  {
    step: "02",
    label: "Claim-aware sync guard",
    framing: "Safety net · for the rare admin override",
    body: "Inbound webhook handler checks claim_status. If an admin wrote an operator-owned field on a claimed listing, the change is not auto-applied — it's parked in a conflict queue (Postgres table + Ops panel UI) with a diff and admin attribution. Admin reviews and either applies (operator gets notified) or discards. The operator's dashboard stays correct in the meantime.",
  },
  {
    step: "03",
    label: "OCC on dashboard save",
    framing: "Last line · for residual concurrent edits",
    body: "Dashboard captures the record's revision on load. On save, that token goes back to the API. If Postgres's revision is higher (admin force-applied a conflict-queue item between load and save), the save returns 409 → operator sees 'Foundra team updated this 2 min ago. Review their change before saving.' No silent overwrites.",
  },
];

const webhookSolutionLayers: SolutionLayer[] = [
  {
    step: "01",
    label: "Intake decoupling",
    framing: "Acknowledge fast, process slow",
    body: "Webhook handler verifies the HMAC signature, persists the raw payload + idempotency key (record_id + revision + field_hash) to a Postgres inbound_events table, and returns 200. Airtable gets a sub-100ms ack; no business logic runs on the request thread, so a slow downstream can never time the handler out.",
  },
  {
    step: "02",
    label: "Idempotent worker + DLQ",
    framing: "Retry on transient, park on permanent",
    body: "Worker drains inbound_events. Skips events whose idempotency key is already marked complete (duplicate-safe). Skips events whose revision is older than current Postgres state (out-of-order-safe). Transient failures retry with exponential backoff (1s / 5s / 30s); after that they land in dead_letter with admin review in the Ops panel.",
  },
  {
    step: "03",
    label: "Nightly reconciliation",
    framing: "Backstop for silent drops",
    body: "Cron job scans every Airtable record, diffs against Postgres, flags any divergence and replays the delta. Catches the cases retries can't see — Airtable subscription dropped, our endpoint was down during the burst, a payload shape we couldn't parse — so the system always converges, even after an outage.",
  },
];

type CutItem = {
  label: string;
  rationale: string;
  payoff: string;
};

const cutItems: CutItem[] = [
  {
    label: "Phase 6 audit artifacts",
    rationale:
      "OWASP versioned checklist, manual WCAG 2.1 AA audit, DR runbook polish, independent security review remediation. Real deliverables that take real time — and the brief itself mentions a 30–60 day post-launch window.",
    payoff: "Phases 0–4 + most of 5 fit 8 weeks cleanly · audits land in post-launch window",
  },
  {
    label: "Ops panel ≠ custom CMS",
    rationale:
      "Phase 5 reads like 'build an admin CMS,' but Airtable already is the editorial workspace — Haley's team lives there. The Ops panel is a thin operational layer for what Airtable can't do: claim approval, DSAR + erasure, audit viewer, impersonation, honeypots.",
    payoff: "~30–40% of implied admin scope removed without losing capability",
  },
  {
    label: "Structured schedules → v2",
    rationale:
      "Free-text schedules per program (e.g. 'Tuesdays 4–5pm, Sept–Dec') ship in v1. Structured RRULE data + schedule-aware Algolia indexing + calendar UI moves to v2 unless parents need 'Saturday morning' as a primary search axis on day one.",
    payoff: "1–2 weeks reclaimed · revisit when post-launch usage shows the need",
  },
];

type OpenQuestion = {
  q: string;
  why: string;
  impact: string;
};

const openQuestions: OpenQuestion[] = [
  {
    q: "Listing granularity — business or program?",
    why: "Working assumption: business-level with programs as a nested free-text structure (fits the 600–1,200 count and the curated framing).",
    impact: "If program-level: Algolia indexes programs not businesses · 5–10× more records · schedule-aware faceting",
  },
  {
    q: "Region structure — path or subdomain?",
    why: "Recommendation: path-based with a single Algolia index using region_slug as a filter. Much simpler to operate at 100 markets.",
    impact: "If subdomain: Vercel multi-domain routing · per-region sitemaps · harder cross-region analytics",
  },
  {
    q: "Write authority — dashboard-only?",
    why: "Is the operator dashboard the only place that writes back operator-owned fields, or does the admin team also edit those directly in Airtable?",
    impact: "Decides whether last-write-wins is theoretical (clean field ownership) or load-bearing (real conflict resolution required)",
  },
  {
    q: "Schedule depth — v1 or v2?",
    why: "Free-text on the listing page, or structured recurring schedules with timezones and exceptions that parents can filter on?",
    impact: "Structured adds 1–2 weeks of v1 work · the cut item above assumes free-text",
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
                      <div className="flex items-center gap-1.5">
                        {isBuild && (
                          <span
                            className="badge badge-soft badge-warning px-2 py-0.5 font-mono text-[10px]"
                            title="Client's own framing in the brief: 'The 8-week target is aggressive given full scope.'"
                          >
                            Aggressive
                          </span>
                        )}
                        <span
                          className={`${stageStatusClass[s.status]} inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[10px]`}
                        >
                          {isBuild && (
                            <span
                              className="inline-block h-1.5 w-1.5 rounded-full bg-info motion-safe:animate-pulse"
                              aria-hidden
                            />
                          )}
                          {s.statusLabel}
                        </span>
                      </div>
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
                    {isBuild && (
                      <p className="font-mono text-[10px] italic leading-snug text-brand-muted">
                        &ldquo;Aggressive given full scope; honest timeline
                        pushback welcomed.&rdquo; — from the brief
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={240}>
            <div className="rounded-r-lg border-l-4 border-brand-divider bg-brand-tint px-4 py-3 sm:px-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-muted">
                Product shape
              </p>
              <p className="mt-1 text-[13px] leading-snug text-brand-ink sm:text-sm">
                {productShapeNote}
              </p>
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
                Direct comparison · ONVC&apos;s approach vs Algolia
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="overflow-hidden rounded-2xl border border-brand-divider bg-brand-surface">
                <div className="grid grid-cols-1 divide-y divide-brand-divider bg-brand-tint sm:grid-cols-[1.2fr_2fr_2fr] sm:divide-x sm:divide-y-0">
                  <div className="px-4 py-2 sm:px-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-muted">
                      Dimension
                    </p>
                  </div>
                  <div className="px-4 py-2 sm:px-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-muted">
                      ONVC&apos;s approach
                    </p>
                  </div>
                  <div className="px-4 py-2 sm:px-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent">
                      Algolia
                    </p>
                  </div>
                </div>
                <ul className="flex flex-col divide-y divide-brand-divider">
                  {searchComparison.slice(0, 5).map((c) => (
                    <li
                      key={c.dimension}
                      className="grid grid-cols-1 gap-1.5 px-4 py-2.5 sm:grid-cols-[1.2fr_2fr_2fr] sm:gap-4 sm:px-5"
                    >
                      <p className="font-mono text-[11px] font-semibold text-brand-ink">
                        {c.dimension}
                      </p>
                      <p className="text-[12px] leading-snug text-brand-muted">
                        {c.onvc}
                      </p>
                      <p className="text-[12px] leading-snug text-brand-ink">
                        {c.algolia}
                      </p>
                    </li>
                  ))}
                </ul>
                <details className="group border-t border-brand-divider">
                  <summary className="flex cursor-pointer list-none items-center justify-center gap-2 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent transition-colors hover:bg-brand-tint sm:px-5 [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">
                      Show {searchComparison.length - 5} more dimensions ↓
                    </span>
                    <span className="hidden group-open:inline">
                      Hide additional dimensions ↑
                    </span>
                  </summary>
                  <ul className="flex flex-col divide-y divide-brand-divider border-t border-brand-divider">
                    {searchComparison.slice(5).map((c) => (
                      <li
                        key={c.dimension}
                        className="grid grid-cols-1 gap-1.5 px-4 py-2.5 sm:grid-cols-[1.2fr_2fr_2fr] sm:gap-4 sm:px-5"
                      >
                        <p className="font-mono text-[11px] font-semibold text-brand-ink">
                          {c.dimension}
                        </p>
                        <p className="text-[12px] leading-snug text-brand-muted">
                          {c.onvc}
                        </p>
                        <p className="text-[12px] leading-snug text-brand-ink">
                          {c.algolia}
                        </p>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="rounded-r-lg border-l-4 border-brand-accent bg-brand-accent-soft px-4 py-3 sm:px-5">
              <p className="text-[13px] leading-snug text-brand-ink sm:text-sm">
                <span className="font-semibold text-brand-accent">
                  Foundra&apos;s call:{" "}
                </span>
                600–1,200 listings at launch fits in-memory cleanly, but the
                brief is 100+ markets — that&apos;s 60k–120k records at full
                scale, past the ~5–10k ceiling I hit at ONVC. Algolia is the
                right primitive on day one. What carries over from the ONVC
                build: URL-synced filter state, filter relaxation on zero
                results, deep-linkable facet combinations, and single-index
                multi-tenancy (one{" "}
                <code className="rounded bg-brand-surface px-1 py-0.5 font-mono text-[11px] text-brand-ink">
                  listings_prod
                </code>
                , <code className="rounded bg-brand-surface px-1 py-0.5 font-mono text-[11px] text-brand-ink">region_slug</code> as a{" "}
                <code className="rounded bg-brand-surface px-1 py-0.5 font-mono text-[11px] text-brand-ink">filterOnly</code> facet,
                not index-per-region).
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

          {/* Problem card 1 */}
          <Reveal>
            <div className="flex flex-col gap-3 rounded-2xl border border-brand-accent bg-brand-accent-soft p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent">
                The hard problem · 01
              </p>
              <h4 className="text-lg font-semibold text-brand-accent sm:text-xl">
                The same-field race
              </h4>
              <p className="text-[13px] leading-relaxed text-brand-ink sm:text-sm">
                Admin edits{" "}
                <code className="rounded bg-brand-surface px-1 py-0.5 font-mono text-[11px] text-brand-ink">
                  description
                </code>{" "}
                on a listing in Airtable at T₀. Operator edits the same field
                in the dashboard at T₀+1s. Both round-trip through sync. Which
                write wins, and does the loser even know they were
                overwritten?
              </p>
              <p className="text-[12px] italic leading-snug text-brand-muted">
                Most fields aren&apos;t at risk — pipeline-owned fields
                (address, lat/lng, region, claim status) and operator-owned
                fields (description, photos, hours, programs, tags) have
                disjoint writers by design. The race only emerges when an
                admin reaches into operator territory.
              </p>
            </div>
          </Reveal>

          {/* Solution card 1 */}
          <Reveal delay={80}>
            <div className="flex flex-col gap-3 rounded-2xl border border-brand-divider bg-brand-surface p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Three-layer defense · field-level
              </p>
              <div className="grid gap-3 lg:grid-cols-3">
                {solutionLayers.map((s) => (
                  <div
                    key={s.step}
                    className="flex flex-col gap-2 rounded-lg border border-brand-divider bg-brand-tint p-4"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-sm font-semibold text-brand-accent">
                        {s.step}
                      </span>
                      <h5 className="text-[14px] font-semibold text-brand-ink">
                        {s.label}
                      </h5>
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent">
                      {s.framing}
                    </p>
                    <p className="text-[12px] leading-snug text-brand-muted">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[11px] italic leading-snug text-brand-muted">
                Last-write-wins only applies to truly co-owned fields, which
                the schema designs to be zero. Every write carries provenance
                (actor, source, timestamp) for audit either way.
              </p>
            </div>
          </Reveal>

          {/* Problem card 2 */}
          <Reveal>
            <div className="flex flex-col gap-3 rounded-2xl border border-brand-accent bg-brand-accent-soft p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent">
                The hard problem · 02
              </p>
              <h4 className="text-lg font-semibold text-brand-accent sm:text-xl">
                The unreliable webhook
              </h4>
              <p className="text-[13px] leading-relaxed text-brand-ink sm:text-sm">
                Airtable fires a webhook on every record change. Sometimes the
                request times out. Sometimes the handler crashes mid-write and
                Postgres ends up partially updated. Sometimes two events arrive
                out of order. Occasionally the webhook just{" "}
                <em>doesn&apos;t fire at all</em> — subscription dropped, our
                endpoint was down during the burst, payload shape we
                can&apos;t parse. Each of these silently desynchronizes
                Postgres from Airtable.
              </p>
              <p className="text-[12px] italic leading-snug text-brand-muted">
                The naive handler (verify signature → do work synchronously →
                return 200) loses data in every one of these scenarios.
              </p>
            </div>
          </Reveal>

          {/* Solution card 2 */}
          <Reveal delay={80}>
            <div className="flex flex-col gap-3 rounded-2xl border border-brand-divider bg-brand-surface p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Three-layer defense · webhook-level
              </p>
              <div className="grid gap-3 lg:grid-cols-3">
                {webhookSolutionLayers.map((s) => (
                  <div
                    key={s.step}
                    className="flex flex-col gap-2 rounded-lg border border-brand-divider bg-brand-tint p-4"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-sm font-semibold text-brand-accent">
                        {s.step}
                      </span>
                      <h5 className="text-[14px] font-semibold text-brand-ink">
                        {s.label}
                      </h5>
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent">
                      {s.framing}
                    </p>
                    <p className="text-[12px] leading-snug text-brand-muted">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[11px] italic leading-snug text-brand-muted">
                The handler stays sub-100ms regardless of downstream load.
                Retries are bounded and observable. Drops are caught by
                reconciliation within 24 hours. The system always converges.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 7 — Honest pushback */}
      <section
        id="pushback"
        className="scroll-mt-8 bg-gradient-to-b from-brand-surface to-brand-surface-alt px-6 py-12 sm:py-16"
      >
        <SectionHeader
          compact
          sectionDetails={{
            kicker: "Section 7",
            title: "Honest pushback",
            subtitle:
              "The brief explicitly invited timeline pushback. Two columns: what I'd argue for cutting from v1, and what I'd want answered before writing code.",
          }}
        />

        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          {/* What I'd cut */}
          <div className="flex flex-col gap-3">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent">
                  What I&apos;d cut from v1 to actually hit 8 weeks
                </p>
                <p className="font-mono text-[10px] italic text-brand-muted">
                  &ldquo;Honest timeline pushback welcomed&rdquo; — from the brief
                </p>
              </div>
            </Reveal>
            <div className="grid gap-3 lg:grid-cols-3">
              {cutItems.map((c, idx) => (
                <Reveal key={c.label} delay={idx * 80}>
                  <div className="flex h-full flex-col gap-2 rounded-2xl border border-brand-divider bg-brand-surface p-4 sm:p-5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-sm font-semibold text-brand-accent">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-[15px] font-semibold text-brand-ink">
                        {c.label}
                      </h4>
                    </div>
                    <p className="text-[12px] leading-snug text-brand-muted">
                      {c.rationale}
                    </p>
                    <p className="mt-auto pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent">
                      → {c.payoff}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={240}>
              <div className="rounded-r-lg border-l-4 border-brand-accent bg-brand-accent-soft px-4 py-3 sm:px-5">
                <p className="text-[13px] leading-snug text-brand-ink sm:text-sm">
                  <span className="font-semibold text-brand-accent">
                    Net shape:{" "}
                  </span>
                  Phases 0–4 + most of 5 inside 8 weeks. Phase 6 artifacts slide
                  into the 30–60 day post-launch window the brief already
                  mentions. The product launches on schedule; the audit
                  paperwork lands behind it.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Open questions */}
          <div className="flex flex-col gap-3">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Questions I&apos;d want answered week 1
              </p>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {openQuestions.map((o, idx) => (
                <Reveal key={o.q} delay={idx * 80}>
                  <div className="flex h-full flex-col gap-2 rounded-xl border border-brand-divider bg-brand-tint p-4 sm:p-5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-sm font-semibold text-brand-accent">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h5 className="text-[14px] font-semibold text-brand-ink">
                        {o.q}
                      </h5>
                    </div>
                    <p className="text-[12px] leading-snug text-brand-muted">
                      {o.why}
                    </p>
                    <p className="mt-auto pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-muted">
                      Impact · {o.impact}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closer */}
      <section className="bg-brand-surface px-6 pb-20 pt-8">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-sm italic leading-relaxed text-brand-muted sm:text-base">
            If we hire-fit, day 1 I&apos;d start by reading every Airtable
            column with Haley and locking the field-ownership matrix before
            touching code. Happy to walk through any section, anchor, or
            assumption on the call.
          </p>
        </Reveal>
      </section>
    </main>
  );
};

export default FoundraFitPage;
