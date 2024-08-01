import React from "react";
import AppBar from "./AppBar";
import EventBanner from "./EventBanner";
import bannerimg from "../assets/card.png";
import EventDescription from "./EventDescription";
import EventLocation from "./EventLocation";
import Footer from "./Footer";
import TrendingEvents from "./TrendingEvents";

const EventPage = () => {
  return (
    <div>
      <div>
        <AppBar />
      </div>

      <EventBanner img={bannerimg} />
      <div className="grid grid-cols-2    ">
        <div>
          <EventDescription />
        </div>
        <div>
          <EventLocation />
        </div>
      </div>
      <div className="mt-20 mr-10  ">

      <TrendingEvents title={"Other"} />
      </div>
      <Footer/>
    </div>
  );
};

export default EventPage;
