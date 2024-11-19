'use client';
import React, { useEffect, useState } from 'react';
import EventsCard from '../../components/Events/EventsCard';
import { Event } from '@/types';
import Image from 'next/image';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [upComingEvents, setUpComingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchEvents = async () => {
      let allEvents: Event[] = [];
      let url = `https://tp-final-bienal.onrender.com/api/eventos/?search=${searchTerm}`;

      while (url) {
        const response = await fetch(url);
        const data = await response.json();
        allEvents = [...allEvents, ...data.results];
        url = data.next; // Actualiza la URL para la siguiente página
      }

      setEvents(allEvents);
    };

    fetchEvents();
  }, [searchTerm]);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col gap-12 bg-black pb-10">
      <header className="flex flex-col justify-center items-center w-screen h-screen py-12 bg-gradient-to-r from-gray-800 to-black text-white text-center shadow-lg">
        <Image
          src={require('../../../public/imgs/B22-Slide-web-home-bg-1024x581.png')}
          alt="background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="z-10 flex flex-col">
          <h1 className="text-7xl font-extrabold">Eventos</h1>
          <p className="text-3xl mt-4">Descubre los mejores eventos</p>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar eventos"
            className="mt-4 p-2 rounded text-black"
          />
        </div>
      </header>

      <div className="flex flex-col justify-center items-center"></div>

      {/* 
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
      </div> */}
    </div>
  );
}
