const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-8 mt-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold">Event <span className="text-purple-500">Hive</span></h2>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="p-2 rounded text-gray-700 mb-4 md:mb-0 md:mr-2"
            />
            <button className="bg-purple-500 text-white px-4 py-2 rounded">Subscribe</button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-purple-800 pt-4 mb-8">
          <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <a href="#" className="px-2 text-sm md:text-base">Home</a>
            <a href="#" className="px-2 text-sm md:text-base">About</a>
            <a href="#" className="px-2 text-sm md:text-base">Services</a>
            <a href="#" className="px-2 text-sm md:text-base">Get in touch</a>
            <a href="#" className="px-2 text-sm md:text-base">FAQs</a>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <a href="#" className="px-2 text-sm md:text-base">English</a>
            <a href="#" className="px-2 text-sm md:text-base">French</a>
            <a href="#" className="px-2 text-sm md:text-base">Hindi</a>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-white text-lg">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-white text-lg">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white text-lg">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm md:text-base">Non Copyrighted © 2023 Upload by EventHive</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
