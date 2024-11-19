'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Escultor {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  nacionalidad: string;
  eventos_ganados: string;
  foto_perfil: string | null;
}

interface Evento {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
}

const EscultoresList = () => {
  const [escultores, setEscultores] = useState<Escultor[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

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
      console.error('Error fetching data:', error);
    }
  };

  const fetchEventos = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setEventos(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    const escultoresUrl = `https://tp-final-bienal.onrender.com/api/escultores/?search=${searchTerm}`;
    const eventosUrl = `https://tp-final-bienal.onrender.com/api/eventos/?search=${searchTerm}`;
    fetchEscultores(escultoresUrl);
    fetchEventos(eventosUrl);
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchEscultores(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchEscultores(prevPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar escultor o evento"
          className="px-4 py-2 border rounded-l-full focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-r-full hover:from-[#7C3AED] hover:to-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-50 transition-all duration-300"
        >
          Buscar
        </button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {escultores.map((escultor) => (
          <li
            key={escultor.id}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all duration-300 border-2 border-[#8B5CF6] overflow-hidden transform hover:-translate-y-2 hover:border-[#A78BFA]"
          >
            <div className="relative w-full h-80 mb-6 rounded-lg overflow-hidden group">
              <Image
                src={
                  `https://res.cloudinary.com/dq1vfo4c8/${escultor.foto_perfil}` ||
                  'https://via.placeholder.com/300'
                }
                alt={`${escultor.nombre} ${escultor.apellido}`}
                layout="fill"
                objectFit="contain"
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 hover:text-[#A78BFA] transition-colors duration-300">
              {escultor.nombre} {escultor.apellido}
            </h2>
            <p className="text-[#B8B8B8] text-lg mb-2 font-medium">
              {escultor.nacionalidad}
            </p>
            <p className="text-[#9CA3AF] text-sm mb-4">
              Nacimiento:{' '}
              <span className="font-semibold text-[#D1D5DB]">
                {new Date(escultor.fecha_nacimiento).toLocaleDateString()}
              </span>
            </p>
            <div className="bg-[#8B5CF6]/20 rounded-lg p-4 mt-4 hover:bg-[#8B5CF6]/30 transition-colors duration-300">
              <h3 className="text-[#A78BFA] font-semibold mb-2 text-lg">
                Eventos Ganados:
              </h3>
              <p className="text-white text-sm leading-relaxed">
                {escultor.eventos_ganados || 'No disponible'}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-3xl font-bold text-white mt-12 mb-6">Eventos</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventos.map((evento) => (
          <li
            key={evento.id}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all duration-300 border-2 border-[#8B5CF6] overflow-hidden transform hover:-translate-y-2 hover:border-[#A78BFA]"
          >
            <h2 className="text-3xl font-bold text-white mb-3 hover:text-[#A78BFA] transition-colors duration-300">
              {evento.nombre}
            </h2>
            <p className="text-[#B8B8B8] text-lg mb-2 font-medium">
              {evento.descripcion}
            </p>
            <p className="text-[#9CA3AF] text-sm mb-4">
              Fecha:{' '}
              <span className="font-semibold text-[#D1D5DB]">
                {new Date(evento.fecha).toLocaleDateString()}
              </span>
            </p>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-12 space-x-6">
        <button
          onClick={handlePrevPage}
          disabled={!prevPage}
          className="px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-full hover:from-[#7C3AED] hover:to-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={!nextPage}
          className="px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-full hover:from-[#7C3AED] hover:to-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default EscultoresList;
