import React from "react";
import Skillbox from "./skillbox";

const SkillDomain = (props) => {
  return (
    <div className="flex flex-col justify-center gap-4  ">
      <p className="text-2xl sm:text-4xl font-bold text-[#355794] font-heavy">
        {props.domainDetails.title}
      </p>
      <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 p-2 sm:p-8 gap-4  bg-[#e6ebf5] rounded-2xl">
        {props.domainDetails.work.map((s) => (
          <div key={s}>
            <Skillbox skillDetails={s}></Skillbox>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillDomain;
