import React from "react";

interface TicketType {
  id: string;
  name: string;
  price: number;
  availableQuantity: number;
  totalQuantity: number; // Ensure this is included
}

interface EventDetailPageProps {
  eventId: string;
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  ticketTypes: TicketType[];
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({
  eventName,
  eventDescription,
  eventLocation,
  eventDate,
  startTime,
  endTime,
  ticketTypes,
}) => {
  return (
    <div className="event-detail-page">
      <h1>{eventName}</h1>
      <p>{eventDescription}</p>
      <p><strong>Location:</strong> {eventLocation}</p>
      <p><strong>Date:</strong> {new Date(eventDate).toLocaleDateString()}</p>
      <p><strong>Start Time:</strong> {new Date(startTime).toLocaleTimeString()}</p>
      <p><strong>End Time:</strong> {new Date(endTime).toLocaleTimeString()}</p>
      
      <div className="ticket-types">
        <h2>Available Ticket Types</h2>
        {ticketTypes.length > 0 ? (
          ticketTypes.map(ticket => (
            <div key={ticket.id} className="ticket-type-card">
              <h3>{ticket.name}</h3>
              <p>Price: ${ticket.price}</p>
              <p>Available Quantity: {ticket.availableQuantity}</p>
              <p>Total Quantity: {ticket.totalQuantity}</p>
            </div>
          ))
        ) : (
          <p>No tickets available</p>
        )}
      </div>
    </div>
  );
};

export default EventDetailPage;
