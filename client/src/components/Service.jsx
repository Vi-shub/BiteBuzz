import React from "react";
import chef from "../assets/chef.png";
const Service = () => {
  return (
    <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
      <div className="container mx-auto py-[2vh]">
        <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center">
          <img src={chef} alt="" className="h-[32rem] mx-auto justify-end" />
          <div className="w-full md:w-[32rem] flex flex-col space-y-6">
            <div className="text-2xl mmd:text-3xl font-bold text-[#2e2e2e] lg:text-4xl">
              We are <span className="text-[#f54748]"> more</span> than{" "}
              <span className="text-[#fdc55e]"> multiple </span> service
            </div>
            <div className="lg:text-lg text-[#191919] md:text-base text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              praesentium aspernatur numquam itaque. Quidem deserunt commodi
              qui, ratione aspernatur perferendis.
            </div>
            <div className="flex gap-8 items-center">
            <button className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow--xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white">
              About us
            </button>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
