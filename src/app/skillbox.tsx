import Image from "next/image";
import React from "react";

const Skillbox = (props: {
  skillDetails: {
    text: string;
    color: string;
    badges: string[];
    skillLevel: number;
  };
}) => {
  const skillLevel = props.skillDetails.skillLevel;
  const progressClass =
    skillLevel >= 70
      ? "progress-success"
      : skillLevel >= 40
      ? "progress-warning"
      : "progress-error";

  return (
    <div>
      <div
        // key={tech}
        className="place-self-center flex flex-col gap-4 justify-center  bg-[#ffffff] rounded-2xl p-4 w-[100%]"
      >
        <p className="font-bold text-2xl">{props.skillDetails.text}</p>

        <div className="flex gap-2">
          {/* Render badges */}
          {props.skillDetails.badges.map((badge) => (
            <div key={badge} className="flex gap-2">
              <div className={`badge badge-soft p-2  badge-info`}>
                {/* <Image
                  src="/nodejs.png"
                  alt="Logo"
                  width={20}
                  height={20}
                  className=""
                /> */}
                {badge}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-1 items-center">
          <p className="text-[#355794] text-lg font-semibold">Level:</p>

          <progress
            className={`progress ${progressClass} `}
            value={props.skillDetails.skillLevel}
            max="100"
          ></progress>
        </div>
      </div>
    </div>
  );
};

export default Skillbox;
