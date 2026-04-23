import React from "react";
import SectionHeader from "./sectionHeader";
import Reveal from "./reveal";

type Capability = {
  title: string;
  claim: string;
  proof: string[];
};

const Skills = () => {
  const sectionDetails = {
    kicker: "Circle of competence",
    title: "What I build",
    subtitle:
      "Four capabilities, each anchored in named client work below.",
  };

  const capabilities: Capability[] = [
    {
      title: "AI in production",
      claim:
        "Provider-pluggable LLM pipelines. JSON-contracted, output-verified.",
      proof: ["RM&C", "Easy Leads", "Concall Alpha AI", "On The Move"],
    },
    {
      title: "Service & API integrations",
      claim: "Auth, retries, batching, caching — the boring half done right.",
      proof: [
        "Zoho CRM",
        "NHTSA vPIC",
        "ClickUp",
        "Airtable",
        "Stripe",
        "WhatsApp",
        "RabbitMQ",
      ],
    },
    {
      title: "Webflow ⇄ Next.js hybrids",
      claim:
        "Marketing in Webflow, scale in Next.js. Migrations, integrations, edge.",
      proof: ["Very Big Things", "Rox Radar", "On The Move"],
    },
    {
      title: "0-to-1 architecture",
      claim: "Backend, app, infra — comfortable owning the whole call.",
      proof: ["OTM (CTO)", "Easy Leads", "Nuclei (lead)"],
    },
  ];

  return (
    <section
      id="skills"
      className="bg-gradient-to-b from-brand-surface to-brand-surface-alt px-6 py-24 sm:py-32"
    >
      <SectionHeader sectionDetails={sectionDetails} />

      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
        {capabilities.map((cap, idx) => (
          <Reveal key={cap.title} delay={idx * 100}>
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-brand-divider bg-white p-7 transition hover:-translate-y-0.5 hover:border-brand-ink hover:shadow-[0_20px_50px_-20px_rgba(53,87,148,0.25)]">
              <h3 className="text-xl font-semibold tracking-tight text-brand-ink">
                {cap.title}
              </h3>
              <p className="text-sm leading-relaxed text-brand-muted">
                {cap.claim}
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {cap.proof.map((p) => (
                  <span
                    key={p}
                    className="rounded-md bg-brand-surface-alt px-2.5 py-1 font-mono text-xs text-brand-muted"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;
