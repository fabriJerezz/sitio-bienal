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

// Definición del componente funcional EscultoresList
const EscultoresList = () => {
  // Estado para almacenar la lista de escultores
  const [escultores, setEscultores] = useState<Escultor[]>([]);
  // Estado para almacenar la URL de la siguiente página
  const [nextPage, setNextPage] = useState<string | null>(null);
  // Estado para almacenar la URL de la página anterior
  const [prevPage, setPrevPage] = useState<string | null>(null);

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    // Cargar la primera página cuando el componente se monte
    fetchEscultores('https://tp-final-bienal.onrender.com/api/escultores/');
  }, []);

  // Función asíncrona para obtener los datos de los escultores
  const fetchEscultores = async (url: string) => {
    try {
      // Realizar la petición a la API
      const res = await fetch(url);
      // Convertir la respuesta a JSON
      const data = await res.json();
      console.log(data);

      // Actualizar el estado con los resultados obtenidos
      setEscultores(data.results);
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
      fetchEscultores(nextPage);
    }
  };

  const handlePrevPage = () => {
    // Si existe una página anterior, cargar sus datos
    if (prevPage) {
      fetchEscultores(prevPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8  w-full">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {escultores.map((escultor) => (
          <li
            key={escultor.id}
            className="bg-[#131313] shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 border-2 border-[#8B5CF6]"
          >
            <Image
              src={
                `https://res.cloudinary.com/dq1vfo4c8/${escultor.foto_perfil}` ||
                'https://via.placeholder.com/150'
              }
              alt={escultor.nombre}
              width={100}
              height={100}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold text-[#FFFFFF] mt-4">
              {escultor.nombre} {escultor.apellido}
            </h2>
            <p className="text-[#B8B8B8] mt-2">{escultor.nacionalidad}</p>
          </li>
        ))}
      </ul>
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

export default EscultoresList;
