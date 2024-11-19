import React from 'react';
import { Event } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface CardEventsProps {
  event: Event;
}

const getEventStatusClass = (status: string) => {
  switch (status) {
    case 'En curso':
      return 'bg-green-100 text-green-800 font-bold py-1 px-3 rounded-full';
    case 'Finalizado':
      return 'bg-red-100 text-red-800 font-bold py-1 px-3 rounded-full';
    case 'Por iniciar':
      return 'bg-yellow-100 text-yellow-800 font-bold py-1 px-3 rounded-full';
    default:
      return '';
  }
};

export default function EventCard({ event }: CardEventsProps) {
  console.log('event', event);
  return (
    <div className="w-full border-t-2 border-white relative flex text-white p-4">
      <div className="seccionTituloPortada w-1/3 flex relative justify-center items-center p-2">
        <Image
          src={`https://res.cloudinary.com/dq1vfo4c8/${event.foto1}/`}
          alt={event.nombre}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="seccionTexto w-1/3 flex items-center  justify-center p-4 rounded-lg ">
        <div className="flex-start flex-col  justify-center items-center p-2 rounded-lg w-2/3">
          <h1 className="text-2xl font-bold mb-1">{event.nombre}</h1>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-brand-google-maps mr-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 9.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
              <path d="M6.428 12.494l7.314 -9.252" />
              <path d="M10.002 7.935l-2.937 -2.545" />
              <path d="M17.693 6.593l-8.336 9.979" />
              <path d="M17.591 6.376c.472 .907 .715 1.914 .709 2.935a7.263 7.263 0 0 1 -.72 3.18a19.085 19.085 0 0 1 -2.089 3c-.784 .933 -1.49 1.93 -2.11 2.98c-.314 .62 -.568 1.27 -.757 1.938c-.121 .36 -.277 .591 -.622 .591c-.315 0 -.463 -.136 -.626 -.593a10.595 10.595 0 0 0 -.779 -1.978a18.18 18.18 0 0 0 -1.423 -2.091c-.877 -1.184 -2.179 -2.535 -2.853 -4.071a7.077 7.077 0 0 1 -.621 -2.967a6.226 6.226 0 0 1 1.476 -4.055a6.25 6.25 0 0 1 4.811 -2.245a6.462 6.462 0 0 1 1.918 .284a6.255 6.255 0 0 1 3.686 3.092z" />
            </svg>
            <span className="text-lg">{event.lugar}</span>
          </div>
        </div>
        <span
          className={`text-lg font-semibold items-center flex justify-center w-1/3 ${getEventStatusClass(
            event.evento_en_transcurso
          )}`}
        >
          {event.evento_en_transcurso}
        </span>
      </div>
      <div className="seccionBotones w-1/3 flex  justify-center items-center p-2">
        <Link
          href={`eventos/${event.id}`}
          className="text-white hover:text-black hover:bg-white font-semibold py-2 px-4 border border-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
