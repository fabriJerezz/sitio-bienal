import { useState } from 'react';
import { useUserStore } from '@/store/userStore';

const AddSculptorForm = () => {
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    nacionalidad: '',
    eventos_ganados: 0,
    foto_perfil: null as File | null,
  });

  // Esta función maneja los cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> // Define el tipo de evento para manejar cambios en los campos del formulario
  ) => {
    // Extrae el nombre y valor del campo que cambió
    const { name, value } = e.target;
    // Actualiza el estado del formulario
    setFormData((prevData) => ({
      ...prevData, // Mantiene los datos previos
      // Si el campo es 'eventos_ganados', convierte el valor a número entero
      // De lo contrario, usa el valor tal cual
      [name]: name === 'eventos_ganados' ? parseInt(value, 10) : value,
    }));
  };

  // Esta función maneja el cambio en el campo de archivo (foto de perfil)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Obtiene el primer archivo seleccionado, o null si no hay archivo
    const file = e.target.files?.[0] || null;
    // Actualiza el estado del formulario con el archivo seleccionado
    setFormData((prevData) => ({
      ...prevData,
      foto_perfil: file,
    }));
  };

  // Esta función maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Previene el comportamiento por defecto del formulario (recargar la página)
    e.preventDefault();

    const data = new FormData(); // Crea un nuevo objeto FormData para enviar los datos del formulario
    Object.entries(formData).forEach(([key, value]) => {
      // Itera sobre cada par clave-valor en el objeto formData
      if (value !== null) {
        if (key === 'foto_perfil' && value instanceof File) {
          // Si es la foto de perfil y es un archivo, lo añadimos directamente
          data.append(key, value);
        } else {
          // Para los demás campos, los añadimos como cadenas
          data.append(key, value.toString());
        }
      }
    });

    try {
      const response = await fetch(
        'https://tp-final-bienal.onrender.com/api/escultores/',
        {
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Token ${user?.token}`,
          },
        }
      );

      if (response.ok) {
        console.log('Escultor añadido correctamente');
        // Aquí podrías resetear el formulario o redirigir al usuario
        setFormData({
          nombre: '',
          apellido: '',
          fecha_nacimiento: '',
          nacionalidad: '',
          eventos_ganados: 0,
          foto_perfil: null,
        });
      } else {
        const errorData = await response.json();
        console.log('Error al añadir escultor:', errorData);
      }
    } catch (error) {
      console.error('Error al enviar el formulario', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
      encType="multipart/form-data"
    >
      <input
        name="nombre"
        placeholder="Nombre"
        onChange={handleChange}
        value={formData.nombre}
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="apellido"
        placeholder="Apellido"
        onChange={handleChange}
        value={formData.apellido}
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="fecha_nacimiento"
        type="date"
        onChange={handleChange}
        value={formData.fecha_nacimiento}
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="nacionalidad"
        placeholder="Nacionalidad"
        onChange={handleChange}
        value={formData.nacionalidad}
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="eventos_ganados"
        type="number"
        onChange={handleChange}
        value={formData.eventos_ganados}
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="file"
        name="foto_perfil"
        onChange={handleFileChange}
        accept="image/*"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Añadir Escultor
      </button>
    </form>
  );
};

export default AddSculptorForm;
