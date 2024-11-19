'use client';
import React, { useEffect, useState } from 'react';

import { Event } from '@/types';
import Image from 'next/image';
import EventCard from '@/components/Events/EventCard';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [upComingEvents, setUpComingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

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
      categorizeEvents(allEvents);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filteredEvents = () => {
    switch (filter) {
      case 'upcoming':
        return upComingEvents;
      case 'current':
        return currentEvents;
      case 'past':
        return pastEvents;
      default:
        return events;
    }
  };

  return (
    <div className="flex flex-col gap-12 bg-black pb-10 w-screen justify-center items-center">
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
        </div>
      </header>

      <div className="flex flex-col justify-center items-center w-3/4 ">
        <div className="header flex flex-row items-center justify-between space-x-4 p-4 w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar eventos"
            className="p-2 rounded text-black"
          />

          <select
            name="filter"
            id="filterDropdown"
            value={filter}
            onChange={handleFilterChange}
            className="p-2 rounded bg-white text-black border border-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="all">Todos los eventos</option>
            <option value="upcoming">Próximos eventos</option>
            <option value="current">Eventos en curso</option>
            <option value="past">Eventos pasados</option>
          </select>
        </div>

        <div className="w-full justify-center items-center">
          {filteredEvents().map((event) => EventCard({ event }))}
        </div>
      </div>
    </div>
  );
}
