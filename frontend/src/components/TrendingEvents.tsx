import EventCard from "./EventCard";
import useEvents from "../hooks/event";
import EventCardSkeleton from "./EventCardSketon";

const TrendingEvents = ({ title }: { title: string }) => {
  const { events, loading, error } = useEvents();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      <div className="text-2xl md:text-5xl font-semibold font-sans text-center mb-6">
        {title} <span className="text-[#7848F4]">Event</span>
      </div>

      {/* Grid for Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {events.slice(0, 3).map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            imageURL={
              event.imageUrl ||
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
            }
            free={true} // Update this according to your event's data structure
            title={event.name}
            date={new Date(event.date).toLocaleDateString()}
            description={event.description || "No description available"}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingEvents;
