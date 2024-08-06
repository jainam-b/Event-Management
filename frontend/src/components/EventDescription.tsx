import React from 'react';

interface EventDataProps {
  description: string;
  weekdaysHours: string;
  sundayHours: string;
  organizerContact: string;
}

const EventData: React.FC<EventDataProps> = ({ description, weekdaysHours, sundayHours, organizerContact }) => {
  return (
    <div className="px-10 font-sans">
      <div className="col-span-1">
        <div className="text-3xl font-medium">Description</div>
        <div className="max-w-xl font-thin text-md">
          <div className="mb-4 mt-4">{description}</div>
        </div>
        <div>
          <div className="text-3xl font-medium mt-6">Hours</div>
          <div className="mt-3 text-lg font-thin">
            Weekdays Hours: <span className="text-[#7848F4] font-bold mx-2">{weekdaysHours}</span>
          </div>
          <div className="mt-3 text-lg font-thin">
            Sunday Hours: <span className="text-[#7848F4] font-bold mx-2">{sundayHours}</span>
          </div>
        </div>
        <div>
          <div className="text-3xl font-medium mt-6">Organizer Contact</div>
          <div className="mt-3">
            Please go to <span className="text-[#7848F4]">{organizerContact}</span> and refer to the FAQ section for more details.
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventData;
