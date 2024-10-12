import React from 'react';
import Link from 'next/link';

const Unauthorized = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-slate-900 text-white">
      <header className="text-center mb-8">
        <h1 className="text-6xl font-bold mb-4 border-b-1">No Autorizado </h1>

        <div className="flex justify-center items-center">
          <h3 className="text-xl">
            Lo sentimos, no tienes acceso a esta página
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </div>
      </header>
      <div className="flex space-x-4 gap-7">
        <Link
          href="/"
          className="bg-slate-700 text-white rounded-lg px-4 py-2 hover:bg-slate-600 transition duration-300"
        >
          Volver a inicio
        </Link>

        <Link
          href="/soporte"
          className="bg-slate-700 text-white rounded-lg px-4 py-2 hover:bg-slate-600 transition duration-300"
        >
          Contactar Soporte
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
