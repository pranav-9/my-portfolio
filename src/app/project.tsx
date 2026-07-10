import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCarousel from "./projectCarousel";
import SectionHeader from "./sectionHeader";
import Reveal from "./reveal";
import { getFeaturedProjects } from "@/lib/projects";

export type { Project as ProjectDetails } from "@/lib/projects";

const Project = () => {
  const sectionDetails = {
    kicker: "Selected work",
    title: "Projects",
    subtitle:
      "A slice of what I've shipped recently — from consumer platforms to AI-driven tooling.",
  };

  return (
    <section
      id="projects"
      className="bg-gradient-to-b from-brand-surface-alt to-brand-surface px-6 py-16 sm:py-32"
    >
      <SectionHeader sectionDetails={sectionDetails} />
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {getFeaturedProjects().map((project, index) => (
          <Reveal key={project.slug} delay={index * 100}>
            <ProjectCarousel projectDetails={project} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mx-auto mt-12 flex max-w-6xl justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-brand-accent transition hover:text-brand-ink"
        >
          View all projects
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </Reveal>
    </section>
  );
};

export default Project;
