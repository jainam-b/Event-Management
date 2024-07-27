import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AppBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="bg-white  fixed w-full z-20 top-0 start-0  border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href=" /"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-4xl font-semibold whitespace-nowrap ">
              Event <span className="text-[#7848F4]">Hive</span>
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex justify-center items-start flex-col">
              <div className="flex justify-center px-6 text-md"><button onClick={()=>navigate("/signin")}>
              Login  </button></div>
            </div>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-white bg-[#7848F4] hover:bg-[#7848F4]/90 focus:ring-4 focus:ring-[#7848F4]/50 ocus:outline-none focus:ring-[#7848F4] font-medium rounded-xl text-sm px-6 py-2 text-center   "
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppBar;
