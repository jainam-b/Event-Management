import React from 'react';
import AppBar from '../components/AppBar';
import AllEventsBanner from '../components/AllEventsBanner';
import EventCard from '../components/EventCard';
import useEvents from '../hooks/event';
import Footer from '../components/Footer';
import EventCardSkeleton from '../components/EventCardSketon'; // Correct import for skeleton

const AllEvents = () => {
  const { events, loading, error } = useEvents();
  
  // Display error message if there's an error
  if (error) {
    return (
      <div>
        <AppBar />
        <AllEventsBanner />
        <div className="flex justify-center items-center h-screen">
          <p>Error loading events: {error.message}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <AppBar />
      <AllEventsBanner />

      <div className="flex">
        <div className="text-5xl pt-12 mt-10 px-8 font-semibold font-sans whitespace-nowrap">
          <span className="text-[#7848F4]">Events</span> around you
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
        {loading && events.length === 0 ? (
          // Show skeletons while loading
          <>
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </>
        ) : events.length === 0 ? (
          // Show no events message
          <p>No events available.</p>
        ) : (
          // Show event cards
          events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              imageURL={
                event.imageUrl ||
                'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D'
              }
              free={true} // Adjust based on event data
              title={event.name}
              date={new Date(event.date).toLocaleDateString()}
              description={event.description || 'No description available'}
            />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllEvents;
