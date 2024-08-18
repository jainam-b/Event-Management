import React from 'react';
import AppBar from './AppBar';
import EventBanner from './EventBanner';

import EventDescription from './EventDescription';
import EventLocation from './EventLocation';
import Footer from './Footer';
import TrendingEvents from './TrendingEvents'; // Ensure this is correctly imported
import useEvents from '../hooks/event';
import Spinner from './Spinner';

const EventPage: React.FC = () => {
  const { events, loading, error } = useEvents();

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

  // Assuming events is an array and we're displaying the first event for simplicity
  const event = events[0];

 
  return (
    <div>
      <AppBar />
 
     {event && (
       <EventBanner  img={ 
        event.imageUrl ||
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
      } 
        eventId={event.id}
       name={event.name || 'No description available'}
       description={event.description || 'No description available'}
       startdate={event.startTime || 'No hours available'} /> 
     )}
      <div className="grid grid-cols-2">
        <div>
          {event && ( 
            <EventDescription
              description={event.description || 'No description available'}
              weekdaysHours={event.startTime || 'No hours available'}
              sundayHours={event.endTime || 'No hours available'}
              organizerContact={event.organizer || 'No contact available'}
            />
          )}
        </div>
        <div>
          <EventLocation />
        </div>
      </div>
      <div className="mt-20 mr-10">
        <TrendingEvents title="Other"  />
      </div>
      <Footer />
    </div>
  );
};

export default EventPage;
