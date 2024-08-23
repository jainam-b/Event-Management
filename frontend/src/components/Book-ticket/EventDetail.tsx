import { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed
import { BACKEND_URL } from "../../config";
import { getCookie } from "../../utils/cookies";

export interface TicketType {
  id: string;
  name: string;
  price: number;
  totalQuantity: number;
  availableQuantity: number;
}

interface SelectedTicket {
  ticketTypeId: string;
  userId: string;
  quantity: number;
}

interface EventDetailPageProps {
  id: string;
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
  id,
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
  const [bookingFee] = useState(40); // Fixed booking fee

  // Initialize userId state
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve user ID from localStorage
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        setUserId(userData.id);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    } else {
      console.log("User data not found");
    }
  }, []);

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

    if (quantity > 0 && userId) {
      setSelectedTickets((prevSelectedTickets) => {
        const existingTicketIndex = prevSelectedTickets.findIndex(
          (t) => t.ticketTypeId === ticket.id
        );

        if (existingTicketIndex >= 0) {
          const updatedTickets = [...prevSelectedTickets];
          updatedTickets[existingTicketIndex].quantity += quantity;
          return updatedTickets;
        } else {
          return [
            ...prevSelectedTickets,
            { userId, ticketTypeId: ticket.id, quantity },
          ];
        }
      });

      setCurrentQuantities((prevQuantities) => ({
        ...prevQuantities,
        [ticket.id]: 0,
      }));
    }
  };

  const totalAmount = selectedTickets.reduce(
    (total, selectedTicket) =>
      total +
      (ticketTypes.find((ticket) => ticket.id === selectedTicket.ticketTypeId)?.price || 0) *
        selectedTicket.quantity +
      bookingFee * selectedTicket.quantity,
    0
  );
  const token=getCookie("token");
  const handleTicket = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/phase/events/${id}/tickets/assign-phase`,
        selectedTickets,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`, 
          },
        }
      );

      if (response.status === 200) {
        console.log("Tickets assigned successfully:", response.data);
        // Handle success (e.g., show a success message or redirect)
      } else {
        console.error("Failed to assign tickets:", response.data);
        // Handle errors (e.g., show an error message)
      }
    } catch (error) {
      console.error("An error occurred during ticket assignment:", error);
      // Handle errors (e.g., show an error message)
    }
  };

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
              className="relative bg-white border border-gray-300 rounded-lg p-5 shadow-sm"
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
                className="mt-4 w-full bg-[#7848F4] text-white py-2 rounded-md transition-colors"
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
              <div key={selectedTicket.ticketTypeId}>
                <p className="text-lg">
                  <span className="font-semibold">
                    {
                      ticketTypes.find((ticket) => ticket.id === selectedTicket.ticketTypeId)?.name
                    }:
                  </span> ₹
                  {(ticketTypes.find((ticket) => ticket.id === selectedTicket.ticketTypeId)?.price || 0) *
                    selectedTicket.quantity +
                    bookingFee * selectedTicket.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-gray-300 pt-4">
            <p className="text-lg font-semibold text-gray-800">
              Total Amount: ₹{totalAmount.toFixed(2)}
            </p>
            <button
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-md transition-colors"
              onClick={handleTicket}
            >
              Book Tickets
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
