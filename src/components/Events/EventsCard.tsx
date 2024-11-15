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
import ConcreteEventCard from './ConcreteEventCard';

interface CardEventsProps {
  events: Event[];
  title: string;
  description: string;
  estado: string;
}

export default function EventsCard({
  events,
  title,
  description,
  estado,
}: CardEventsProps) {
  return (
    <div className="flex relative w-4/5 h-64 bg-black rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col relative w-2/5 h-full items-center justify-center p-4 bg-gradient-to-r from-gray-800 to-black">
        <h1 className="pb-2 border-b-4 border-white text-center text-white font-extrabold text-4xl">
          {title}
        </h1>
        <p className="text-white text-center mt-3">{description}</p>
      </div>
      <div className="zonaSlider w-3/5 h-full flex justify-center items-center bg-gray-600/5">
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
                className="md:basis-1/2 lg:basis-1/3 px-4"
              >
                <ConcreteEventCard
                  nombre={event.nombre}
                  fecha_inicio={event.fecha_inicio}
                  fecha_final={event.fecha_final}
                  descripcion={event.descripcion}
                  estado={estado}
                  portada={event.portada}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-between mt-4 w-full px-4">
            <CarouselPrevious className="text-white" />
            <CarouselNext className="text-white" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
