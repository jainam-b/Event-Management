import React from 'react';
import { useEventById } from '../../hooks/event';

const EventDetailPage = (eventId : string ) => {
  const { event, loading, error } = useEventById(eventId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!event) return <div>No event found</div>;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      {/* Render other event details */}
    </div>
  );
};

export default EventDetailPage;
