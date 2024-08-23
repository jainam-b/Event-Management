import React from "react";
import AppBar from "./AppBar";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useEventById } from "../hooks/event";
import EventDetailPage from "./Book-ticket/EventDetail";

interface TicketType {
  name: string;
  price: number;
  totalQuantity: number;
  availableQuantity: number;
  id?: string; // Marked as optional
}

const BookTicket: React.FC = () => {
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

  if (error) return <div>Error: {error.message}</div>;

  if (!event) return <div>No event found</div>;

  console.log("++++++++++", event);

  return (
    <div>
      <AppBar />
      <EventDetailPage 
        id={event.id}
        eventName={event.name}
        imageUrl={event.imageUrl || ""}
        eventDescription={event.description || ""}
        eventLocation={event.location}
        eventDate={event.date}
        startTime={event.startTime}
        endTime={event.endTime}
        ticketTypes={event.ticketTypes.map((ticket: TicketType, index) => ({
          ...ticket,
          id: ticket.id || `ticket-${index}` // Generate a fallback id if not present
        }))}
      />
    </div>
  );
};

export default BookTicket;
