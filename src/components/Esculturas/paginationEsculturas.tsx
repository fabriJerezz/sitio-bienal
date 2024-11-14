'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FocusCards } from '@/components/Esculturas/focus-card';

export interface Escultura {
  id: number;
  titulo: string;
  fecha_creacion: string;
  descripcion: string;
  material: string;
  id_escultor: number;
  id_evento: number;
}

// Definición del componente funcional EsculturasList
const EsculturasList = () => {
    // Estado para almacenar la lista de esculturas
    const [esculturas, setEsculturas] = useState<Escultura[]>([]);
    // Estado para almacenar la URL de la siguiente página
    const [nextPage, setNextPage] = useState<string | null>(null);
    // Estado para almacenar la URL de la página anterior
    const [prevPage, setPrevPage] = useState<string | null>(null);

    // Efecto que se ejecuta al montar el componente
    useEffect(() => {
    // Cargar la primera página cuando el componente se monte
    fetchEsculturas ('https://tp-final-bienal.onrender.com/api/obras/');
  }, []);

    // Función asíncrona para obtener los datos de los escultores
    const fetchEsculturas = async (url: string) => {
        try {
          // Realizar la petición a la API
          const res = await fetch(url);
          // Convertir la respuesta a JSON
          const data = await res.json();
          console.log(data);
    
          // Actualizar el estado con los resultados obtenidos
          setEsculturas(data.results);
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
          fetchEsculturas(nextPage);
        }
    };
    
    const handlePrevPage = () => {
    // Si existe una página anterior, cargar sus datos
        if (prevPage) {
          fetchEsculturas(prevPage);
        }
    }; 

    return (
        <div className="container mx-auto px-4 py-8 w-full">
          <FocusCards cards={esculturas.map(escultura => ({
            title: escultura.titulo,
            src: 'https://via.placeholder.com/150',
            width: 800,
            height: 600,
          }))} />
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={!prevPage}
              className="px-4 py-2 bg-[#8B5CF6] text-white rounded-md hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Anterior
            </button>
            <button
              onClick={handleNextPage}
              disabled={!nextPage}
              className="px-4 py-2 bg-[#8B5CF6] text-white rounded-md hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Siguiente
            </button>
          </div>
        </div>
    );

};
    
    export default EsculturasList;