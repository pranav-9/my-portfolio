import React from "react";
import ProjectCarousel from "./projectCarousel";
import SectionHeader from "./sectionHeader";

const Project = () => {
  const sectionDetails: { title: string; subtitle: string } = {
    title: "Projects",
    subtitle:
      "Constantly exploring new technologies and build on my existing knowledge base",
  };

  const projects: {
    title: string;
    description: string;
    imageUrl: string;
    badges: string[];
    website: string;
  }[] = [
    {
      title: "On The Move",
      description: "Personalized Workout Generator and Tracker",
      imageUrl: "/otm-app.png",
      badges: ["MERN stack"],
      website: "https://platform.onthemove.life/home",
    },
    {
      title: "Concall Alpha",
      description: "AI based sentiment analysis signals for Equity Investors",
      imageUrl: "/concall.png",
      badges: ["Next.js", "Supabase", "tailwindcss"],
      website: "https://concall-alpha.vercel.app/",
    },
    {
      title: "OTM Website",
      description: "SEO optimized website for On The Move platform",
      imageUrl: "/otm-seo.png",
      badges: ["Webflow"],
      website: "https://www.onthemove.life",
    },
  ];

  return (
    <div className="flex flex-col  p-10 bg-gradient-to-b from-[#f8f8f8] to-[#ffffff] min-h-screen">
      <SectionHeader sectionDetails={sectionDetails}></SectionHeader>
      <div className="w-full flex flex-col sm:flex-row justify-center gap-8">
        {projects.map((project, index) => (
          // <div className=" ">
          <ProjectCarousel
            key={index}
            projectDetails={project}
          ></ProjectCarousel>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
