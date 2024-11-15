'use client';
import React from 'react';
import EventosList from '@/components/Admin/Eventos/EventosList';
import AddEventForm from '@/components/Admin/Eventos/AddEventForm';
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-fit">
      <h1 className="text-2xl font-semibold">Eventos</h1>
      <EventosList />
      <AddEventForm />
    </div>
  );
}
