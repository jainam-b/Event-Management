import React from "react";

const Auth = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-[#F8F8FA] ">
      <div className="p-10 mx-auto  ">
        <div className="text-4xl text-center  font-bold mb-8">
          Event <span className="text-[#7848F4]">Hive</span>{" "}
        </div>
        <div className="text-6xl ">Sign In to Event Hive</div>
        <div className="">
          
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
          <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="w-3/4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-[#7848F4] hover:bg-[#7848F4]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7848F4]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Auth;
