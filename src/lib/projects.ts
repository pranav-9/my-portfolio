export type Phase = {
  id: string;
  title: string;
  summary: string;
};

export type CaseStudy = {
  problem: string;
  context: string[];
  pullQuote?: string;
  whatIBuilt: string[];
  phases?: Phase[];
  decisions: { title: string; rationale: string }[];
  scope?: string;
  outcome: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export type Project = {
  slug: string;
  title: string;
  role: string;
  description: string;
  impact: string;
  imageUrl: string;
  stack: string[];
  website: string;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "on-the-move",
    title: "On The Move",
    role: "CTO · 0-to-1",
    description:
      "B2C fitness SaaS with an LLM-driven coach-trainee loop. Took it from Webflow MVP to fully integrated platform.",
    impact: "Live, with daily active coach-trainee pairs.",
    imageUrl: "/otm-app.png",
    stack: ["Next.js", "Node.js", "MongoDB", "AWS", "OpenAI"],
    website: "https://platform.onthemove.life/home",
  },
  {
    slug: "concall-alpha",
    title: "Concall Alpha AI",
    role: "Solo build · Two systems",
    description:
      "Investment research platform for Indian listed companies. A Python pipeline extracts; a Next.js app renders.",
    impact: "Schema-first LLM extraction. No regex on free text.",
    imageUrl: "/concall-alpha.png",
    stack: ["Python", "Gemini", "Next.js", "Supabase", "Vercel"],
    website: "https://concall-alpha.vercel.app/",
    caseStudy: {
      problem:
        "Indian equity investors spend hours per company per quarter reading concall transcripts, investor presentations, and annual reports. Most of the signal is buried in unstructured text. Concall Alpha AI turns those documents into structured, comparable, queryable research data.",
      context: [
        "Two systems with a clean split: Concallyser (Python) extracts; Concall Alpha AI (Next.js) renders. The contract between them is the Supabase schema — neither side needs to know anything about the other beyond the shape of those tables.",
        "LLM hallucination is unacceptable when the output feeds investment decisions — silently wrong is worse than missing.",
        "Outputs have to be schema-conformant for downstream use: search across companies and quarters, comparison views, credibility-weighted summaries.",
        "Solo build. Opinionated stack. Sequential batch is fine at the current company count; that constraint shapes a lot of the design.",
      ],
      pullQuote:
        "Concallyser is the factory. Concall Alpha AI is the showroom. The contract between them is the Supabase schema.",
      whatIBuilt: [
        "The backend orchestrator (`run-seeds`) reads company codes from `seeds.txt` and iterates through four extraction phases per company. Each phase has its own JSON Schema, its own prompt, and its own normalizer.",
        "Shared infrastructure: one unified prep entry point for CSV discovery, FY/quarter normalization, PDF caching, and Gemini Files API upload. A minimal LLM provider abstraction (Gemini default; Claude available for text-only flows). PDFs cached locally; Gemini file IDs cached with a 20-day TTL aligned to the provider's actual retention window — not picked from convenience.",
        "The frontend is a Next.js app on Supabase, deployed on Vercel — a read-and-render layer over the same tables the pipeline writes. Because both halves only talk through the schema, the schema-first discipline on the backend is what keeps the frontend from silently breaking when a field shifts.",
      ],
      phases: [
        {
          id: "Phase 1",
          title: "Company foundation",
          summary:
            "Metadata, business snapshot, industry analysis, transcript scoring, moat analysis.",
        },
        {
          id: "Phase 5",
          title: "Forward growth outlook",
          summary:
            "Fact base of up to 12 forward-looking facts, top-3 ranked catalysts with also-considered rejections, and base/upside/downside scenarios.",
        },
        {
          id: "Phase 6",
          title: "Guidance & credibility",
          summary:
            "Management guidance tracking with a credibility verdict from a fixed enum (high_trust → not_assessable).",
        },
        {
          id: "Phase 7",
          title: "Key variables & KPIs",
          summary:
            "Non-financial key-variable discovery and KPI history extraction.",
        },
      ],
      decisions: [
        {
          title: "Schema-first JSON contracts everywhere — no regex on free text",
          rationale:
            "Every phase has a JSON Schema; every model call uses structured JSON mode. The schemas turned out to be the codebase's most valuable asset — the Phase 5 also-considered structure (next-best catalysts with explicit rejection reasons) and the Phase 6 credibility enum are domain modeling that only comes out of painful iteration. If everything else were thrown out tomorrow, the prompts and the schemas would still port to whatever replaced them.",
        },
        {
          title: "LLM proposes, code verifies",
          rationale:
            "Normalizers rank, filter, clamp, and de-duplicate model output before persistence. The model never produces the final row directly. Cheaper than stacking another LLM as a verifier — and actually deterministic about what's been checked.",
        },
        {
          title: "Deterministic post-processing for scores",
          rationale:
            "Scores like Phase 5's `growth_score` are computed in Python after the LLM returns, not asked of the model. Reproducible across runs, auditable, tunable without re-prompting.",
        },
      ],
      scope:
        "Not an AI orchestrator. It's a DAG of LLM calls with hardcoded edges — no tool calling, no agent context, no parallel fan-out, no RAG, no per-task model routing. For the current use case (analyze a known list of companies through a known sequence of extractions) a hardcoded pipeline is the right shape, and naming that scope explicitly is what keeps the project from sprawling.",
      outcome: [
        "Live at concall-alpha.vercel.app, indexing Indian listed-company filings.",
        "Replaces hours of manual concall review per company per quarter.",
        "The architectural patterns (provider-pluggable LLM + JSON contracts + deterministic verification) became the template I now reuse on client work — most recently the Letters of Experience pipeline at Risk Management & Compliance.",
      ],
      liveUrl: "https://concall-alpha.vercel.app/",
    },
  },
  {
    slug: "easy-leads-ai",
    title: "Easy Leads AI",
    role: "Backend architect",
    description:
      "WhatsApp-native lead qualification engine. Qualifies, adapts, hands off — with an auto-generated sales script.",
    impact: "Replaces the SDR top of funnel.",
    imageUrl: "/easy-leads.svg",
    stack: ["NestJS", "OpenAI", "WhatsApp Business API", "Botpress", "Webhooks"],
    website: "https://github.com/pranav-9/easy-leads-ai",
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getProjectsWithCaseStudies = (): Project[] =>
  projects.filter((p) => p.caseStudy);
