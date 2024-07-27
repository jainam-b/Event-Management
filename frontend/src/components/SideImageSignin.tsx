import React from "react";
import sideimg from "../assets/signin.png";

const Sideimage = () => {
  return (
    <div className="relative h-screen bg-[#F8F8FA] flex justify-end">
      <div className="relative w-5/6 h-full">
        <img
          className="h-full w-full object-cover"
          src={sideimg}
          alt="Side Image"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-4xl font-bold mb-6">WELCOME BACK</h2>
          <h2 className="text-white text-xl font-bold text-center max-w-md px-4">
            To keep connected with us provide us with your information
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Sideimage;
