'use client';
import { useState, useEffect } from 'react';
import useUserStore from '@/store/userStore';
import EditEventModal from '@/components/Admin/Eventos/EditEventModal';
import { Event } from '@/types';

const EventosList = () => {
  const { user } = useUserStore();
  const [eventos, setEventos] = useState<Event[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchEventos('https://tp-final-bienal.onrender.com/api/eventos/');
  }, []);

  const fetchEventos = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data); // Verifica que los datos tengan la propiedad `id`
      setEventos(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error al cargar los eventos. Por favor, intente de nuevo.');
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchEventos(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchEventos(prevPage);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch(
        `https://tp-final-bienal.onrender.com/api/eventos/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user?.token}`,
          },
        }
      );

      if (!response.ok) {
        if (
          response.headers.get('content-type')?.includes('application/json')
        ) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to delete event');
        } else {
          const errorText = await response.text();
          throw new Error(`Failed to delete event: ${errorText}`);
        }
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
      setEventos((prevEventos) =>
        prevEventos.filter((evento) => evento.id.toString() !== id)
      );
      setError(null);
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Error al eliminar el evento. Por favor, intente de nuevo.');
    }
  };

  const handleEdit = (id: string) => {
    const evento = eventos.find((evento) => evento.id.toString() === id);
    if (evento) {
      setEditingEvent(evento);
    }
  };

  const handleSaveEdit = async (updatedEvent: Event) => {
    try {
      const formData = new FormData();
      formData.append('nombre', updatedEvent.nombre);
      formData.append('fechaInicio', updatedEvent.fecha_inicio);
      formData.append('fechaFin', updatedEvent.fecha_final);
      formData.append('lugar', updatedEvent.lugar);
      formData.append('descripcion', updatedEvent.descripcion);

      if (updatedEvent.portada instanceof File) {
        formData.append('portada', updatedEvent.portada);
      }

      const response = await fetch(
        `https://tp-final-bienal.onrender.com/api/eventos/${updatedEvent.id}/`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Token ${user?.token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update event');
      }

      const updatedEventData = await response.json();
      setEventos((prevEventos) =>
        prevEventos.map((evento) =>
          evento.id === updatedEventData.id ? updatedEventData : evento
        )
      );
      setEditingEvent(null);
      setError(null);
    } catch (error) {
      console.error('Error updating event:', error);
      setError('Error al actualizar el evento. Por favor, intente de nuevo.');
    }
  };

  return (
    <div className="bg-gray-100 p-8 w-4/5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Lista de Eventos
        </h1>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
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
                  Lugar
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
              {eventos.map((evento) => (
                <tr key={evento.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{evento.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {evento.nombre}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{evento.lugar}</div>
                  </td>
                  <td className="px-6 py-4  text-sm font-medium ">
                    <button
                      onClick={() => handleEdit(evento.id.toString())}
                      className="text-indigo-600 hover:text-indigo-900 mr-10"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(evento.id.toString())}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
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
      <EditEventModal
        evento={editingEvent}
        onSave={handleSaveEdit}
        onClose={() => setEditingEvent(null)}
      />
    </div>
  );
};

export default EventosList;
