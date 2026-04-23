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
      duration: "2018 — 2020",
      role: "Software Engineer",
      company: "Citibank",
      companyImage: "/citi.png",
      summary:
        "Built internal dashboards and SpringBoot services powering institutional workflows.",
      tags: ["Java", "SpringBoot", "Dashboards"],
    },
    {
      duration: "2021",
      role: "Node.js Developer",
      company: "Spark · via Toptal",
      companyImage: "/toptal.png",
      summary:
        "Backend integrations and service work for a UK edtech publisher through Toptal.",
      tags: ["Node.js", "Integrations"],
    },
    {
      duration: "2022",
      role: "Senior Node.js Developer",
      company: "Xendit",
      companyImage: "/xendit-2.png",
      summary:
        "Payments infrastructure — high-throughput APIs for one of SEA's largest payment gateways.",
      tags: ["Node.js", "Payments", "Scale"],
    },
    {
      duration: "2023 — 2024",
      role: "Chief Technology Officer",
      company: "On The Move",
      companyImage: "/otm-logo.png",
      summary:
        "Founded and led engineering. Shipped platform, app, and marketing site end-to-end.",
      tags: ["Full stack", "0-to-1", "Leadership"],
    },
    {
      duration: "2025 — now",
      role: "Automation Consultant",
      company: "Journey Entertainment",
      companyImage: "/toptal.png",
      summary:
        "Automation and AI-powered tooling for creative and operational workflows.",
      tags: ["Automation", "GenAI", "Full stack"],
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
