'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import UserProfile from '@/components/Admin/UserProfile';

const Admin = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user?.role !== 'STAFF') {
      router.push('/unauthorized');
    } else {
      fetch('https://tp-final-bienal.onrender.com/profile/', {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setProfileData(data))
        .catch((error) => console.error('Error fetching profile data:', error));
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg w-full transition-all duration-300 hover:shadow-xl">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-600">
          Panel de Administración
        </h1>
        <div className="space-y-6">
          <p className="text-center text-xl text-gray-700 font-semibold">
            Bienvenido al panel de administración. Desde aquí podrás gestionar:
          </p>
          <ul className="list-none text-gray-600 space-y-2">
            {['Escultores', 'Obras', 'Eventos'].map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-indigo-500 mr-2">&#8226;</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-center text-sm text-gray-500 mt-6 italic">
            Utiliza la barra lateral para navegar entre las diferentes
            secciones.
          </p>
        </div>
        {user && (
          <div className="mt-10 text-center">
            <p className="text-sm text-indigo-600 font-medium bg-indigo-100 py-2 px-4 rounded-full inline-block">
              Conectado como:{' '}
              <span className="font-bold">{profileData?.user.username}</span>
            </p>
          </div>
        )}
        {profileData && <UserProfile profileData={profileData} />}
      </div>
    </div>
  );
};

export default Admin;
