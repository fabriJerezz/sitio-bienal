'use client';
import React from 'react';
import EventosList from '@/components/Admin/Eventos/EventosList';
import AddEventForm from '@/components/Admin/Eventos/AddEventForm';
export default function Page() {
  return (
    <div className="flex flex-col relative justify-center items-center">
      <div className=" relative w-4/5">
        <EventosList />
      </div>
      <div className="relative ">
        <AddEventForm />
      </div>
    </div>
  );
}
