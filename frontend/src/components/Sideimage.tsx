import React from 'react';
import sideimg from "../assets/signupimage.png";

const Sideimage = () => {
  return (
    <div className="relative h-screen flex justify-start">
      <img className="h-full w-4/6 object-cover" src={sideimg} alt="Side Image" />
    </div>
  );
};

export default Sideimage;
