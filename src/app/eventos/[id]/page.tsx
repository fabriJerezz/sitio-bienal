'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Piece, Event } from '@/types';
import { FocusCards } from '@/components/Obras/FocusCard';
import DownArrow from '@/components/ui/DownArrow';
import Link from 'next/link';

const EventoDetalle = () => {
  const { id } = useParams(); // Captura el parámetro dinámico
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [event, setEvent] = useState<Event | null>(null); // Cambiado a un solo objeto

  useEffect(() => {
    const fetchPieces = async () => {
      let allPieces: Piece[] = [];
      let url = `https://tp-final-bienal.onrender.com/api/obras/?id_evento=${id}`;

      while (url) {
        const response = await fetch(url);
        const data = await response.json();
        allPieces = [...allPieces, ...data.results];
        url = data.next;
      }

      setPieces(allPieces);
    };

    const fetchEvent = async () => {
      const response = await fetch(
        `https://tp-final-bienal.onrender.com/api/eventos/${id}`
      );
      const data = await response.json();
      setEvent(data);
    };

    fetchEvent();
    fetchPieces();
  }, [id]);

  const mapObrasToCards = (pieces: Piece[]) => {
    return pieces.map((piece) => ({
      id: piece.id.toString(),
      title: piece.titulo,
      description: piece.descripcion,
      src: piece.foto1,
    }));
  };

  const cards = mapObrasToCards(pieces);

  return (
    <>
      <div className="relative w-screen h-screen flex justify-center items-center flex-col bg-black">
        <div className="flex flex-col bg-opacity-75 w-11/12 md:w-3/4 lg:w-1/2 justify-center items-center p-8 rounded-lg shadow-2xl">
          <h1 className="text-8xl font-bold text-center text-white drop-shadow-lg">
            {event?.nombre}
          </h1>
          <p className="text-3xl text-white mt-4 text-center drop-shadow-md">
            {event?.descripcion}
          </p>
          <p className="text-2xl text-white mt-2 text-center drop-shadow-md">
            {event?.lugar}
          </p>
        </div>

        <div className=" text-center flex flex-col items-center justify-center gap-5 w-full">
          {event?.evento_en_transcurso === 'En curso' && (
            <>
              <div className="text-4xl w-full text-black font-bold animate-pulse bg-white py-3 px-2 rounded-lg">
                ¡Vota ahora, el evento está activo!
              </div>
              <DownArrow />
            </>
          )}
          {event?.evento_en_transcurso === 'Finalizado' && (
            <>
              <div className="text-4xl text-red-500 font-semibold">
                El evento ha finalizado
              </div>
              <Link
                href={`../resultados/${event?.id}`}
                className="text-white hover:text-black hover:bg-white font-semibold py-2 px-4 border border-white rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Ver resultados
              </Link>
            </>
          )}
          {event?.evento_en_transcurso === 'Por iniciar' && (
            <div className="text-4xl text-black font-semibold">
              El evento está por arrancar
              <span className="block mt-2 text-lg text-white">
                Inicia el {event.fecha_inicio}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="SectoObras mt-5 mb-5 flex flex-col justify-center items-center">
        <FocusCards cards={cards} />
      </div>
    </>
  );
};

export default EventoDetalle;
