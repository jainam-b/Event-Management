import React from 'react';
import { useParams } from 'react-router-dom';
import AppBar from './AppBar';
import EventBanner from './EventBanner';
import EventDescription from './EventDescription';
import EventLocation from './EventLocation';
import Footer from './Footer';
import TrendingEvents from './TrendingEvents';
import { useEventById } from '../hooks/event';
import Spinner from './Spinner';

const EventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  if (!eventId) {
    return <div>Error: Event ID is missing</div>;
  }
  const { event, loading, error } = useEventById(eventId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col px-4 ">
      <AppBar />
      {event ? (
        <>
          {/* Event Banner */}
          <div className="flex justify-center items-center">
            <EventBanner 
              img={event.imageUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"} 
              eventId={event.id}
              name={event.name || 'No description available'}
              description={event.description || 'No description available'}
              startdate={event.startTime || 'No hours available'}
            />
          </div>

          {/* Event Details (Description and Location) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 flex-grow">
            <EventDescription
              description={event.description || 'No description available'}
              weekdaysHours={event.startTime || 'No hours available'}
              sundayHours={event.endTime || 'No hours available'}
              organizerContact={event.organizer || 'No contact available'}
            />
            <div className="flex items-center justify-center">
              <EventLocation />
            </div>
          </div>
        </>
      ) : (
        <div className="flex-grow flex items-center justify-center">No event found</div>
      )}

      {/* Trending Events Section */}
      <div className="mt-20 md:px-4">
        <TrendingEvents title="Other" />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EventPage;
