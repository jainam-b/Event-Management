import React from "react";
import AppBar from "../components/AppBar";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import UpcommingEvents from "../components/UpcommingEvents";
import CreateEventBanner from "../components/CreateEventBanner";
import Footer from "../components/Footer";
import TrendingEvents from "../components/TrendingEvents";

const Home = () => {
  return (
    <div className=" ">
      <div>
        <div className=" ">
          {" "}
          <AppBar />{" "}
        </div>
        <div className="">
          <Banner />
        </div>
        <div className="mt-32 px-40 ">
          <UpcommingEvents />
        </div>
        <div className="mt-10"><CreateEventBanner/></div>
        <div className="mt-32 px-40 ">
          <TrendingEvents  title={"Trending"}/>
        </div>
        <div className="mt-10" ><Footer/></div>
      </div>
    </div>
  );
};

export default Home;
