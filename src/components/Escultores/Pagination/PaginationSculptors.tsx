// components/EscultoresList.tsx
'use client';
import React, { useState, useEffect } from 'react';
import FlipCards from '../../Escultores/flipCard';
import { Escultura } from '@/components/Esculturas/paginationEsculturas';
interface Escultor {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  nacionalidad: string;
  eventos_ganados: string;
  foto_perfil: string | null;
  obra_principal: string | null;
}

const EscultoresList: React.FC = () => {
  const [escultores, setEscultores] = useState<Escultor[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  useEffect(() => {
    fetchEscultores('https://tp-final-bienal.onrender.com/api/escultores/');
  }, []);

  const fetchEscultores = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setEscultores(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error('Error fetching escultores:', error);
    }
  };

  const fetchMoreEvents = async () => {
    if (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();
      const newEscultores = data.results;
      setEscultores((prevEscultores) => [...prevEscultores, ...newEscultores]);
      setNextPage(data.next);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-screen">
      {escultores.map((escultor) => (
        <FlipCards
          key={escultor.id}
          escultorId={escultor.id}
          name={`${escultor.nombre} ${escultor.apellido}`}
          location={escultor.nacionalidad}
          frontImage={escultor.foto_perfil || 'https://via.placeholder.com/300'}
          backImage={
            escultor.obra_principal || 'https://via.placeholder.com/300'
          }
        />
      ))}
      <div className="flex w-screen justify-center">
        {nextPage && (
          <button
            onClick={fetchMoreEvents}
            className="bg-white text-black p-2 rounded-md m-2"
          >
            Ver más
          </button>
        )}
      </div>
    </div>
  );
};

export default EscultoresList;
