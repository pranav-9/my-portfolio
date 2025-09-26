import React from "react";
import ProjectCarousel from "./projectCarousel";
import SectionHeader from "./sectionHeader";

const Project = () => {
  const sectionDetails: { title: string; subtitle: string } = {
    title: "Projects",
    subtitle:
      "Constantly exploring new technologies and build on my existing knowledge base",
  };

  const projects = [
    {
      title: "On The Move",
      description: "Personalized Workout Generator and Tracker",
      imageUrl: "/otm-platform-2.png",
      badges: ["MERN stack", "tailwindcss"],
      website: "https://platform.onthemove.life/home",
    },
    {
      title: "Investing Infographics",
      description:
        "Infographics for retail investors about their favourite indian stocks",
      imageUrl: "/investing.png",
      badges: ["Canva", "Figma"],
      website: "",
    },
    {
      title: "OTM Website",
      description: "SEO optimized website for On The Move platform",
      imageUrl: "/otm-home.png",
      badges: ["Webflow"],
      website: "https://www.onthemove.life",
    },
  ];

  return (
    <div className="flex flex-col  p-10 bg-gradient-to-b from-[#f8f8f8] to-[#ffffff] min-h-screen">
      <SectionHeader sectionDetails={sectionDetails}></SectionHeader>
      <div className="w-full flex flex-col sm:flex-row justify-center gap-8">
        {projects.map((project, index) => (
          <div key={index} className=" ">
            <ProjectCarousel projectDetails={project}> </ProjectCarousel>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
