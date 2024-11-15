import React from 'react';
import { Montserrat } from 'next/font/google';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Event } from '@/types';

interface CardEventsProps {
  events: Event[];
}

export default function EventsCard({ events }: CardEventsProps) {
  return (
    <>
      <div className="flex relative w-full h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-black">
        <div className="flex flex-col relative w-2/5 h-full bg-slate-400 items-center justify-center">
          <h1 className="items-center justify-center flex w-full text-white font-extrabold text-4xl ">
            <div className="tracking-wide flex flex-col w-fit border-b-4 pb-1">
              Proximos <span>Eventos</span>
            </div>
          </h1>
          <p className="text-white text-center mt-3">
            Eventos que se realizaran
            <br />
            en las proximas fechas
          </p>
          <div className="flex">
            <CarouselNext />
            <CarouselPrevious />
          </div>
        </div>
        <div className="zonaSlider w-3/5 h-full bg-slate-50">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent>
              {events.map((event) => (
                <CarouselItem
                  key={event.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex flex-col w-full h-full items-center justify-center">
                    <h1 className="text-4xl font-extrabold text-slate-900">
                      {event.nombre}
                    </h1>
                    <p className="text-slate-900">{event.fecha_inicio}</p>
                    <p className="text-slate-900">{event.fecha_final}</p>
                    <p className="text-slate-900">{event.descripcion}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </>
  );
}
