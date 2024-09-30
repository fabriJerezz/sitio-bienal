import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Escultor } from './SculptorsList';

interface EditSculptorModalProps {
  escultor: Escultor | null;
  onSave: (updatedSculptor: Escultor) => void;
  onClose: () => void;
}

const EditSculptorModal: React.FC<EditSculptorModalProps> = ({
  escultor,
  onSave,
  onClose,
}) => {
  const [editingSculptor, setEditingSculptor] = useState<Escultor | null>(
    escultor
  );

  useEffect(() => {
    setEditingSculptor(escultor);
  }, [escultor]);

  const handleSave = () => {
    if (editingSculptor) {
      onSave(editingSculptor);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditingSculptor((prevSculptor) => {
        if (prevSculptor) {
          return {
            ...prevSculptor,
            foto_perfil: URL.createObjectURL(file),
          };
        }
        return null;
      });
    }
  };

  return (
    <Modal
      isOpen={!!escultor}
      onRequestClose={onClose}
      contentLabel="Editar Escultor"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Editar Escultor
        </h2>
        {editingSculptor && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre:
                <input
                  type="text"
                  value={editingSculptor.nombre}
                  onChange={(e) =>
                    setEditingSculptor({
                      ...editingSculptor,
                      nombre: e.target.value,
                    })
                  }
                  className="p-2 bg-slate-400/15 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellido:
                <input
                  type="text"
                  value={editingSculptor.apellido}
                  onChange={(e) =>
                    setEditingSculptor({
                      ...editingSculptor,
                      apellido: e.target.value,
                    })
                  }
                  className="p-2 bg-slate-400/15 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nacionalidad:
                <input
                  type="text"
                  value={editingSculptor.nacionalidad}
                  onChange={(e) =>
                    setEditingSculptor({
                      ...editingSculptor,
                      nacionalidad: e.target.value,
                    })
                  }
                  className="p-2 bg-slate-400/15 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto de Perfil:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="p-2 bg-slate-400/15 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Guardar
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default EditSculptorModal;
