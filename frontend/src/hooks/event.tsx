import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface Event {
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
