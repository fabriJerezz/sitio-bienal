'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const Page: React.FC = () => {
  const { token } = useParams();
  console.log(token);

  useEffect(() => {
    async function validToken() {
      try {
        const response = await fetch(
          `https://tp-final-bienal.onrender.com/verify-email/${token}/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (error) {
        console.error('Error:', error);
      }
    }

    validToken();
  }, [token]);

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-extrabold mb-4 animate-pulse text-center w-1/2">
        Cuenta Validada ya puede acceder a nuestra WEB
      </h1>
      <Link
        href="/"
        className="px-4 py-2 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-110"
      >
        Volver a inicio
      </Link>
    </div>
  );
};

export default Page;
