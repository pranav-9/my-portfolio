import { MoveVertical, Octagon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ChartPieLabel } from "./chart";
import ProjectCarousel from "./projectCarousel";
import JobHolder from "./jobHolder";
import SectionHeader from "./sectionHeader";

const TimeLine = () => {
  const sectionDetails = {
    title: "Experience",
    subtitle: "7 years of workex across varied organizations and roles",
  };

  const jobExperiences = [
    {
      year: "2018",
      role: "Dashboard Developer",
      company: "Citibank",
      companyImage: "/citi.png",
      frontend: true,
      backend: false,
      badges: [
        { text: "Frontend", color: "badge-primary" },
        { text: "AngularJS", color: "badge-success" },
      ],
    },
    {
      year: "2019",
      role: "SpringBoot Developer",
      company: "Citibank",
      companyImage: "/citi.png",
      frontend: false,
      backend: true,
      badges: [
        { text: "Backend", color: "badge-primary" },
        { text: "Java", color: "badge-success" },
      ],
    },
    // {
    //   year: "2020",
    //   role: "",

    //   badges: [
    //     { text: "", color: "badge-primary" },
    //     { text: "", color: "badge-success" },
    //   ],
    // },
    {
      year: "2021",
      role: "Node.js Developer ",
      company: "Spark Brighter Thinking",
      companyImage: "/toptal.png",
      frontend: false,
      backend: true,
      badges: [
        { text: "Backend", color: "badge-primary" },
        { text: "Node.js", color: "badge-success" },
      ],
    },
    {
      year: "2022",
      role: "Senior Node.js Developer",
      company: "Xendit",
      companyImage: "/xendit-2.png",
      frontend: false,
      backend: true,
      badges: [
        { text: "Backend", color: "badge-primary" },
        { text: "Node.js", color: "badge-success" },
      ],
    },
    {
      year: "2023",
      role: "Chief Technology Officer",
      company: "On The Move",
      companyImage: "/otm-logo.png",
      frontend: true,
      backend: true,
      badges: [
        { text: "Full Stack", color: "badge-primary" },
        { text: "Node.js", color: "badge-success" },
      ],
    },
    // {
    //   year: "2024",
    //   role: "",
    //   badges: [
    //     { text: "", color: "badge-primary" },
    //     { text: "", color: "badge-success" },
    //   ],
    // },
    {
      year: "2025",
      role: "Automation Consultant",
      company: "Journey Entertainment",
      companyImage: "/toptal.png",
      frontend: true,
      backend: true,
      badges: [
        { text: "Full Stack", color: "badge-primary" },
        { text: "Node.js", color: "badge-success" },
      ],
    },
    // Add more job experiences as needed
  ];

  return (
    <div className="flex flex-col  p-10 bg-gradient-to-b from-[#f8f8f8] to-[#ffffff] gap-8 min-h-screen justify-center">
      <SectionHeader sectionDetails={sectionDetails} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:mr-[12%] sm:ml-[12%]">
        {jobExperiences.map((job, index) => (
          <JobHolder key={index} jobDetails={job}></JobHolder>
        ))}
      </div>

      {/* <div className="flex gap-8 justify-center justify-items-center ">
        <ProjectCarousel></ProjectCarousel>
        <ChartPieLabel></ChartPieLabel>
        <ChartPieLabel></ChartPieLabel>
      </div> */}
    </div>
  );
};

export default TimeLine;
