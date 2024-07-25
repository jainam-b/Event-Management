import React from "react";

const Auth = () => {
  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="p-10 mr-auto ">
        <div className="text-4xl text-center  font-bold mb-4">
          Event <span className="text-[#7848F4]">Hive</span>{" "}
        </div>
        <div className="text-6xl ">Sign Up to Event Hive</div>
        <div className="">
          <div className="pt-8 ">
            <div className="text-xl pb-4">YOUR NAME</div>
            <input
              type="text"
              id="first_name"
              className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="John"
              required
            />
          </div>
          <div className="pt-4">
            <div className="text-xl pb-4">EMAIL</div>
            <input
              type="text"
              id="first_name"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="example@example.com"
              required
            />
          </div>
          <div className="pt-4">
            <div className="text-xl pb-4"> PASSWORD</div>
            <input
              type="text"
              id="first_name"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="********"
              required
            />
          </div>
          <div className="pt-8 flex justify-center">
            <button
              type="button"
              className="   text-white bg-[#7848F4] hover:bg-[#7848F4]/90 focus:ring-4 focus:ring-[#7848F4]/50 focus:outline-none font-medium rounded-lg text-lg px-20 py-2.5 text-center inline-flex items-center dark:focus:ring-[#7848F4]/50 me-4 mb-4 "
            >
              
              Sign In
            </button>
             
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
