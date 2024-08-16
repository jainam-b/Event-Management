
import EventCard from "./EventCard";
 
import useEvents from "../hooks/event";
import {  useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
const UpcommingEvents = () => {
  const { events, loading, error } = useEvents();
  const navigate=useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center flex-col h-screen ">
        <div className="flex justify-center">
          <div>
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <div className="text-5xl font-semibold font-sans whitespace-nowrap ">
        Upcoming <span className="text-[#7848F4]">Event</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4p">
         
       {events.slice(0,6).map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            imageURL={
              event.imageUrl ||
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
            } // Provide a default image URL if none is available
            free={true} // Update this according to your event's data structure
            title={event.name}
            date={new Date(event.date).toLocaleDateString()}
            time={new Date(event.startTime).toLocaleTimeString()}
            description={event.description || "No description available"}
          />
        ))}
         
      </div>
      <div className="flex items-center justify-center  ">
  <div>
    <button type="submit" className="mt-10 flex justify-center items-center bg-[#7848F4] text-white py-2 px-4 text-xl rounded" onClick={()=>{navigate("/events")}}>
      Load More ..
    </button>
  </div>
</div>

    </div>
  );
};

export default UpcommingEvents;
