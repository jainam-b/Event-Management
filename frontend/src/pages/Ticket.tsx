import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { TicketType } from "@jainam-b/event-comman/dist";

const Ticket = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const ticketsParam = query.get("tickets");

  const [tickets, setTickets] = useState<{ ticketTypeId: string; quantity: number }[]>([]);
  const [ticketDetails, setTicketDetails] = useState<{ [key: string]: TicketType | null }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (ticketsParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(ticketsParam));
        if (parsedData.tickets) {
          setTickets(parsedData.tickets);
        }
      } catch (error) {
        console.error("Failed to parse tickets data:", error);
      }
    }
  }, [ticketsParam]);
 console.log(tickets);
localStorage.setItem("Tickets",JSON.stringify(tickets))

 
  
  useEffect(() => {
    const fetchTicketDetails = async () => {
      setLoading(true);
      try {
        const ticketTypePromises = tickets.map((ticket) =>
          axios.get<{ getTicketType: TicketType[] }>(`${BACKEND_URL}/api/v1/ticket-types/${ticket.ticketTypeId}`)
        );
        const responses = await Promise.all(ticketTypePromises);
        const newTicketDetails = responses.reduce((acc, response) => {
          const ticketTypes = response.data.getTicketType;
          ticketTypes.forEach(ticketType => {
            acc[ticketType.id] = ticketType;
          });
          return acc;
        }, {} as { [key: string]: TicketType });
        setTicketDetails(newTicketDetails);

        tickets.forEach(ticket => {
          const ticketType = newTicketDetails[ticket.ticketTypeId];
          if (ticketType) {
            localStorage.setItem(`ticketType-${ticket.ticketTypeId}`, JSON.stringify(ticketType));
          }
        });
      } catch (error) {
        const cachedTickets = tickets.reduce((acc, ticket) => {
          const cached = localStorage.getItem(`ticketType-${ticket.ticketTypeId}`);
          if (cached) {
            acc[ticket.ticketTypeId] = JSON.parse(cached);
          }
          return acc;
        }, {} as { [key: string]: TicketType });
        if (Object.keys(cachedTickets).length > 0) {
          setTicketDetails(cachedTickets);
        } else {
          setError(error as Error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (tickets.length > 0) {
      fetchTicketDetails();
    }
  }, [tickets]);

  return (
    <div className="max-w-6xl mx-auto my-12 px-6 py-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Tickets</h2>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin h-10 w-10 border-4 border-t-4 border-blue-600 border-solid rounded-full"></div>
        </div>
      ) : error ? (
        <p className="text-red-600 text-center">Error loading ticket details: {error.message}</p>
      ) : tickets.length > 0 ? (
        <ul className="space-y-4">
          {tickets.map((ticket, index) => {
            const ticketType = ticketDetails[ticket.ticketTypeId];
            return (
              <li key={index} className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-700">Type Name: {ticketType ? ticketType.name : "Loading..."}</p>
                  <p className="text-sm text-gray-500">Ticket ID: {ticket.ticketTypeId}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-gray-900">Quantity: {ticket.quantity}</p>
                  <p className="text-md font-medium text-green-600">Price: {ticketType ? `$${ticketType.price}` : "Loading..."}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-lg text-gray-500 text-center">No tickets found</p>
      )}
    </div>
  );
};

export default Ticket;
