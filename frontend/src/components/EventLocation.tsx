import React from "react";
import map from "../assets/map.png";
import img1 from "../assets/Vector-1.png"
import img2 from "../assets/Vector-2.png"
import img3 from "../assets/Vector.png"
const EventLocation = () => {
  return (
    <div className="font-sans"> 
      <div className="col-span-1 text-3xl font-medium">
        <div>Event Location</div>
        <div className="mt-4">
          <img src={map} alt="" />
        </div>
      </div>
      <div>
        <div className="text-3xl mt-5 ">Dream world wide in jakarta</div>
        <div className="max-w-lg mt-2 font-thin ">Dummy location generation model by RSU ... Our approach generates more realistic dummy locations</div>
    </div>
    <div>
        <div className="text-3xl mt-5 ">Share with friends</div>
        <div className="flex flex-row ">
            <img className="fill-black stroke-black" src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
        </div>
    </div>
    </div>
  );
};

export default EventLocation;
