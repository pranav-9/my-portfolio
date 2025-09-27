import Image from "next/image";
import React from "react";
import ProjectCarousel from "./projectCarousel";
import { title } from "process";
import Skillbox from "./skillbox";
import SectionHeader from "./sectionHeader";
import SkillDomain from "./skillDomain";

const Skills = () => {
  const sectionDetails = {
    title: "Skills",
    subtitle:
      "My Circle of Competence represents a wide breadth combined with specific depth",
  };

  const skills = [
    {
      id: 1,
      title: "Backend Work",
      work: [
        {
          text: "REST APIs",
          color: "badge-primary",
          badges: ["Express", "Nest.js", "FastAPI"],
          skillLevel: 85,
        },
        {
          text: "API Integrations",
          color: "badge-accent",
          badges: ["clickup", "airtable", "hubspot"],
          skillLevel: 70,
        },
        {
          text: "Data Analytics",
          color: "badge-secondary",
          badges: ["Python", "Databricks"],
          skillLevel: 50,
        },

        {
          text: "GenAI Applications",
          color: "badge-info",
          badges: ["OpenAI", "Langchain"],
          skillLevel: 35,
        },
      ],
    },
    {
      id: 2,
      title: "Frontend Work",
      work: [
        {
          text: "WebApps",
          color: "badge-primary",
          badges: ["React", "Next.js"],
          skillLevel: 60,
        },
        {
          text: "Styling",
          color: "badge-secondary",
          badges: ["TailwindCSS", "DaisyUI", "shadcn/ui"],
          skillLevel: 45,
        },
        {
          text: "SEO & Performance",
          color: "badge-accent",
          badges: ["Webflow", "Vercel"],
          skillLevel: 30,
        },
        // {
        //   text: "HTML & CSS",
        //   color: "badge-info",
        //   badges: ["HTML5", "CSS3"],
        //   skillLevel: 90,
        // },
      ],
    },
  ];

  return (
    <div className="flex flex-col pt-16 p-10 bg-gradient-to-b from-[#ffffff] to-[#f8f8f8] min-h-screen">
      <SectionHeader sectionDetails={sectionDetails} />

      {/* <div className="flex justify-center gap-4 justify-items-center"> */}
      <div className="flex justify-center flex-col gap-8 ">
        {skills.map((i, index) => (
          <SkillDomain key={index} domainDetails={i}></SkillDomain>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Skills;
