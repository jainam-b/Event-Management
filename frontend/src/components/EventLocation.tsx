import React from "react";
import map from "../assets/map.png";
import facebook from "../assets/facebook.png"
import insta from "../assets/insta.png"
import whatsapp from "../assets/whatsapp.png"
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
            <img className=" " src={facebook} alt="" />
            <img src={insta} alt="" />
            <img src={whatsapp} alt="" />
        </div>
    </div>
    </div>
  );
};

export default EventLocation;
