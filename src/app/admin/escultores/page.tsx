import React from 'react';
import SculptorsList from '@/components/Admin/Escultores/SculptorsList';
import AddSculptorForm from '@/components/Admin/AddSculptorForm';

function AdminEscultoresPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-8 flex flex-col items-center">
      <div className="w-full">
        <SculptorsList />
      </div>
      <div className="w-full flex items-center justify-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Agregar Escultor
          </h2>
          <AddSculptorForm />
        </div>
      </div>
    </div>
  );
}

export default AdminEscultoresPage;
