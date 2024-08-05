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
        const response = await axios.get<Event[]>(`${BACKEND_URL}/api/v1/events`); // Adjust the API endpoint as needed
        setEvents(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};

export default useEvents;
