import React from "react";
import ProjectCarousel from "./projectCarousel";
import SectionHeader from "./sectionHeader";
import Reveal from "./reveal";
import { projects } from "@/lib/projects";

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
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 100}>
            <ProjectCarousel projectDetails={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Project;
