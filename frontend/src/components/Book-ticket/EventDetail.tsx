import React, { useState } from "react";

interface TicketType {
  id: string;
  name: string;
  price: number;
  availableQuantity: number;
  totalQuantity: number;
}

interface EventDetailPageProps {
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  imageUrl: string;
  ticketTypes: TicketType[];
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({
  eventName,
  eventDescription,
  eventLocation,
  eventDate,
  startTime,
  endTime,
  imageUrl,
  ticketTypes,
}) => {
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [bookingFee, setBookingFee] = useState(40);

  // Determine if "Filling Fast" should be shown
  const isFillingFast = (availableQuantity: number, totalQuantity: number) =>
    availableQuantity < totalQuantity * 0.2;

  const handleTicketSelection = (ticket: TicketType) => {
    setSelectedTicket(ticket);
  };

  const totalAmount = selectedTicket
    ? selectedTicket.price + bookingFee
    : 0;

  return (
    <div className="max-w-5xl mx-auto my-12 px-6 py-8">
      {/* Event Banner */}
      <div className="relative mb-12 rounded-lg overflow-hidden shadow-lg">
        <img
          src={imageUrl}
          alt="Event Banner"
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6">
          <h1 className="text-5xl font-bold text-white mb-2">{eventName}</h1>
          <p className="text-lg text-gray-200 mb-4">{eventDescription}</p>
          <div className="text-gray-300 space-y-2">
            <p className="flex items-center">
              <span className="font-semibold mr-2">📍 Location:</span> {eventLocation}
            </p>
            <p className="flex items-center">
              <span className="font-semibold mr-2">📅 Date:</span> {new Date(eventDate).toLocaleDateString()}
            </p>
            <p className="flex items-center">
              <span className="font-semibold mr-2">🕒 Time:</span> {new Date(startTime).toLocaleTimeString()} - {new Date(endTime).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* Ticket Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ticketTypes.length > 0 ? (
          ticketTypes.map((ticket) => (
            <div
              key={ticket.id}
              className={`relative bg-white border border-gray-300 rounded-lg p-5 shadow-sm transform transition-transform ${
                selectedTicket?.id === ticket.id ? "scale-105 border-blue-500" : ""
              }`}
              onClick={() => handleTicketSelection(ticket)}
            >
              <h3 className="text-xl font-medium text-gray-700 mb-2">{ticket.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-4">
                ₹ {ticket.price.toFixed(2)}
              </p>
              {isFillingFast(ticket.availableQuantity, ticket.totalQuantity) && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Filling Fast
                </span>
              )}
              <button className="mt-auto w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                {selectedTicket?.id === ticket.id ? "Selected" : "Select"}
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-6">
            <p className="text-lg text-gray-500">No tickets available</p>
          </div>
        )}
      </div>

      {/* Ticket Summary */}
      {selectedTicket && (
        <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Selected Ticket: {selectedTicket.name}
          </h3>
          <div className="text-gray-700 space-y-3">
            <p className="text-lg">
              <span className="font-semibold">Price:</span> ₹ {selectedTicket.price.toFixed(2)}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Booking Fee:</span> ₹ {bookingFee.toFixed(2)}
            </p>
            <p className="text-xl font-semibold text-gray-900 mt-4">
              Total Amount: ₹ {totalAmount.toFixed(2)}
            </p>
          </div>
          <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors">
            Proceed to Pay ₹ {totalAmount.toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
