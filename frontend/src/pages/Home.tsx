import  { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Banner from "../components/Banner";
import UpcommingEvents from "../components/UpcommingEvents";
import CreateEventBanner from "../components/CreateEventBanner";
import Footer from "../components/Footer";
import TrendingEvents from "../components/TrendingEvents";
import { getCookie } from "../utils/cookies";
import SignupModal from "../components/SignupModal";

const Home = () => {
  const [isAuthenticated ,setIsAuthenticated] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  console.log(isAuthenticated);
  
  useEffect(() => {
    const token = getCookie('token');
    setIsAuthenticated(!!token);

    if (!token) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 10000); // Show modal after 10 seconds

      return () => clearTimeout(timer); // Clear timer on unmount
    }
  }, []);
  return (
    <div className=" ">
      {showModal && <SignupModal onClose={() => setShowModal(false)} />}
      <div>
        <div className=" ">
           
          <AppBar /> 
        </div>
        <div className="">
          <Banner />
          {/* <MobileBanner/> */}
        </div>
        <div className="mt-32 md:px-40 ">
          <UpcommingEvents />
        </div>
        <div className="mt-10"><CreateEventBanner/></div>
        <div className="mt-32 md:px-40 ">
          <TrendingEvents  title={"Trending"}/>
        </div>
        <div className="mt-10" ><Footer/></div>
      </div>
    </div>
  );
};

export default Home;
