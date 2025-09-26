import React from "react";

const SectionHeader = (props: {
  sectionDetails: { title: string; subtitle: string };
}) => {
  return (
    <div className="flex flex-col items-center mb-16 gap-4">
      <div className="flex w-full justify-center gap-2">
        <div className="flex flex-col w-full">
          <div className="border-b-4 border-[#e9ebee] w-full h-1/2 mt-2"></div>
          <div></div>
        </div>
        <h1 className="text-4xl sm:text-7xl font-bold p-2">
          {props.sectionDetails.title}
        </h1>
        <div className="flex flex-col w-full">
          <div className="border-b-4 border-[#e9ebee] w-full h-1/2 mt-2"></div>
          <div></div>
        </div>
      </div>

      <h3 className="text-md sm:text-xl font-extralight font-mono italic text-center">
        {props.sectionDetails.subtitle}
      </h3>
    </div>
  );
};

export default SectionHeader;
