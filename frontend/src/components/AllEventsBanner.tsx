import React from "react";
import img from "../assets/allevents.png";
const AllEventsBanner = () => {
  return (
    <div className="grid grid-cols-2 mt-10">
       <div className="flex flex-col md:flex-row items-center md:justify-between p-6 mx-5">
      <div className="text-center md:text-left">
        <p className="text-gray-500">Thriving Above Event Expectations.</p>
        <h1 className="text-7xl font-bold mt-4">
          Event<span className="text-[#7848F4]">Hive</span>-ing the Best. Day.<br />Ever.
        </h1>
        <div className="flex justify-center md:justify-start space-x-4 mt-8">
          <div className="bg-purple-500 text-white py-4 px-8 rounded-lg shadow-md">
            <p className="text-2xl font-bold">2k+</p>
            <p>Total Events Hosted</p>
          </div>
          <div className="bg-purple-500 text-white py-4 px-8 rounded-lg shadow-md">
            <p className="text-2xl font-bold">100+</p>
            <p>Total Events Live</p>
          </div>
        </div>
      </div>
      </div>
      <div className="ml-10">
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default AllEventsBanner;
