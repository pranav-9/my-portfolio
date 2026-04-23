import React from "react";
import ProjectCarousel from "./projectCarousel";
import SectionHeader from "./sectionHeader";
import Reveal from "./reveal";

export type ProjectDetails = {
  title: string;
  role: string;
  description: string;
  impact: string;
  imageUrl: string;
  stack: string[];
  website: string;
};

const Project = () => {
  const sectionDetails = {
    kicker: "Selected work",
    title: "Projects",
    subtitle:
      "A slice of what I've shipped recently — from consumer platforms to AI-driven tooling.",
  };

  const projects: ProjectDetails[] = [
    {
      title: "On The Move",
      role: "CTO · 0-to-1",
      description:
        "Personalized workout generator and tracker for coaches and trainees. Built the full platform — architecture, APIs, app, infra.",
      impact: "Live platform serving daily active coach-trainee pairs.",
      imageUrl: "/otm-app.png",
      stack: ["Next.js", "Node.js", "MongoDB", "AWS"],
      website: "https://platform.onthemove.life/home",
    },
    {
      title: "Concall Alpha",
      role: "Solo build",
      description:
        "AI-based sentiment analysis on earnings call transcripts — surfaces signals and tone shifts for equity investors.",
      impact: "Automated what used to be hours of manual call review.",
      imageUrl: "/concall.png",
      stack: ["Next.js", "Supabase", "OpenAI", "Tailwind"],
      website: "https://concall-alpha.vercel.app/",
    },
    {
      title: "OTM Marketing Site",
      role: "Design + build",
      description:
        "SEO-optimized marketing site for the On The Move platform — custom CMS-driven pages with careful attention to Core Web Vitals.",
      impact: "Primary acquisition surface for the product.",
      imageUrl: "/otm-seo.png",
      stack: ["Webflow", "SEO", "CMS"],
      website: "https://www.onthemove.life",
    },
  ];

  return (
    <section
      id="projects"
      className="bg-gradient-to-b from-brand-surface-alt to-brand-surface px-6 py-24 sm:py-32"
    >
      <SectionHeader sectionDetails={sectionDetails} />
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 100}>
            <ProjectCarousel projectDetails={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Project;
