import React from 'react';
import eventImg from "../assets/card.png";
import { Link } from 'react-router-dom';

interface EventCardProps {
    id:string
    imageURL: string;
    free?: boolean;
    title: string;
    date: string;
    time: string;
    description?: string;
  }

  const EventCard: React.FC<EventCardProps> = ({ id, imageURL, free, title, date, time, description }) => {
  return (
    <Link to={`/event/${id}`}>
    <div className="w-128   h-full max-h-[28rem] mb-4  bg-white rounded-lg shadow-md overflow-hidden mt-10 mx-5">
      <div className="p-4 pb-6">
        <div className="mt-2">
          <div className="relative ">
            <img src={imageURL} alt="Event crowd with pink flags" className="w-full  rounded-lg object-cover" />
            {free && (
              <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-bold">FREE</span>
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-purple-600 text-sm mt-4">{date}</p>
            <p className="text-gray-600 text-sm mt-4">{description}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default EventCard;
