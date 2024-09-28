import React from 'react';

function SculptorsHeader() {
  return (
    <div className="relative flex flex-col gap-4  bg-black pt-28">
      <h1 className="text-4xl font-bold text-left  pl-10 mb-4 text-white">
        Escultores |
      </h1>
      <div className="flex justify-between items-center px-12  p-4">
        <div className="flex gap-4">
          <div className="flex justify-center items-center gap-2">
            <input
              className="bg-white text-black py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-sm"
              type="text"
              placeholder="Buscar escultor"
            />
            <button className=" text-white  rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-9"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <button className=" text-white  rounded-md group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-9 group-hover:text-red-500 transition-colors duration-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>
        <button className="text-white px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-lg">
          Explorar Escultor
        </button>
      </div>
    </div>
  );
}

export default SculptorsHeader;
