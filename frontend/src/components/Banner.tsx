import React from 'react';
import banner from "../assets/banner.png";
import SearchBar from './SearchBar';

  const Banner = () => {
    return (
      <div className='relative flex justify-center items-center   mx-auto'>
        <img 
          className='mt-3 w-5/6 h-autos object-contain' 
          src={banner} 
          alt="Banner" 
        />
        <SearchBar />
      </div>
    );
  };

export default Banner;
