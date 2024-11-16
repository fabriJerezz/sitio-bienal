'use client';
import { useParams } from 'next/navigation';

const EventoDetalle = () => {
  const { nombre } = useParams(); // Captura el parámetro dinámico

  return (
    <div>
      <h1>Detalles del evento: {nombre}</h1>
    </div>
  );
};

export default EventoDetalle;
