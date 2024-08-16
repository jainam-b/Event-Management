import React from 'react';
import { Link } from 'react-router-dom';

interface EventCardProps {
  id: string;
  imageURL: string;
  free?: boolean;
  title: string;
  date: string;
  time: string;
  description?: string;
}

const EventCard: React.FC<EventCardProps> = ({ id, imageURL, free, title, date, description }) => {
  return (
    <Link to={`/event/${id}`}>
      <div className="w-128 h-[22rem] bg-white rounded-lg shadow-md overflow-hidden mt-10 mx-5">
        <div className="p-4 flex flex-col h-full">
          <div className="relative">
            <img src={imageURL} alt={title} className="w-full h-48 object-cover rounded-lg" />
            {free && (
              <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-bold">FREE</span>
            )}
          </div>
          <div className="mt-4 flex flex-col flex-grow">
            <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>
            <p className="text-purple-600 text-sm mt-2">{date}</p>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2 flex-grow">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;