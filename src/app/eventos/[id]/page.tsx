'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Piece, Event } from '@/types';
import { FocusCards } from '@/components/Obras/FocusCard';
import DownArrow from '@/components/ui/DownArrow';

const EventoDetalle = () => {
  const { id } = useParams(); // Captura el parámetro dinámico
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchPieces = async () => {
      let allPieces: Piece[] = [];
      let url = 'https://tp-final-bienal.onrender.com/api/obras/';
      const idEvento = id;

      while (url) {
        const response = await fetch(url);
        const data = await response.json();
        const filteredPieces = data.results.filter(
          (piece: Piece) => piece.id_evento === Number(idEvento)
        );
        allPieces = [...allPieces, ...filteredPieces];
        url = data.next;
      }

      setPieces(allPieces);
    };

    const fetchEvents = async () => {
      let allEvents: Event[] = [];
      let url = 'https://tp-final-bienal.onrender.com/api/eventos/';

      while (url) {
        const response = await fetch(url);
        const data = await response.json();
        allEvents = [...allEvents, ...data.results];
        url = data.next; // Actualiza la URL para la siguiente página
      }

      setEvents(allEvents);
    };

    fetchEvents();
    fetchPieces();
  }, []);

  console.log(pieces);

  const findEvent = (id: number) => {
    return events.find((event) => event.id === id);
  };

  const Event = findEvent(Number(id));

  console.log(Event);

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
            {Event?.nombre}
          </h1>
          <p className="text-3xl text-white mt-4 text-center drop-shadow-md">
            {Event?.descripcion}
          </p>
          <p className="text-2xl text-white mt-2 text-center drop-shadow-md">
            {Event?.lugar}
          </p>
        </div>

        <div className=" text-center flex flex-col items-center justify-center gap-5 w-full">
          {Event?.evento_en_transcurso === 'En curso' && (
            <>
              <div className="text-4xl w-full text-black font-bold animate-pulse bg-white py-3 px-2 rounded-lg">
                ¡Vota ahora, el evento está activo!
              </div>
              <DownArrow />
            </>
          )}
          {Event?.evento_en_transcurso === 'Finalizado' && (
            <div className="text-4xl text-red-500 font-semibold">
              El evento ha finalizado
            </div>
          )}
          {Event?.evento_en_transcurso === 'Por iniciar' && (
            <div className="text-4xl text-black font-semibold">
              El evento está por arrancar
              <span className="block mt-2 text-lg text-white">
                Inicia el {Event.fecha_inicio}
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
