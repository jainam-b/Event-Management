import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);
  const [currentQuantities, setCurrentQuantities] = useState<{ [id: string]: number }>({});
  const [bookingFee] = useState(40); // Fixed booking fee

  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
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
    console.log("clicked");

    const quantity = currentQuantities[ticket.id] || 0;

    if (quantity > 0 && userId) {
      setSelectedTickets((prevSelectedTickets) => {
        const existingTicketIndex = prevSelectedTickets.findIndex(
          (t) => t.ticketTypeId === ticket.id
        );

        if (existingTicketIndex >= 0) {
          const updatedTickets = [...prevSelectedTickets];
          updatedTickets[existingTicketIndex].quantity += quantity;
          console.log('Updated Tickets:', updatedTickets); // Debugging line
          return updatedTickets;
        } else {
          const newTickets = [
            ...prevSelectedTickets,
            { userId, ticketTypeId: ticket.id, quantity },
          ];
          console.log('New Tickets:', newTickets); // Debugging line
          return newTickets;
        }
      });

      setCurrentQuantities((prevQuantities) => ({
        ...prevQuantities,
        [ticket.id]: 0,
      }));
    }
  };

  useEffect(() => {
    console.log('Selected Tickets:', selectedTickets); // Debugging line
  }, [selectedTickets]);

  const totalAmount = selectedTickets.reduce(
    (total, selectedTicket) =>
      total +
      (ticketTypes.find((ticket) => ticket.id === selectedTicket.ticketTypeId)?.price || 0) *
        selectedTicket.quantity +
      bookingFee * selectedTicket.quantity,
    0
  );

  const handleTicket = async () => {
    setLoading(true); // Start loading
    try {
      console.log("Sending request with selected tickets:", selectedTickets);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/phase/events/${id}/tickets/assign-phase`,
        selectedTickets,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Tickets assigned successfully:", response.data);
        const ticketsParam = encodeURIComponent(JSON.stringify(response.data));
        navigate(`/ticket?tickets=${ticketsParam}`);
      } else {
        console.error("Failed to assign tickets:", response.data);
        // Handle errors (e.g., show an error message)
      }
    } catch (error) {
      console.error("An error occurred during ticket assignment:", error);
      // Handle errors (e.g., show an error message)
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-12 px-6 py-8">
      {loading && <Spinner />}
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
                className="mt-4 w-full bg-[#7848F4] text-white py-2 rounded-md hover:bg-[#5E30C9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5E30C9]"
                onClick={() => handleAddTicket(ticket)}
              >
                Add
              </button>
            </div>
          ))
        ) : (
          <p>No tickets available</p>
        )}
      </div>

      {/* Selected Tickets Summary */}
      {selectedTickets.length > 0 && (
        <div className="mt-10 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Your Selected Tickets</h2>
          {selectedTickets.map((ticket, index) => {
            const ticketType = ticketTypes.find(
              (type) => type.id === ticket.ticketTypeId
            );
            return (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <div>
                  <h3 className="text-lg font-semibold">{ticketType?.name}</h3>
                  <p>Quantity: {ticket.quantity}</p>
                  <p>
                    Subtotal: ₹
                    {(ticketType?.price || 0) * ticket.quantity + bookingFee * ticket.quantity}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSelectedTickets((prev) =>
                      prev.filter((t) => t.ticketTypeId !== ticket.ticketTypeId)
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div className="flex justify-between items-center mt-6">
            <p className="text-xl font-bold">Total Amount: ₹{totalAmount.toFixed(2)}</p>
            <button
              className="bg-[#7848F4] text-white px-6 py-3 rounded-md hover:bg-[#5E30C9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5E30C9]"
              onClick={handleTicket}
              disabled={loading} // Disable button when loading
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
