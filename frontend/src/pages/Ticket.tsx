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

  useEffect(() => {
    const fetchTicketDetails = async () => {
      setLoading(true);
      try {
        const ticketTypePromises = tickets.map((ticket) =>
          axios.get<{ getTicketType: TicketType[] }>(`${BACKEND_URL}/api/v1/ticket-types/${ticket.ticketTypeId}`)
        );
        const responses = await Promise.all(ticketTypePromises);
        const newTicketDetails = responses.reduce((acc, response) => {
          const ticketTypes = response.data.getTicketType; // Adjust to access `getTicketType`
          ticketTypes.forEach(ticketType => {
            acc[ticketType.id] = ticketType;
          });
          return acc;
        }, {} as { [key: string]: TicketType });
        setTicketDetails(newTicketDetails);

        // Cache the data in local storage
        tickets.forEach(ticket => {
          const ticketType = newTicketDetails[ticket.ticketTypeId];
          if (ticketType) {
            localStorage.setItem(`ticketType-${ticket.ticketTypeId}`, JSON.stringify(ticketType));
          }
        });
      } catch (error) {
        // Handle API failure and use cached data
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
    <div className="max-w-5xl mx-auto my-12 px-6 py-8">
      <h2 className="text-2xl font-semibold mb-4">Ticket Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error loading ticket details: {error.message}</p>
      ) : tickets.length > 0 ? (
        <ul className="space-y-4">
          {tickets.map((ticket, index) => {
            const ticketType = ticketDetails[ticket.ticketTypeId];
            return (
              <li key={index} className="flex justify-between">
                {/* <span>Ticket ID: {ticket.ticketTypeId}</span> */}
                <span>Type Name: {ticketType ? ticketType.name : "Loading..."}</span>
                <span>Quantity: {ticket.quantity}</span>
                <span>Price: {ticketType ? `$${ticketType.price}` : "Loading..."}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-lg text-gray-500">No tickets found</p>
      )}
    </div>
  );
};

export default Ticket;
