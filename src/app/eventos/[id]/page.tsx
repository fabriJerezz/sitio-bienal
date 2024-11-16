'use client';
import { useParams } from 'next/navigation';

const EventoDetalle = () => {
  const { id } = useParams(); // Captura el parámetro dinámico

  return (
    <div>
      <h1>Detalles del evento: {id}</h1>
    </div>
  );
};

export default EventoDetalle;
