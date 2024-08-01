import React from "react";
import EventCard from "./EventCard";
import eventImg from "../assets/card.png"
import eventImg2 from "../assets/image3.png"
const UpcommingEvents = ({title}:{title:string}) => {
  return (
    <div>
      <div className="text-5xl ml-5 font-semibold font-sans whitespace-nowrap ">
        {title} <span className="text-[#7848F4]">Event</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4p">
         <EventCard
          imageURL={eventImg}
          free={true}
          title="BestSeller Book Bootcamp - Write, Market & Publish Your Book - Lucknow"
          date="Saturday, March 18"
          time="9:30PM"
          description="ONLINE EVENT - Attend anywhere"
        />
         <EventCard
          imageURL={eventImg}
          free={true}
          title="BestSeller Book Bootcamp - Write, Market & Publish Your Book - Lucknow"
          date="Saturday, March 18"
          time="9:30PM"
          description="ONLINE EVENT - Attend anywhere"
        />
         <EventCard
          imageURL={eventImg}
          free={true}
          title="BestSeller Book Bootcamp - Write, Market & Publish Your Book - Lucknow"
          date="Saturday, March 18"
          time="9:30PM"
          description="ONLINE EVENT - Attend anywhere"
        />
          
      
         
      </div>
    </div>
  );
};

export default UpcommingEvents;