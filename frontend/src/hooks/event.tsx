import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import {  TicketType } from '@jainam-b/event-comman/dist';

interface Event {
  ticketTypes: TicketType[];
  id: string;
  name: string;
  description?: string;
  location: string;
  date: string; // Assuming date is returned as a string from the API
  startTime: string; // Assuming time is returned as a string from the API
  endTime: string; // Assuming time is returned as a string from the API
  imageUrl?: string;
  category: string;
  organizer: string;
  createdAt: string;
  updatedAt: string;
}


const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>(`${BACKEND_URL}/api/v1/events`);
        setEvents(response.data);
        localStorage.setItem("events", JSON.stringify(response.data)); // Cache events in local storage
      } catch (err) {
        // If there is an error and we have cached data, use that instead
        const cachedEvents = localStorage.getItem("events");
        if (cachedEvents) {
          setEvents(JSON.parse(cachedEvents));
        } else {
          setError(err as Error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};




export default useEvents;

export const useEventById = (eventId: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get<Event>(`${BACKEND_URL}/api/v1/events/${eventId}`);
        setEvent(response.data);
        localStorage.setItem(`event-${eventId}`, JSON.stringify(response.data)); // Cache event in local storage
      } catch (err) {
        // If there is an error and we have cached data, use that instead
        const cachedEvent = localStorage.getItem(`event-${eventId}`);
        if (cachedEvent) {
          setEvent(JSON.parse(cachedEvent));
        } else {
          setError(err as Error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

 

  return { event, loading, error };
};
export const useTicketTypebyId = (ticketTypeId: string) => {
  const [ticketType, setTicketType] = useState<TicketType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get<TicketType>(
          `${BACKEND_URL}/api/v1/ticket-types/${ticketTypeId}`
        );
        setTicketType(response.data);
        localStorage.setItem(`ticketType-${ticketTypeId}`, JSON.stringify(response.data));
      } catch (error) {
        const cachedEvent = localStorage.getItem(`ticketType-${ticketTypeId}`);
        if (cachedEvent) {
          setTicketType(JSON.parse(cachedEvent));
        } else {
          setError(error as Error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [ticketTypeId]);

  return { ticketType, loading, error };
};

interface TrendingEventsProps {
  title: string;
  events: Event[];
}

export const TrendingEvents: React.FC<TrendingEventsProps> = ({ title, events }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <h3>{event.name}</h3>
            <p>{event.location}</p>
            {/* Display other event details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};
