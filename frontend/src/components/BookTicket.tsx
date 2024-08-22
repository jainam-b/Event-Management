import React from "react";
import AppBar from "./AppBar";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useEventById } from "../hooks/event";
import EventDetailPage from "./Book-ticket/EventDetail";

const BookTicket: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  if (!eventId) {
    return <div>Error: Event ID is missing</div>;
  }

  const { event, loading, error } = useEventById(eventId);
  console.log(event);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  if (error) return <div>Error: {error.message}</div>;
  if (!event) return <div>No event found</div>;
  

  return (
    <div>
      <AppBar />
      {/* <Heading eventTitle={event.name} /> */}
      
      <EventDetailPage 
        id={event.id}
        eventName={event.name}
        imageUrl={event.imageUrl || ""}
        eventDescription={event.description || ""}
        eventLocation={event.location}
        eventDate={event.date}
        startTime={event.startTime}
        endTime={event.endTime}
        ticketTypes={event.ticketTypes.map((ticket, index) => ({
          ...ticket,
          id: `ticket-${index}`
        }))} 
      />
    </div>
  );
};

export default BookTicket;


