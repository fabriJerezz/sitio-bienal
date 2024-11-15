'use client';
import React, { useEffect, useState } from 'react';
import EventsCard from '../../components/Events/EventsCard';
import { Event } from '@/types';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [upComingEvents, setUpComingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);

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

  const categorizeEvents = (events: Event[]) => {
    const now = new Date();

    const past = events.filter((event) => new Date(event.fecha_final) < now);
    const current = events.filter(
      (event) =>
        new Date(event.fecha_inicio) <= now &&
        new Date(event.fecha_final) >= now
    );
    const upcoming = events.filter(
      (event) => new Date(event.fecha_inicio) > now
    );

    setPastEvents(past);
    setCurrentEvents(current);
    setUpComingEvents(upcoming);
  };

  useEffect(() => {
    categorizeEvents(events);
  }, [events]);

  return (
    <div className="bg-slate-400">
      <header></header>

      <div className="flex flex-col gap-10 justify-center items-center">
        <EventsCard
          events={upComingEvents}
          title="Próximos Eventos"
          description="Los mejores eventos te esperan"
          estado="Próximamente"
        />
        <EventsCard
          events={currentEvents}
          title="Eventos en Curso"
          description="No te pierdas los eventos que están ocurriendo ahora"
          estado="En Curso"
        />
        <EventsCard
          events={pastEvents}
          title="Eventos Terminados"
          description="Revive los mejores momentos de eventos pasados"
          estado="Terminados"
        />
      </div>
    </div>
  );
}
