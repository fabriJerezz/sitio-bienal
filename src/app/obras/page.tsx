'use client';
import { FocusCards } from '@/components/Obras/FocusCard';
import PieceFilter from '@/components/Obras/PieceFilter';
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
      id: obra.id,
      title: obra.titulo,
      src: obra.foto1,
    }));
  };

  const cards = mapObrasToCards(obras);

  return (
    <>
      <div className="bg-black relative ">
        <header className="w-full pt-16 pb-5 flex justify-between px-20">
          <h1 className="text-white text-3xl ">
            <span className="font-bold">Nuestras</span> Piezas
          </h1>
          {/* <PieceFilter /> */}
        </header>
        <div className="relative">
          <FocusCards cards={cards} />
        </div>
        <div className="flex justify-center mt-5 space-x-6 pt-20 pb-20">
          <button
            onClick={handlePrevPage}
            disabled={!prevPage} // Deshabilita el botón si no hay una página anterior
            className="px-8 py-3 bg-gradient-to-r from-[#fcbe5a] to-[#f9ad21] text-black rounded-full hover:from-[#f9ad21] hover:to-[#ff8229] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={!nextPage} // Deshabilita el botón si no hay una página anterior
            className="px-8 py-3 bg-gradient-to-r from-[#fcbe5a] to-[#f9ad21] text-black rounded-full hover:from-[#ff8229] hover:to-[#ff8229] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
}

export default FocusCardsDemo;
