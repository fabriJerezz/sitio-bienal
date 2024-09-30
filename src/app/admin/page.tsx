'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import Link from 'next/link';

const Admin = () => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== 'STAFF') {
      router.push('/unauthorized');
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          Panel de Administración
        </h1>
        <div className="space-y-4">
          <Link
            href="/admin/escultores"
            className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Gestionar Escultores
          </Link>
          <Link
            href="/admin/obras"
            className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Gestionar Obras
          </Link>
          <Link
            href="/admin/eventos"
            className="block w-full text-center bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          >
            Gestionar Eventos
          </Link>
        </div>
        {user && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Conectado como: {user.username}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
