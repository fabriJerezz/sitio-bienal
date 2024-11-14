'use client';
import { useState, useEffect } from 'react';
import useUserStore from '@/store/userStore';

const AddPieceForm = () => {
  const user = useUserStore((state) => state.user);
  const [escultores, setEscultores] = useState<
    { id: number; nombre: string }[]
  >([]);
  const [eventos, setEventos] = useState<{ id: number; nombre: string }[]>([]);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha_creacion: '',
    material: '',
    id_escultor: 0,
    id_evento: 0,
    foto1: null as File | null,
    foto2: null as File | null,
  });

  useEffect(() => {
    const fetchEscultores = async () => {
      let allEscultores: { id: number; nombre: string }[] = [];
      let url: string | null =
        'https://tp-final-bienal.onrender.com/api/escultores/';

      while (url) {
        try {
          const response = await fetch(url);
          const data: {
            results: { id: number; nombre: string; apellido: string }[];
            next: string | null;
          } = await response.json();
          allEscultores = [...allEscultores, ...data.results];
          url = data.next; // Actualiza la URL con la siguiente página
        } catch (error) {
          console.error('Error fetching escultores:', error);
          url = null; // Rompe el bucle en caso de error
        }
      }
      setEscultores(allEscultores);
    };

    const fetchEventos = async () => {
      let allEventos: { id: number; nombre: string }[] = [];
      let url: string | null =
        'https://tp-final-bienal.onrender.com/api/eventos/';

      while (url) {
        try {
          const response = await fetch(url);
          const data: {
            results: { id: number; nombre: string }[];
            next: string | null;
          } = await response.json();
          allEventos = [...allEventos, ...data.results];
          url = data.next; // Actualiza la URL con la siguiente página
        } catch (error) {
          console.error('Error fetching eventos:', error);
          url = null; // Rompe el bucle en caso de error
        }
      }

      setEventos(allEventos);
    };

    fetchEscultores();
    fetchEventos();
  }, []);

  console.log('Escultores:', escultores);
  console.log('Eventos:', eventos);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === 'id_escultor' || name === 'id_evento'
          ? parseInt(value)
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if ((key === 'foto1' || key === 'foto2') && value instanceof File) {
          data.append(key, value);
        } else {
          data.append(key, value.toString());
        }
      }
    });

    try {
      console.log('Enviando formulario');
      console.log('User', user);

      const response = await fetch(
        'https://tp-final-bienal.onrender.com/api/obras/',
        {
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Token ${user?.token}`,
          },
        }
      );

      if (response.ok) {
        console.log('Obra añadida correctamente');
        setFormData({
          titulo: '',
          descripcion: '',
          fecha_creacion: '',
          material: '',
          id_escultor: 0,
          id_evento: 0,
          foto1: null,
          foto2: null,
        });
      } else {
        const errorData = await response.json();
        console.log('Error al añadir obra:', errorData);
      }
    } catch (error) {
      console.error('Error al enviar el formulario', error);
    }
  };

  return (
    <>
      <div>
        <h1>Agregar Escultor</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
          encType="multipart/form-data"
        >
          <input
            name="titulo"
            placeholder="Título"
            onChange={handleChange}
            value={formData.titulo}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="descripcion"
            placeholder="Descripción"
            onChange={handleChange}
            value={formData.descripcion}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="fecha_creacion"
            type="date"
            onChange={handleChange}
            value={formData.fecha_creacion}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="material"
            placeholder="Material"
            onChange={handleChange}
            value={formData.material}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p>ID Escultor</p>
          <select
            name="id_escultor"
            onChange={handleChange}
            value={formData.id_escultor}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione un escultor</option>
            {escultores.map((escultor: any) => (
              <option key={escultor.id} value={escultor.id}>
                {escultor.nombre} {escultor.apellido}
              </option>
            ))}
          </select>
          <p>ID Evento</p>
          <select
            name="id_evento"
            onChange={handleChange}
            value={formData.id_evento}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione un evento</option>
            {eventos.map((evento: any) => (
              <option key={evento.id} value={evento.id}>
                {evento.nombre}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="foto1"
            onChange={handleFileChange}
            accept="image/*"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            name="foto2"
            onChange={handleFileChange}
            accept="image/*"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Añadir Obra
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPieceForm;
