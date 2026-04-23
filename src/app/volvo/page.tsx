import React from "react";
import type { Metadata } from "next";
import SectionHeader from "../sectionHeader";
import Reveal from "../reveal";
import QuadrantGrid from "./quadrantGrid";

export const metadata: Metadata = {
  title: "Volvo × Pranav Yadav — Fit signal",
  robots: { index: false, follow: false },
};

type Strength = {
  title: string;
  punch: string;
  pills: string[];
  caseStudyHref?: string;
};

const strengths: Strength[] = [
  {
    title: "Production conversational AI",
    punch:
      "Easy Leads runs inbound WhatsApp qualification in production — same chat primitives (intent → slot-fill → handoff) a service-booking bot needs.",
    pills: [
      "NestJS",
      "OpenAI",
      "MongoDB",
      "Meta webhooks",
      "Intent classification",
    ],
  },
  {
    title: "LLM engineering discipline",
    punch:
      "Versioned JSON Schema on every call. Prevents a bot from booking an oil change on a VIN that doesn't exist.",
    pills: [
      "JSON Schema",
      "Python",
      "Gemini Files API",
      "Normalizers",
      "Deterministic scoring",
    ],
    caseStudyHref: "/projects/concall-alpha",
  },
  {
    title: "API integration depth",
    punch:
      "The unglamorous half of booking APIs — idempotency, retries, token refresh, partial failures — is where I actually spend time.",
    pills: [
      "NHTSA vPIC",
      "Zoho CRM",
      "HubSpot",
      "OpenAI",
      "WhatsApp Cloud",
    ],
  },
];

type Severity = "green" | "amber";

type Gap = {
  gap: string;
  severity: Severity;
  close: string;
  pills: string[];
};

const gaps: Gap[] = [
  {
    gap: "Azure stack experience",
    severity: "amber",
    close:
      "Azure OpenAI is a near-drop-in for OpenAI. Azure AI Search is the genuine learning — a week of docs and a weekend build.",
    pills: ["OpenAI API", "Gemini API", "Vercel", "AWS"],
  },
  {
    gap: "Production RAG (vector store)",
    severity: "amber",
    close:
      "Doc-grounded LLM work shipped twice (Concallyser and RM&C underwriting). The vector-store + reranker layer is the wiring I'd add — the schema and eval discipline around it is already how I work.",
    pills: ["Vector stores", "Rerankers", "Hybrid search"],
  },
  {
    gap: "Industry experience",
    severity: "green",
    close:
      "Chat primitives (booking, slot-fill, intent) are portable across domains. The Volvo-specific surface — service codes, VIN data, dealer network, manufacturing constraints — is learn-on-the-job.",
    pills: ["Booking flows", "Slot-filling", "Intent classification"],
  },
];

const severityBadge: Record<Severity, { label: string; className: string }> = {
  green: { label: "Green", className: "badge badge-soft badge-success" },
  amber: {
    label: "Amber",
    className: "badge badge-soft badge-warning text-amber-900",
  },
};

type IndexCard = {
  href: string;
  marker: string;
  title: string;
  tag: string;
};

const indexCards: IndexCard[] = [
  {
    href: "#fit-matrix",
    marker: "01",
    title: "Fit matrix",
    tag: "strengths × weaknesses",
  },
  {
    href: "#solution",
    marker: "02",
    title: "Solution sketch",
    tag: "architecture",
  },
  {
    href: "#onboarding",
    marker: "03",
    title: "Production health check",
    tag: "critical structural pain points",
  },
];

type NodeVariant = "default" | "core" | "cross";

type ArchNode = {
  title: string;
  sub: string;
  variant?: NodeVariant;
};

type ArchTier = {
  label: string;
  nodes: ArchNode[];
};

const tiers: ArchTier[] = [
  {
    label: "1 · Channels",
    nodes: [
      { title: "Volvo App", sub: "Embedded chat" },
      { title: "volvocars.com", sub: "Booking widget" },
      { title: "Voice / SMS", sub: "Future · same backend" },
    ],
  },
  {
    label: "2 · Gateway",
    nodes: [
      {
        title: "API Management + Auth",
        sub: "Azure API Mgmt · Volvo ID · rate-limit",
      },
    ],
  },
  {
    label: "3 · Orchestrator",
    nodes: [
      {
        title: "Azure Functions (Python)",
        sub: "Session + vehicle context · turn classifier · tool planner",
        variant: "core",
      },
    ],
  },
  {
    label: "4 · Intelligence core",
    nodes: [
      {
        title: "RAG",
        sub: "Azure AI Search · vector + BM25 + reranker",
      },
      {
        title: "LLM",
        sub: "Azure OpenAI GPT-4o · structured output",
      },
      {
        title: "Tools",
        sub: "Booking · telematics · dealer · vehicle DB",
      },
    ],
  },
  {
    label: "5 · Cross-cutting",
    nodes: [
      {
        title: "State",
        sub: "Cosmos DB · session + vehicle",
        variant: "cross",
      },
      {
        title: "Guardrails",
        sub: "Schema · PII · content filter",
        variant: "cross",
      },
      {
        title: "Observability",
        sub: "App Insights · traces · evals",
        variant: "cross",
      },
    ],
  },
];

const nodeStyles: Record<NodeVariant, string> = {
  default: "bg-brand-surface border-brand-divider",
  core: "bg-brand-accent-soft border-brand-accent",
  cross: "bg-brand-surface-alt border-dashed border-brand-accent/40",
};

type QuadrantColor = "measure" | "understand" | "core" | "trust";

type DiagnosticItem = {
  title: string;
  desc: string;
  critical?: boolean;
};

type Quadrant = {
  color: QuadrantColor;
  heading: string;
  question: string;
  items: DiagnosticItem[];
};

const quadrants: Quadrant[] = [
  {
    color: "measure",
    heading: "Measure",
    question: "Do we know how we're doing?",
    items: [
      {
        title: "Eval harness",
        critical: true,
        desc: "Golden conversations covering happy paths and known edge cases; runs on every prompt or retrieval change; blocks regressions before rollout.",
      },
      {
        title: "Cost & latency budgets",
        desc: "Per-turn token cost and p50/p95 latency tracked; alert thresholds wired up.",
      },
      {
        title: "Product KPIs",
        desc: "Booking conversion, human-deflection rate, CSAT — sliced by cohort and intent.",
      },
    ],
  },
  {
    color: "understand",
    heading: "Understand",
    question: "What is actually happening in production?",
    items: [
      {
        title: "Conversation tracing",
        critical: true,
        desc: "End-to-end turn traces (prompt, retrieved chunks, tool calls, completion) searchable by session; Langfuse / Application Insights / equivalent.",
      },
      {
        title: "Failure-mode clustering",
        desc: "Weekly review of top failure categories — hallucinations, wrong tool choice, broken slot-filling, escalation misses.",
      },
      {
        title: "Intent coverage map",
        desc: "Top-20 real user intents cross-tabbed against how well the bot handles each.",
      },
    ],
  },
  {
    color: "core",
    heading: "Core system quality",
    question: "Is the brain working well?",
    items: [
      {
        title: "RAG retrieval quality",
        critical: true,
        desc: "Precision & recall measured on golden queries; chunk-level eval; adversarial noise injection; separate scores for retrieval vs generation.",
      },
      {
        title: "Structured output discipline",
        desc: "Pydantic schemas on every tool call; validation_error_rate tracked as a first-class metric.",
      },
      {
        title: "Prompt registry",
        desc: "Versioned prompts in source control; every production response tagged with the prompt version that produced it.",
      },
      {
        title: "Context management",
        desc: "Session state, vehicle context, token budget per turn — with explicit truncation and summarization rules.",
      },
    ],
  },
  {
    color: "trust",
    heading: "Trust & safety",
    question: "Can we deploy with confidence?",
    items: [
      {
        title: "Guardrails coverage",
        critical: true,
        desc: "Jailbreak resistance, PII leakage prevention, out-of-scope deflection, brand-safety filters — each tested against a named adversarial suite.",
      },
      {
        title: "Propose → confirm → execute",
        desc: "Enforced in code for every booking-adjacent action, not only at the UX layer. Covers cancellations, reschedules, and edge cases too.",
      },
      {
        title: "Fallback & escalation",
        desc: "Confidence threshold → human handoff paths, end-to-end tested. Clear ownership of escalated conversations.",
      },
      {
        title: "Red-team & audit log",
        desc: "Scripted adversarial runs before each release; complete audit trail of LLM decisions for post-incident review.",
      },
    ],
  },
];

type QuadStyle = {
  card: string;
  heading: string;
  question: string;
  marker: string;
  criticalTag: string;
};

const quadStyles: Record<QuadrantColor, QuadStyle> = {
  measure: {
    card: "bg-purple-50/60 border-purple-200",
    heading: "text-purple-900",
    question: "border-purple-200",
    marker: "text-purple-700",
    criticalTag: "border-purple-300 text-purple-800 bg-white",
  },
  understand: {
    card: "bg-blue-50/60 border-blue-200",
    heading: "text-blue-900",
    question: "border-blue-200",
    marker: "text-blue-700",
    criticalTag: "border-blue-300 text-blue-800 bg-white",
  },
  core: {
    card: "bg-green-50/60 border-green-200",
    heading: "text-green-900",
    question: "border-green-200",
    marker: "text-green-700",
    criticalTag: "border-green-300 text-green-800 bg-white",
  },
  trust: {
    card: "bg-red-50/60 border-red-200",
    heading: "text-red-900",
    question: "border-red-200",
    marker: "text-red-700",
    criticalTag: "border-red-300 text-red-800 bg-white",
  },
};

const VolvoFitPage = () => {
  return (
    <main className="min-h-screen bg-brand-surface text-brand-ink">
      {/* Hero — index */}
      <section className="hero-backdrop relative overflow-hidden px-6 pt-24 pb-20 sm:pt-32 sm:pb-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-12">
          <div className="flex flex-col items-center gap-5 text-center">
            <Reveal>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                Volvo Cars × Pranav Yadav
              </h1>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-sm uppercase tracking-[0.18em] text-brand-muted">
                What this page contains
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {indexCards.map((card, idx) => (
              <Reveal key={card.href} delay={120 + idx * 100}>
                <a
                  href={card.href}
                  className="group flex h-full flex-col gap-6 rounded-2xl border border-brand-divider bg-brand-surface p-6 transition hover:-translate-y-0.5 hover:border-brand-accent hover:shadow-[0_20px_50px_-20px_rgba(53,87,148,0.25)] sm:p-8"
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

      {/* Section 1 — Fit matrix */}
      <section
        id="fit-matrix"
        className="scroll-mt-8 bg-gradient-to-b from-brand-surface to-brand-surface-alt px-6 py-12 sm:py-16"
      >
        <SectionHeader
          compact
          sectionDetails={{
            kicker: "Section 1",
            title: "Fit matrix",
            subtitle: "Strengths and stretches, at a glance.",
          }}
        />

        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          {/* Strengths */}
          <div className="flex flex-col gap-3">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Strong fit
              </p>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {strengths.map((s, idx) => (
                <Reveal key={s.title} delay={idx * 80}>
                  <div className="flex h-full flex-col gap-2.5 rounded-xl border border-brand-divider bg-brand-tint p-4 transition hover:-translate-y-0.5 hover:border-brand-accent hover:shadow-[0_20px_50px_-20px_rgba(53,87,148,0.25)] sm:p-5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-lg font-semibold text-brand-accent">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-base font-semibold text-brand-ink sm:text-lg">
                        {s.title}
                      </h4>
                    </div>
                    <p className="text-[13px] leading-snug text-brand-muted">
                      {s.punch}
                    </p>
                    {s.caseStudyHref && (
                      <a
                        href={s.caseStudyHref}
                        className="inline-flex w-fit items-center gap-1 text-[12px] font-medium text-brand-ink underline decoration-brand-ink/30 decoration-1 underline-offset-4 transition hover:decoration-brand-ink"
                      >
                        Read the case study
                        <span aria-hidden>→</span>
                      </a>
                    )}
                    <div className="mt-auto flex flex-wrap gap-1 pt-1">
                      {s.pills.map((p) => (
                        <span
                          key={p}
                          className="badge badge-soft badge-success px-1.5 py-0.5 font-mono text-[10px]"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Stretches */}
          <div className="flex flex-col gap-3">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                Stretch
              </p>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {gaps.map((g, idx) => (
                <Reveal key={g.gap} delay={idx * 80}>
                  <div className="flex h-full flex-col gap-2.5 rounded-xl border border-brand-divider bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-accent hover:shadow-[0_20px_50px_-20px_rgba(53,87,148,0.25)] sm:p-5">
                    <div className="flex flex-col gap-1.5">
                      <h4 className="text-base font-semibold text-brand-ink sm:text-lg">
                        {g.gap}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-muted">
                          Severity:
                        </span>
                        <span className={severityBadge[g.severity].className}>
                          {severityBadge[g.severity].label}
                        </span>
                      </div>
                    </div>
                    <p className="text-[13px] leading-snug text-brand-muted">
                      {g.close}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1 pt-1">
                      {g.pills.map((p) => (
                        <span
                          key={p}
                          className="badge badge-soft badge-neutral px-1.5 py-0.5 font-mono text-[10px]"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Solution sketch */}
      <section
        id="solution"
        className="scroll-mt-8 bg-gradient-to-b from-brand-surface-alt to-brand-surface px-6 py-12 sm:py-16"
      >
        <SectionHeader
          compact
          sectionDetails={{
            kicker: "Section 2",
            title: "A sketch of the chatbot architecture",
            subtitle: "Chat + RAG + tool-using.",
          }}
        />

        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          {/* Architecture diagram */}
          <Reveal>
            <div className="flex flex-col gap-3 rounded-2xl border border-brand-divider bg-brand-tint p-4 sm:p-6">
              {tiers.map((tier) => (
                <div key={tier.label} className="flex flex-col gap-1.5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent">
                    {tier.label}
                  </p>
                  <div
                    className={`grid gap-2 ${
                      tier.nodes.length === 1
                        ? "grid-cols-1"
                        : "grid-cols-1 sm:grid-cols-3"
                    }`}
                  >
                    {tier.nodes.map((node) => (
                      <div
                        key={node.title}
                        className={`flex flex-col gap-0.5 rounded-lg border px-3 py-2 ${
                          nodeStyles[node.variant ?? "default"]
                        }`}
                      >
                        <p
                          className={`text-[13px] font-semibold leading-tight ${
                            node.variant === "core"
                              ? "text-brand-accent"
                              : "text-brand-ink"
                          }`}
                        >
                          {node.title}
                        </p>
                        <p className="font-mono text-[11px] leading-snug text-brand-muted">
                          {node.sub}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Critical loop callout */}
              <div className="mt-2 rounded-r-lg border-l-4 border-brand-accent bg-brand-accent-soft px-4 py-2.5">
                <p className="text-[12px] leading-snug text-brand-ink sm:text-sm">
                  <span className="font-semibold text-brand-accent">
                    Critical loop:{" "}
                  </span>
                  LLM proposes typed{" "}
                  <code className="rounded border border-brand-accent/30 bg-brand-surface px-1 py-0.5 font-mono text-[10px]">
                    proposed_booking
                  </code>{" "}
                  · user confirms · code executes with idempotency key. The
                  LLM never writes to the booking API directly.
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* Section 3 — Production health check */}
      <section
        id="onboarding"
        className="scroll-mt-8 bg-gradient-to-b from-brand-surface to-brand-surface-alt px-6 py-12 sm:py-16"
      >
        <SectionHeader
          compact
          sectionDetails={{
            kicker: "Section 3",
            title: "Production health check",
            subtitle:
              "The usual structural pinch points when developing systems like this — four lenses, one critical item per lens.",
          }}
        />

        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <QuadrantGrid quadrants={quadrants} quadStyles={quadStyles} />
        </div>
      </section>

      {/* Closer */}
      <section className="bg-brand-surface-alt px-6 pb-20 pt-8">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-sm italic leading-relaxed text-brand-muted sm:text-base">
            Happy to walk through any tier or diagnostic in detail.
          </p>
        </Reveal>
      </section>
    </main>
  );
};

export default VolvoFitPage;
