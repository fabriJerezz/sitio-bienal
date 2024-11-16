'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Piece {
  id: number;
  titulo: string;
  fecha_creacion: Date;
  descripcion: string;
  material: string;
  id_escultor: number;
  id_evento: number;
  foto1: File | null;
  foto2: File | null;
  votacion_en_transcurso: string;
}

const EventoDetalle = () => {
  const { id } = useParams(); // Captura el parámetro dinámico
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    const fetchPieces = async () => {
      let allPieces: Piece[] = [];
      let url = 'https://tp-final-bienal.onrender.com/api/obras/';
      const idEvento = id; // Reemplaza esto con el ID del escultor que deseas filtrar

      while (url) {
        const response = await fetch(url);
        const data = await response.json();
        const filteredPieces = data.results.filter(
          (piece: Piece) => piece.id_evento === Number(idEvento)
        );
        allPieces = [...allPieces, ...filteredPieces];
        url = data.next; // Actualiza la URL para la siguiente página
      }

      setPieces(allPieces);
    };

    fetchPieces();
  }, []);

  console.log(pieces);

  return (
    <div>
      <h1>Detalles del evento: {id}</h1>
    </div>
  );
};

export default EventoDetalle;
