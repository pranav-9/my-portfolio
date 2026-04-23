import React from "react";
import JobHolder, { type JobDetails } from "./jobHolder";
import SectionHeader from "./sectionHeader";
import Reveal from "./reveal";

const TimeLine = () => {
  const sectionDetails = {
    kicker: "7+ years shipping",
    title: "Experience",
    subtitle:
      "Fintech, consumer health, entertainment, and 0-to-1 startups. Individual contributor to CTO.",
  };

  const jobExperiences: JobDetails[] = [
    {
      duration: "2018 — 2019",
      role: "Front-end Developer",
      company: "Citibank",
      companyImage: "/citi.png",
      summary:
        "Built an Angular client app from scratch to production — multiple AG Grid data tables, auth, and session management.",
      tags: ["Angular", "TypeScript", "Front-end"],
    },
    {
      duration: "2019 — 2021",
      role: "Java Developer",
      company: "Citibank",
      companyImage: "/citi.png",
      summary:
        "Owned business logic and CI/CD; pipeline improvements saved ~1 hour of dev effort per day.",
      tags: ["Java", "CI/CD", "Back-end"],
    },
    {
      duration: "2020 — 2021",
      role: "JavaScript Back-end Lead",
      company: "Nuclei Sports",
      companyImage: "/globe.svg",
      summary:
        "Designed a microservices architecture (Node.js, Express, Loopback) and built a proprietary player-performance algorithm. 1-5 reports.",
      tags: ["Node.js", "Microservices", "Leadership"],
    },
    {
      duration: "2021",
      role: "Node.js Developer",
      company: "Spark · via Toptal",
      companyImage: "/toptal.png",
      summary:
        "Third-party integrations (ClickUp, Airtable), webhooks, and RabbitMQ for a UK edtech publisher.",
      tags: ["Node.js", "Integrations", "RabbitMQ"],
    },
    {
      duration: "2022",
      role: "Senior Node.js Developer",
      company: "Xendit · via Toptal",
      companyImage: "/xendit-2.png",
      summary:
        "Built a lean billing/revenue system on a transactional dataset for SEA's largest payment gateway.",
      tags: ["Node.js", "Payments", "Kubernetes"],
    },
    {
      duration: "2022 — 2024",
      role: "CTO · Founding engineer",
      company: "On The Move",
      companyImage: "/otm-logo.png",
      summary:
        "Founded and led engineering for an AI-powered fitness SaaS. 6-10 reports. Took the product from a Webflow MVP to a fully integrated platform.",
      tags: ["Full stack", "Leadership", "LLMs"],
    },
    {
      duration: "2025",
      role: "Automation Consultant",
      company: "Journey Entertainment · via Toptal",
      companyImage: "/toptal.png",
      summary:
        "Automated payment-request approvals and built a JotForm → Airtable pipeline plus a relational DB for crew, cast, and project management.",
      tags: ["Airtable", "Automation", "Zapier"],
    },
    {
      duration: "2025 — now",
      role: "Senior Full-Stack Engineer · AI & Automation",
      company: "Risk Management & Compliance · via Toptal",
      companyImage: "/toptal.png",
      summary:
        "Provider-pluggable LLM pipeline (OpenAI + Gemini) generating underwriter-grade Letters of Experience. Zoho CRM sync with concurrent attachment streaming, GCS uploads, and NHTSA VIN verification.",
      tags: ["Next.js", "Supabase", "LLMs", "Zoho"],
    },
    {
      duration: "2025 — now",
      role: "Senior Full-Stack Developer · Webflow + Next.js",
      company: "Very Big Things · via Toptal",
      companyImage: "/toptal.png",
      summary:
        "Webflow → Next.js 15 migration of a vacation booking platform; edge-native on Cloudflare Workers via OpenNext. KV-backed cache fans out to 6 Webflow collections in parallel and serves a pre-joined dataset globally.",
      tags: ["Next.js", "Cloudflare", "Webflow"],
    },
    {
      duration: "2026",
      role: "Webflow Developer",
      company: "Rox Radar · via Toptal",
      companyImage: "/toptal.png",
      summary:
        "Stabilized a Webflow + Airtable + Mapbox event platform; refactored interactive components and cut bug turnaround.",
      tags: ["Webflow", "Mapbox", "Airtable"],
    },
  ];

  return (
    <section
      id="experience"
      className="bg-gradient-to-b from-brand-surface-alt to-brand-surface px-6 py-24 sm:py-32"
    >
      <SectionHeader sectionDetails={sectionDetails} />

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-brand-divider sm:left-1/2 sm:-translate-x-1/2" />

        <div className="flex flex-col gap-10">
          {jobExperiences.map((job, index) => (
            <Reveal key={job.duration + job.company} delay={index * 80}>
              <JobHolder jobDetails={job} align={index % 2 === 0 ? "left" : "right"} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimeLine;
