import React from "react";
import SectionHeader from "./sectionHeader";
import Reveal from "./reveal";

type SkillTier = "Production" | "Working knowledge" | "Exploring";

type SkillGroup = {
  domain: string;
  tagline: string;
  items: {
    label: string;
    tier: SkillTier;
    stack: string[];
  }[];
};

const tierStyles: Record<SkillTier, string> = {
  Production: "bg-brand-ink text-white",
  "Working knowledge": "bg-brand-accent-soft text-brand-accent",
  Exploring: "bg-white text-brand-muted border border-brand-divider",
};

const Skills = () => {
  const sectionDetails = {
    kicker: "Circle of competence",
    title: "Skills",
    subtitle:
      "Breadth across the stack, depth where it matters. Grouped by where I am — not a self-rated percentage.",
  };

  const groups: SkillGroup[] = [
    {
      domain: "Backend",
      tagline: "Where I spend most of my time.",
      items: [
        {
          label: "REST & API design",
          tier: "Production",
          stack: ["Node.js", "Express", "NestJS", "FastAPI"],
        },
        {
          label: "Service integrations",
          tier: "Production",
          stack: ["ClickUp", "Airtable", "HubSpot", "Stripe"],
        },
        {
          label: "Data pipelines",
          tier: "Working knowledge",
          stack: ["Python", "Databricks", "PostgreSQL"],
        },
        {
          label: "GenAI applications",
          tier: "Working knowledge",
          stack: ["OpenAI", "LangChain", "RAG"],
        },
      ],
    },
    {
      domain: "Frontend",
      tagline: "Shipping polished product surfaces.",
      items: [
        {
          label: "Web applications",
          tier: "Production",
          stack: ["React", "Next.js", "TypeScript"],
        },
        {
          label: "Design systems",
          tier: "Production",
          stack: ["Tailwind", "shadcn/ui", "DaisyUI"],
        },
        {
          label: "SEO & performance",
          tier: "Working knowledge",
          stack: ["Webflow", "Vercel", "Core Web Vitals"],
        },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="bg-gradient-to-b from-brand-surface to-brand-surface-alt px-6 py-24 sm:py-32"
    >
      <SectionHeader sectionDetails={sectionDetails} />

      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        {groups.map((group, gIdx) => (
          <Reveal key={group.domain} delay={gIdx * 100} className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between border-b border-brand-divider pb-4">
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-brand-ink">
                {group.domain}
              </h3>
              <p className="font-mono text-xs uppercase tracking-wider text-brand-muted">
                {group.tagline}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item) => (
                <div
                  key={item.label}
                  className="group flex flex-col gap-4 rounded-2xl border border-brand-divider bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-ink hover:shadow-[0_20px_50px_-20px_rgba(53,87,148,0.25)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-lg font-semibold text-brand-ink">
                      {item.label}
                    </p>
                    <span
                      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${tierStyles[item.tier]}`}
                    >
                      {item.tier}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-brand-surface-alt px-2.5 py-1 font-mono text-xs text-brand-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;
