import Image from "next/image";
import React from "react";
import NavBar from "./navbar";

const Hero = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <NavBar></NavBar>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8  m-4">
        {/* bg-[url('/pai.jpeg')] bg-cover */}

        <div className=" border-10 border-white h-fit rounded-2xl">
          <Image
            src="/pai.jpeg"
            alt="Logo"
            width={500}
            height={20}
            className="rounded-2xl"
          />
        </div>
        <div className="flex flex-col gap-6 sm:gap-8 ">
          <h1 className="text-5xl sm:text-8xl font-bold">Pranav Yadav</h1>
          <p className="text-2xl sm:text-4xl font-serif">
            Blending structure with creativity.
          </p>

          <div className="flex flex-col gap-0 font-mono text-xl/12 sm:text-4xl/22">
            <p className="  0">
              <span className="bg-linear-to-r from-[#355794] to-[#708ec8] p-2 sm:p-4  text-white rounded-md font-bold">
                Full stack developer
              </span>{" "}
              with a
            </p>
            <p className=" 0">
              <span className="bg-linear-to-r from-[#355794] to-[#708ec8] p-2 sm:p-4 text-white rounded-md font-bold">
                Product Mindset
              </span>{" "}
              from India
            </p>
          </div>
          {/* <p className="text-2xl font-serif">
            Software Engineer | 0-1 Development
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
