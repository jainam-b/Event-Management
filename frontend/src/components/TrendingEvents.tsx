import EventCard from "./EventCard";
import useEvents from "../hooks/event";
import EventCardSkeleton from "./EventCardSketon";
const TrendingEvents = ({title}:{title:string}) => {
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
    <div>
      <div className="text-2xl md:text-5xl ml-5 font-semibold font-sans whitespace-nowrap ">
        {title} <span className="text-[#7848F4]">Event</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {events.slice(0,3).map((event) => (
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
            // time={new Date(event.startTime).toLocaleTimeString()}
            description={event.description || "No description available"}
          />
        ))}
       
          
      
         
      </div>
    </div>
  );
};

export default TrendingEvents;
