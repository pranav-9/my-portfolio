import { Octagon } from "lucide-react";
import Image from "next/image";
import React from "react";

const JobHolder = (props) => {
  return (
    <div
      //   key={job.year + index}
      className="flex flex-col justify-center items-center gap-4 min-h-[250px]

            "
    >
      <div className="h-1/4 flex w-full items-center justify-center border-b-2 relative">
        <div className="text-xl font-extrabold">{props.jobDetails.year}</div>
        {/* <Octagon size={20} color="#2fb646" absoluteStrokeWidth /> */}
        <div className="absolute left-1/2 bottom-[-6px]">
          <Octagon size={10} color="#355794" absoluteStrokeWidth />
        </div>
      </div>
      <div className="h-3/4 min-w-[80%] ">
        {/* Conditionally render role if not empty */}
        {props.jobDetails.role !== "" && (
          <div className="flex flex-col text-md min-h-[150px] gap-8  bg-[#e6ebf5]  p-2 m-2 rounded-2xl  text-center  ">
            <div className="flex gap-2">
              <div className="w-1/6 flex justify-center items-center">
                <Image
                  src={props.jobDetails.companyImage}
                  alt="Logo"
                  width={50}
                  height={20}
                  className=""
                />
              </div>
              <div className="flex flex-col items-start">
                {/* <p className="text-[#355794] text-md font-semibold text-start"> */}
                <p className="font-bold text-lg sm:text-2xl text-start">
                  {props.jobDetails.role}
                </p>
                <p className="text-[#355794] text-md font-bold text-start">
                  {props.jobDetails.company}
                </p>
              </div>
            </div>

            {/* Conditionally render badges if at least one badge text is not empty */}
            {(props.jobDetails.badges[0].text !== "" ||
              props.jobDetails.badges[1].text !== "") && (
              <div className="flex justify-center gap-0.5">
                {props.jobDetails.role !== "" && (
                  <div className="flex gap-0.5">
                    <div
                      className={`btn btn-primary btn-xs btn-soft ${
                        props.jobDetails.frontend ? "" : "btn-disabled"
                      }`}
                    >
                      Frontend
                    </div>
                    <div
                      className={`btn btn-success btn-xs btn-soft ${
                        props.jobDetails.backend ? "" : "btn-disabled"
                      }`}
                    >
                      Backend
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobHolder;
