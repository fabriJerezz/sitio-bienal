'use client';
import React, { useState } from 'react';

function SculptorList() {
  const [displayFilter, setDisplayFilter] = useState(false);

  const handleDisplayFilter = () => {
    setDisplayFilter(!displayFilter);
  };

  return (
    <div className="w-screen h-screen bg-red-500 flex flex-col  py-2 items-center">
      <div className="flex bg-blue-500  w-full justify-end pr-60 relative">
        <button
          onClick={handleDisplayFilter}
          className="text-white hover:text-purple-400 transition-all duration-300 bg-purple-900 rounded-full p-3 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transform hover:-translate-y-1 active:translate-y-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 transition-transform duration-300 ease-in-out transform hover:rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
        </button>
        <div
          className={`flex items-center flex-col absolute w-1/6 h-52 right-80 bg-gradient-to-b from-purple-100 via-purple-200 to-purple-300 rounded-xl shadow-2xl transform transition-all duration-300 ease-out overflow-hidden border border-purple-300 ${
            displayFilter
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
        >
          <div className="p-4 w-full">
            <h3 className="text-xl font-semibold text-purple-800 mb-2 text-center border-b-2 border-purple-300 ">
              Filtrar
            </h3>
            <div className="space-y-2 w-full  py-2">
              <label className="flex items-center space-x-2 text-sm text-purple-700 ">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-600"
                />
                <span>Opción 1</span>
              </label>
              <label className="flex items-center space-x-2 text-sm text-purple-700">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-600"
                />
                <span>Opción 2</span>
              </label>
              <label className="flex items-center space-x-2 text-sm text-purple-700">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-600"
                />
                <span>Opción 3</span>
              </label>
            </div>
          </div>
          <button className=" bg-purple-900 text-white hover:bg-purple-800 transition-all duration-300 rounded-full p-2 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transform hover:-translate-y-1 active:translate-y-0">
            Aplicar
          </button>
        </div>
      </div>
      <div className="w-3/4 h-screen bg-blue-500 mt-1  grid grid-cols-3 gap-4 p-2">
        <div className="bg-green-500 w-full h-full rounded-lg"></div>
        <div className="bg-green-500 w-full h-full rounded-lg"></div>
        <div className="bg-green-500 w-full h-full rounded-lg"></div>
        <div className="bg-green-500 w-full h-full rounded-lg"></div>
        <div className="bg-green-500 w-full h-full rounded-lg"></div>
        <div className="bg-green-500 w-full h-full rounded-lg"></div>
      </div>
    </div>
  );
}

export default SculptorList;
