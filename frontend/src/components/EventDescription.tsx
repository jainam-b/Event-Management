import React from 'react';

// Helper function to format ISO date strings
const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) + ' ' + date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};

interface EventDataProps {
  description: string;
  weekdaysHours: string;
  sundayHours: string;
  organizerContact: string;
}

const EventData: React.FC<EventDataProps> = ({ description, weekdaysHours, sundayHours, organizerContact }) => {
  return (
    <div className="px-10 font-sans">
      {/* Description Section */}
      <div className="col-span-1">
        <div className="text-3xl font-medium">Description</div>
        <div className="max-w-xl font-thin text-md mt-4">
          {description}
        </div>
      </div>

      {/* Hours Section */}
      <div className="mt-6">
        <div className="text-3xl font-medium">Hours</div>
        <div className="mt-3 text-lg font-thin">
          Weekdays Hours: <span className="text-[#7848F4] font-bold mx-2">{formatDateTime(weekdaysHours)}</span>
        </div>
        <div className="mt-3 text-lg font-thin">
          Sunday Hours: <span className="text-[#7848F4] font-bold mx-2">{formatDateTime(sundayHours)}</span>
        </div>
      </div>

      {/* Organizer Contact Section */}
      <div className="mt-6">
        <div className="text-3xl font-medium">Organizer Contact</div>
        <div className="mt-3 text-lg font-thin">
          Please go to <span className="text-[#7848F4]">{organizerContact}</span> and refer to the FAQ section for more details.
        </div>
      </div>
    </div>
  );
};

export default EventData;
