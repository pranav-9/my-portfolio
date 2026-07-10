import type { Metadata } from "next";
import React from "react";
import NavBar from "../navbar";
import Footer from "../footer";
import Reveal from "../reveal";
import ProjectCarousel from "../projectCarousel";
import { getProjectsByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "All projects — Pranav Yadav",
  description:
    "Every project here is shipped and live — product builds, Webflow ⇄ Next.js hybrids, and Webflow sites.",
  alternates: { canonical: "/projects" },
};

const ProjectsIndex = () => {
  const groups = getProjectsByCategory();

  return (
    <div>
      <NavBar breadcrumb="All projects" />

      <header className="bg-gradient-to-b from-brand-surface-alt to-brand-surface px-6 pb-4 pt-16 sm:pt-24">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="kicker">
            <span className="kicker-dot" />
            The full ledger
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-brand-ink sm:text-6xl">
            All projects
          </h1>
          <p className="max-w-2xl text-base text-brand-muted sm:text-lg">
            Everything on this page is shipped and live right now — no mockups,
            no side-project graveyard.
          </p>
        </Reveal>
      </header>

      <main className="bg-brand-surface px-6 pb-20 sm:pb-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 pt-12 sm:gap-20 sm:pt-16">
          {groups.map((group) => (
            <section key={group.category}>
              <Reveal className="mb-8 flex items-center gap-4">
                <span className="kicker">
                  <span className="kicker-dot" />
                  {group.label}
                </span>
                <span className="h-px flex-1 bg-brand-divider" />
                <span className="font-mono text-xs text-brand-muted">
                  {String(group.projects.length).padStart(2, "0")}
                </span>
              </Reveal>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {group.projects.map((project, index) => (
                  <Reveal key={project.slug} delay={index * 100}>
                    <ProjectCarousel projectDetails={project} />
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsIndex;
