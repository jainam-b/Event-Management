import EventCard from "./EventCard";
import useEvents from "../hooks/event";
import { useNavigate } from "react-router-dom";
import EventCardSkeleton from "./EventCardSketon";

const UpcomingEvents = () => {
  const { events, loading, error } = useEvents();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl md:text-5xl font-semibold font-sans text-center">
        Upcoming <span className="text-[#7848F4]">Event</span>
      </div>
      {/* Grid for Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 justify-center">
        {events.slice(0, 6).map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            imageURL={
              event.imageUrl ||
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
            }
            free={true} // Adjust based on event data
            title={event.name}
            date={new Date(event.date).toLocaleDateString()}
            description={event.description || "No description available"}
          />
        ))}
      </div>
      {/* Load More Button */}
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="mt-10 bg-[#7848F4] text-white py-2 px-6 text-xl rounded"
          onClick={() => navigate("/events")}
        >
          Load More ..
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;
