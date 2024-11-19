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
    <div className="flex relative w-full flex-col bg-black rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col relative  h-full items-center justify-center p-4 bg-gradient-to-r ">
        <h1 className="pb-2 border-b-4 border-white text-center text-white font-extrabold text-4xl">
          {title}
        </h1>
        <p className="text-white text-center mt-3">{description}</p>
      </div>
      <div className="zonaSlider py-4  h-full flex justify-center items-center bg-black">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-3/4 h-full"
        >
          <CarouselContent className="flex  h-full">
            {events.map((event) => (
              <CarouselItem
                key={event.id}
                className="   h-full justify-center items-center md:basis-1/3 basis-1/2"
              >
                <ConcreteEventCard
                  id={event.id}
                  nombre={event.nombre}
                  fecha_inicio={event.fecha_inicio}
                  fecha_final={event.fecha_final}
                  descripcion={event.descripcion}
                  estado={estado}
                  foto1={event.foto1}
                  foto2={event.foto2}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="text-white" />
          <CarouselNext className="text-white" />
        </Carousel>
      </div>
    </div>
  );
}
