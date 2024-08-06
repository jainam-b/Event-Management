import React from "react";
import backicon from "../assets/Vector (Stroke).png";
import mappin from "../assets/MapPin.svg";

interface EventBannerProps {
  img: string;
  name: string;
  description: string;
  startdate: string;
}

const EventBanner: React.FC<EventBannerProps> = ({ img, name, description, startdate }) => {
  return (
    <div className="relative flex justify-center items-center mx-auto h-[80vh] p-4">
      <div className="relative w-full h-full rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-[#00000080]"></div>
        <img className="w-full h-full object-cover" src={img} alt="Banner" />
      </div>
      <div className="absolute left-0 top-0 p-6 z-10">
        <button className="bg-purple-500 text-white px-4 py-2 mx-10 m-3 flex items-center rounded-lg">
          <img src={backicon} alt="Back Icon" className="w-2 h-4 mr-2" />
          Back
        </button>
      </div>
      <div className="absolute left-10 max-w-3xl font-sans mx-6 mt-3 text-white z-10">
        <h1 className="text-6xl font-semibold mb-8 max-w-xl">
          {name}
        </h1>
        <p className="mt-8 mb-4 text-xl">
          {description}
        </p>
        <button className="mt-4 bg-transparent flex items-center text-white px-3 py-2 rounded-lg">
          <img src={mappin} className="mr-2" alt="Map Pin" /> View map
        </button>
      </div>
      <div className="absolute mx-5 mr-14 right-14 top-1/3 transform -translate-y-[20%] bg-white text-black p-8 rounded-lg shadow-lg w-[25rem] z-10">
        <h3 className="text-3xl font-bold">Date & time</h3>
        <p className="mt-5 text-slate-500">{startdate}</p>
        <a href="#" className="text-purple-500 underline mt-4 block">
          Add to calendar
        </a>
        <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg w-full">
          Book now
        </button>
        <button className="mt-2 bg-gray-300 text-black px-4 py-2 rounded-lg w-full">
          Program promoter
        </button>
        <p className="mt-4 text-center text-gray-500">No Refunds</p>
      </div>
    </div>
  );
};

export default EventBanner;
