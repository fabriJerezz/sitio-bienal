'use client';
import React, { useEffect, useState } from 'react';
import EventsCard from '../../components/Events/EventsCard';
import { Event } from '@/types';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      let allEvents: Event[] = [];
      let url = 'https://tp-final-bienal.onrender.com/api/eventos/';

      while (url) {
        const response = await fetch(url);
        const data = await response.json();
        allEvents = [...allEvents, ...data.results];
        url = data.next; // Actualiza la URL para la siguiente página
      }

      setEvents(allEvents);
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <EventsCard events={events} />
    </div>
  );
}
