import Image from "next/image";
import React from "react";

const ProjectCarousel = (props: {
  projectDetails: {
    title: string;
    description: string;
    imageUrl: string;
    badges: string[];
    website: string;
  };
}) => {
  return (
    <div className=" flex flex-col gap-4 w-80 sm:w-100  bg-gray-200 rounded-2xl  min-h-[500px] ">
      <div className="flex justify-center border-2 rounded-2xl w-full">
        <Image
          src={props.projectDetails.imageUrl}
          alt="Burger"
          height={100}
          width={400}
          // objectFit="cover"
          className="rounded-2xl "
        />
      </div>

      <div className="flex flex-col gap-4 sm:gap-8 p-2 ml-4">
        <p className="font-bold text-2xl">{props.projectDetails.title}</p>
        <p className="font-mono  ">{props.projectDetails.description}</p>
        {props.projectDetails.badges && (
          <div className="flex gap-2">
            {props.projectDetails.badges.map((badge, index) => (
              <div key={index} className="badge  badge-neutral  p-2">
                {badge}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <a
            className="link link-hover underline"
            href={props.projectDetails.website}
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
