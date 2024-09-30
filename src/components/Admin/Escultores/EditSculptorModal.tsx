import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Escultor } from './SculptorsList'; // Asegúrate de exportar la interfaz Escultor desde SculptorsList

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

  return (
    <Modal
      isOpen={!!escultor}
      onRequestClose={onClose}
      contentLabel="Editar Escultor"
    >
      <h2>Editar Escultor</h2>
      {editingSculptor && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <label>
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
            />
          </label>
          <label>
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
            />
          </label>
          <label>
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
            />
          </label>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      )}
    </Modal>
  );
};

export default EditSculptorModal;
