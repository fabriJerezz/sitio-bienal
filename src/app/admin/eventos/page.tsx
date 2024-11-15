import React from 'react';
import EventosList from '@/components/Admin/Eventos/EventosList';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold">Eventos</h1>
      <EventosList />
    </div>
  );
}
