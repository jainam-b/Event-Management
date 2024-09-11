import { useNavigate } from "react-router-dom";
import backicon from "../assets/Vector (Stroke).png";
import mappin from "../assets/MapPin.svg";

interface EventBannerProps {
  eventId: string;
  img: string;
  name: string;
  description: string;
  startdate: string;
}

const EventBanner: React.FC<EventBannerProps> = ({ eventId, img, name, description, startdate }) => {
  const navigate = useNavigate();

  // Convert startdate to a readable format
  const formattedDate = new Date(startdate).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleEventClick = (eventId: string) => {
    navigate(`/buy-ticket/${eventId}`);
  };

  // Determine font size based on the length of the event name
  const nameLength = name.split(" ").length;
  const nameFontSize = nameLength > 6 ? "text-2xl" : nameLength > 3 ? "text-3xl" : "text-4xl";

  // Determine font size based on the length of the description
  const descriptionLength = description.split(" ").length;
  const descriptionFontSize =
    descriptionLength > 20 ? "text-base" : descriptionLength > 10 ? "text-lg" : "text-xl";

  return (
    <div className="relative flex flex-col justify-center items-center mx-auto  md:h-[80vh] p-4">
      <div className="relative w-full md:h-full rounded-xl md:shadow-lg overflow-hidden">
        {/* Responsive Image */}
        <div className="absolute h-80 md:h-full inset-0 bg-[#00000080]"></div>
        <img className="w-full md:h-full h-80 object-cover" src={img} alt="Banner" />
      </div>

      {/* Back Button */}
      <div className="hidden md:block absolute left-0 top-0 p-6 z-10">
        <button className="bg-purple-500 text-white px-4 py-2 mx-10 m-3 flex items-center rounded-lg">
          <img src={backicon} alt="Back Icon" className="w-2 h-4 mr-2" />
          Back
        </button>
      </div>

      {/* Event Info for larger screens */}
      <div className="absolute hidden md:block left-10 md:left-20 bottom-20 md:bottom-auto max-w-3xl font-sans mx-6 mt-3 text-white z-10">
        <h1 className={`font-semibold mb-8 max-w-xl ${nameFontSize}`}>
          {name}
        </h1>
        <p className={`mt-8 mb-4 ${descriptionFontSize}`}>
          {description}
        </p>
        <button className="mt-4 bg-transparent flex items-center text-white px-3 py-2 rounded-lg">
          <img src={mappin} className="mr-2" alt="Map Pin" /> View map
        </button>
      </div>

      {/* Event Info for mobile screens */}
      <div className="md:hidden text-black w-full text-center p-4 ">
        <h1 className={`font-bold   ${nameFontSize} leading-tight`}>
          {name}
        </h1>
        {/* <p className={`${descriptionFontSize} text-gray-600 leading-normal`}>
          {description}
        </p> */}
      </div>

      {/* Booking Section for Mobile */}
      <div className="fixed bottom-0 left-0 w-full md:hidden bg-white text-black p-6 shadow-lg z-20">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Date & time</h3>
            <p className="mt-2 text-slate-500">{formattedDate}</p>
          </div>
          <button onClick={() => handleEventClick(eventId)} className="bg-purple-500 text-white px-4 py-2 rounded-lg">
            Book now
          </button>
        </div>
      </div>

      {/* Booking Section for Larger Screens */}
      <div className="absolute hidden md:block mx-5 mr-14 right-14 top-1/3 transform -translate-y-[20%] bg-white text-black p-8 rounded-lg shadow-lg w-[25rem] z-10">
        <h3 className="text-3xl font-bold">Date & time</h3>
        <p className="mt-5 text-slate-500">{formattedDate}</p>
        <a href="#" className="text-purple-500 underline mt-4 block">
          Add to calendar
        </a>
        <button onClick={() => handleEventClick(eventId)} className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg w-full">
          Book now
        </button>
        <button className="mt-2 bg-gray-300 text-black px-4 py-2 rounded-lg w-full">
          Program promoter
        </button>
        <p className="mt-4 text-center text-gray-500">No Refunds</p>
      </div>
    </div>
  );
};

export default EventBanner;
