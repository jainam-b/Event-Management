
import AppBar from "../components/AppBar";
import AllEventsBanner from "../components/AllEventsBanner";
import EventCard from "../components/EventCard";
;
import useEvents from "../hooks/event";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";

const AllEvents = () => {
  const { events, loading, error } = useEvents();
  console.log(events)
  if (loading)
    return (
      <p>
        {" "}
        <div className="flex justify-center flex-col h-screen ">
          <div className="flex justify-center">
            <div>
              <Spinner />
            </div>
          </div>
        </div>
      </p>
    );
  if (error) return <p>Error loading events: {error.message}</p>;

  return (
    <div>
      <AppBar />
      <AllEventsBanner />

      <div className="flex">
        <div className="text-5xl pt-12 mt-10 px-8 font-semibold font-sans whitespace-nowrap">
          <span className="text-[#7848F4]"> Events </span> around you
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
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
      <Footer/>
    </div>
  );
};

export default AllEvents;
