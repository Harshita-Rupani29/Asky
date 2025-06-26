import React from "react";
import { Link } from "react-router-dom";

const LandingHero = () => {
  return (
    <div
      className="w-full h-[450px] md:h-[550px] lg:h-[600px] flex flex-col items-center justify-start pt-[70px] md:pt-[100px] lg:pt-[130px] bg-cover bg-center"
       style={{
    backgroundImage: "url('/assets/mask-group2.svg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
    >
      <h1 className="text-white text-[25px] md:text-[40px] lg:text-[55px] font-medium text-center px-4 leading-[35px] md:leading-[45px] lg:leading-[65px] mb-1">
        Cross the Bridge to Educational Enlightenment
      </h1>
      <h4 className="text-white text-[15px] md:text-[22px] lg:text-[25px] font-normal text-center px-2 mb-6 md:mb-9 lg:mb-[55px]">
        Building Connections, Bridging Knowledge Gaps
      </h4>
      <div className="flex flex-col md:flex-row gap-5">
        <Link
          to="/login"
         className="bg-black text-white hover:text-white uppercase font-semibold text-base px-10 py-3 rounded hover:bg-gray-800 text-center"
        >
          Get Started
        </Link>
        <Link
          to="/questions"
          className="bg-transparent border border-white text-white uppercase font-semibold text-base px-10 py-3 rounded hover:bg-white hover:text-black text-center"
        >
          Guest Mode
        </Link>
      </div>
    </div>
  );
};

export default LandingHero;
