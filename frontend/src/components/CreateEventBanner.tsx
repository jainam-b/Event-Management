import eventBannerImg from '../assets/image 3.png'; // Update the path to your image file
import { useNavigate } from 'react-router-dom';

const CreateEventBanner = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Navigate to the "/create" page
    navigate("/create");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-[#4A148C] text-white p-8 mt-40">
      <img
        src={eventBannerImg}
        alt="Create Event"
        className="w-full md:w-1/3 h-auto mb-4 md:mb-0 md:ml-8"
      />
      <div className="flex flex-col items-center md:items-start w-full md:w-1/3 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold">Make Your Own Event</h2>
        <p className="mt-4 text-base md:text-lg">
        Bring Your Vision to Life with a Custom Event!
        </p>
        <button
          onClick={handleButtonClick}
          className="bg-[#7848F4] hover:bg-[#6C3EDC] text-white font-bold py-2 px-4 w-full md:w-[18.75rem] h-[3.75rem] rounded mt-4"
        >
          Create Events
        </button>
      </div>
    </div>
  );
};

export default CreateEventBanner;
