import React, { useState } from 'react';
import { Event } from '@/types';
import useUserStore from '@/store/userStore';

const AddEventForm: React.FC = () => {
  const { user } = useUserStore();
  const [image, setImage] = useState<string>('');
  const [formData, setFormData] = useState<Event>({
    id: 0,
    nombre: '',
    fecha_inicio: '',
    fecha_final: '',
    lugar: '',
    descripcion: '',
    foto1: null,
    foto2: null,
    evento_en_transcurso: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData({
        ...formData,
        [e.target.name]: file,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (value instanceof File) {
          data.append(key, value);
        } else {
          data.append(key, value.toString());
        }
      }
    });

    try {
      const response = await fetch(
        'https://tp-final-bienal.onrender.com/api/eventos/',
        {
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Token ${user?.token}`,
          },
        }
      );

      if (response.ok) {
        console.log('Evento añadido correctamente');
        setFormData({
          id: 0,
          nombre: '',
          fecha_inicio: '',
          fecha_final: '',
          lugar: '',
          descripcion: '',
          foto1: null,
          foto2: null,
          evento_en_transcurso: '',
        });
      } else {
        const errorData = await response.json();
        console.log('Error al añadir evento:', errorData);
      }
    } catch (error) {
      console.error('Error al enviar el formulario', error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <h1 className="text-2xl font-semibold text-center">
        Añadir un nuevo evento
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre del evento"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p>Fecha de Inicio:</p>
        <input
          type="date"
          name="fecha_inicio"
          value={formData.fecha_inicio}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p>Fecha de finalizacion:</p>
        <input
          type="date"
          name="fecha_final"
          value={formData.fecha_final}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="lugar"
          value={formData.lugar}
          onChange={handleChange}
          placeholder="Lugar del evento"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Descripción del evento"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          Añadir Evento
        </button>
      </form>
    </div>
  );
};

export default AddEventForm;
