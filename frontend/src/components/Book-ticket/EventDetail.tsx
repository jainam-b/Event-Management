import { useState } from "react";

export interface TicketType {
  id: string;
  name: string;
  price: number;
  totalQuantity: number;
  availableQuantity: number;
}


interface SelectedTicket {
  ticket: TicketType;
  quantity: number;
}

interface EventDetailPageProps {
  id:string,
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
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);
  const [currentQuantities, setCurrentQuantities] = useState<{ [id: string]: number }>({});
  const [bookingFee, setBookingFee] = useState(40);
  console.log(setBookingFee)
  const isFillingFast = (availableQuantity: number, totalQuantity: number) =>
    availableQuantity < totalQuantity * 0.2;

  const handleTicketQuantityChange = (ticketId: string, newQuantity: number) => {
    setCurrentQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketId]: newQuantity,
    }));
  };

  const handleAddTicket = (ticket: TicketType) => {
    const quantity = currentQuantities[ticket.id] || 0;
    if (quantity > 0) {
      setSelectedTickets((prevSelectedTickets) => {
        const existingTicketIndex = prevSelectedTickets.findIndex(
          (t) => t.ticket.id === ticket.id
        );

        if (existingTicketIndex >= 0) {
          const updatedTickets = [...prevSelectedTickets];
          updatedTickets[existingTicketIndex].quantity += quantity;
          return updatedTickets;
        } else {
          return [...prevSelectedTickets, { ticket, quantity }];
        }
      });

      // Reset the quantity after adding
      setCurrentQuantities((prevQuantities) => ({
        ...prevQuantities,
        [ticket.id]: 0,
      }));
    }
  };

  const totalAmount = selectedTickets.reduce(
    (total, selectedTicket) =>
      total + selectedTicket.ticket.price * selectedTicket.quantity + bookingFee * selectedTicket.quantity,
    0
  );

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
      <div
        className={`grid gap-8 ${
          ticketTypes.length === 1
            ? "grid-cols-1"
            : ticketTypes.length === 2
            ? "grid-cols-2"
            : "grid-cols-3"
        }`}
      >
        {ticketTypes.length > 0 ? (
          ticketTypes.map((ticket) => (
            <div
              key={ticket.id}
              className={`relative bg-white border border-gray-300 rounded-lg p-5 shadow-sm`}
            >
              <h3 className="text-xl font-medium text-gray-700 mb-2">{ticket.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-4">
                ₹{ticket.price.toFixed(2)}
              </p>
              {isFillingFast(ticket.availableQuantity, ticket.totalQuantity) && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Filling Fast
                </span>
              )}
              <div className="flex items-center mt-4">
                <button
                  className="bg-gray-200 px-3 py-1 rounded-l-md"
                  onClick={() =>
                    handleTicketQuantityChange(
                      ticket.id,
                      Math.max(0, (currentQuantities[ticket.id] || 0) - 1)
                    )
                  }
                >
                  -
                </button>
                <span className="px-4 py-1 text-center">
                  {currentQuantities[ticket.id] || 0}
                </span>
                <button
                  className="bg-gray-200 px-3 py-1 rounded-r-md"
                  onClick={() =>
                    handleTicketQuantityChange(
                      ticket.id,
                      Math.min(ticket.availableQuantity, (currentQuantities[ticket.id] || 0) + 1)
                    )
                  }
                >
                  +
                </button>
              </div>
              <button
                className="mt-4 w-full bg-[#7848F4] text-white py-2 rounded-md bg-[#7848F4] transition-colors"
                onClick={() => handleAddTicket(ticket)}
              >
                Add
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
      {selectedTickets.length > 0 && (
        <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Selected Tickets:
          </h3>
          <div className="text-gray-700 space-y-3">
            {selectedTickets.map((selectedTicket) => (
              <div key={selectedTicket.ticket.id}>
                <p className="text-lg">
                  <span className="font-semibold">{selectedTicket.ticket.name}:</span> ₹
                  {(selectedTicket.ticket.price * selectedTicket.quantity).toFixed(2)} (x
                  {selectedTicket.quantity})
                </p>
              </div>
            ))}
            <p className="text-lg">
              <span className="font-semibold">Booking Fee:</span> ₹
              {(
                selectedTickets.reduce(
                  (total, selectedTicket) =>
                    total + bookingFee * selectedTicket.quantity,
                  0
                )
              ).toFixed(2)}
            </p>
            <p className="text-xl font-semibold text-gray-900 mt-4">
              Total Amount: ₹{totalAmount.toFixed(2)}
            </p>
          </div>
          <button className="mt-6 w-full bg-[#7848F4] text-white py-3 rounded-md hover:bg-green-700 transition-colors">
            Proceed to Pay ₹{totalAmount.toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
