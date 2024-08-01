import React from "react";

const EventData = () => {
  return (
    <div className=" px-10 font-sans">
      <div className="col-span-1  ">
        <div className="text-3xl font-medium">Description</div>
        <div className="max-w-xl font-thin text-md">
          <div className="mb-4 mt-4 ">
            DesignHub organized a 3D Modeling Workshop using Blender on 16th
            February at 5 PM. The workshop taught participants the magic of
            creating stunning 3D models and animations using Blender. It was
            suitable for both beginners and experienced users. The event was
            followed by a blender-render competition, which added to the
            excitement.
          </div>
          <div>
            DesignHub organized a 3D Modeling Workshop using Blender on 16th
            February at 5 PM. The workshop taught participants the magic of
            creating stunning 3D models and animations using Blender. It was
            suitable for both beginners and experienced users. The event was
            followed by a blender-render competition, which added to the
            excitement.
          </div>
        </div>
        <div>
          <div className="text-3xl font-medium mt-6">Hours</div>
          <div className="mt-3 text-lg font-thin ">
            Weekdays Hours :{" "}
            <span className="text-[#7848F4] font-bold mx-2 "> 7PM - 10PM </span>
          </div>
          <div className="mt-3 text-lg font-thin ">
            Sunday Hours :{" "}
            <span className="text-[#7848F4] font-bold mx-2 "> 7PM - 10PM </span>
          </div>
        </div>
        <div>
        <div className="text-3xl font-medium mt-6">Organizer Contant</div>
        <div className="mt-3 ">Please go to <span  className="text-[#7848F4]">www.sneakypeeks.com</span> and refer the FAQ section for more detail</div>
        </div>
      </div>
      
    </div>
  );
};

export default EventData;
