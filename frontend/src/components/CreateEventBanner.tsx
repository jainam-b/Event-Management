import React from 'react';
import eventBannerImg from '../assets/image 3.png'; // Update the path to your image file

const CreateEventBanner = () => {
  return (
    <div className="flex h-[15.75rem] items-center justify-between bg-[#4A148C] text-white p-8   mt-40 ">
      <img src={eventBannerImg} alt="Create Event" className="w-1/3 ml-[7rem] mb-[5.625rem]  " />
      <div className="flex flex-col  mr-[20.5rem] w-1/3">
        <h2 className="text-5xl font-bold">Make your own Event</h2>
        <p className="mt-4 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button className="bg-[#7848F4] hover:bg-[#6C3EDC] text-white font-bold py-2 px-4 w-[18.75rem] h-[3.75rem] rounded mt-4">
          Create Events
        </button>
      </div>
       
      
    </div>
  );
};

export default CreateEventBanner;
