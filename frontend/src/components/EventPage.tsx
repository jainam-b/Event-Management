import React from 'react';
import AppBar from './AppBar';
import EventBanner from './EventBanner';
import bannerimg from '../assets/card.png';
import EventDescription from './EventDescription';
import EventLocation from './EventLocation';
import Footer from './Footer';
import TrendingEvents from './TrendingEvents'; // Ensure this is correctly imported
import useEvents from '../hooks/event';

const EventPage: React.FC = () => {
  const { events, loading, error } = useEvents();

  if (loading) {
    return <div>Loading...</div>;
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
       <EventBanner  img={bannerimg} 
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
        <TrendingEvents title="Other" events={events} />
      </div>
      <Footer />
    </div>
  );
};

export default EventPage;
