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
      role: "CTO · Founding engineer · 6-10 reports",
      description:
        "B2C fitness SaaS delivering personalized plans through an LLM-driven coach-trainee loop. Took the product from a Webflow MVP to a fully integrated platform — architecture, APIs, mobile-first web app, and infra.",
      impact:
        "0 to live platform with daily active coach-trainee pairs; LLM integration shipped pre-ChatGPT-mass-adoption (2023).",
      imageUrl: "/otm-app.png",
      stack: ["Next.js", "Node.js", "MongoDB", "AWS", "OpenAI"],
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
      title: "Easy Leads AI",
      role: "Backend architect",
      description:
        "WhatsApp-native lead qualification engine. Dynamically qualifies inbound leads, adapts to their behavior, routes them to a human when ready, and auto-generates a sales script for the handoff.",
      impact:
        "Replaces the SDR top-of-funnel for high-conversion businesses — qualification, nurture, and routing in one pipeline.",
      imageUrl: "/nodejs.png",
      stack: ["NestJS", "OpenAI", "WhatsApp Business API", "Botpress", "Webhooks"],
      website: "#",
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
