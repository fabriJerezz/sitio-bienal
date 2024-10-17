'use client';
import { FocusCards } from '@/components/Obras/FocusCard';
import { useState, useEffect } from 'react';

export function FocusCardsDemo() {
  const [obras, setObras] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  useEffect(() => {
    // Cargar la primera página cuando el componente se monte
    fetchObras('https://tp-final-bienal.onrender.com/api/obras');
  }, []);

  const fetchObras = async (url: string) => {
    const res = await fetch(url);
    // Convertir la respuesta a JSON
    const data = await res.json();

    try {
      // Actualizar el estado con los resultados obtenidos
      setObras(data.results);
      console.log(data.results);
      // Actualizar la URL de la siguiente página
      setNextPage(data.next);
      // Actualizar la URL de la página anterior
      setPrevPage(data.previous);
    } catch (error) {
      // Manejar errores en caso de que la petición falle
      console.error('Error fetching data:', error);
    }
  };

  const handleNextPage = () => {
    // Si existe una página siguiente, cargar sus datos
    if (nextPage) {
      fetchObras(nextPage);
    }
  };

  const handlePrevPage = () => {
    // Si existe una página anterior, cargar sus datos
    if (prevPage) {
      fetchObras(prevPage);
    }
  };

  const mapObrasToCards = (obras: any[]) => {
    return obras.map((obra) => ({
      title: obra.titulo,
      src: obra.foto1,
    }));
  };

  const cards = mapObrasToCards(obras);

  return (
    <>
      <div className="bg-slate-900">
        <FocusCards cards={cards} />
      </div>
      <div className="flex justify-center mt-12 space-x-6">
        <button
          onClick={handlePrevPage}
          disabled={!prevPage} // Deshabilita el botón si no hay una página anterior
          className="px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-full hover:from-[#7C3AED] hover:to-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={!nextPage} // Deshabilita el botón si no hay una página siguiente
          className="px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-full hover:from-[#7C3AED] hover:to-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
        >
          Siguiente
        </button>
      </div>
    </>
  );
}

export default FocusCardsDemo;
