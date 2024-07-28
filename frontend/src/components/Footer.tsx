import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-4xl font-bold">Event <span className="text-purple-500">Hive</span></h2>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <input 
              type="email" 
              placeholder="Enter your mail" 
              className="p-2 rounded text-gray-700 mb-4 md:mb-0 md:mr-2"
            />
            <button className="bg-purple-500 text-white px-4 py-2 rounded">Subscribe</button>
          </div>
        </div>
        <div className="flex justify-center md:justify-between items-center mt-8 border-t border-purple-800 pt-4">
          <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <a href="#" className="px-2">Home</a>
            <a href="#" className="px-2">About</a>
            <a href="#" className="px-2">Services</a>
            <a href="#" className="px-2">Get in touch</a>
            <a href="#" className="px-2">FAQs</a>
          </div>
          <div className="flex items-center mb-4 md:mb-0">
            <a href="#" className="px-2">English</a>
            <a href="#" className="px-2">French</a>
            <a href="#" className="px-2">Hindi</a>
          </div>
        </div>
        <div className="flex justify-center md:justify-between items-center mt-4">
          <div className="flex space-x-4">
            <a href="#" className="text-white">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
          <div className="text-center md:text-right mt-4 md:mt-0">
            <p>Non Copyrighted © 2023 Upload by EventHive</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
