'use client';
import { useState, useEffect } from 'react';

interface Escultor {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  nacionalidad: string;
  eventos_ganados: string;
  foto_perfil: string | null;
}

const EscultoresList = () => {
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
      console.error('Error fetching data:', error);
    }
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
    <div className="bg-gray-100  p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Lista de Escultores
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nacionalidad
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {escultores.map((escultor) => (
                <tr key={escultor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {escultor.nombre} {escultor.apellido}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {escultor.nacionalidad}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Editar
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-900">
                      Eliminar
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePrevPage}
            disabled={!prevPage}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={!nextPage}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default EscultoresList;
