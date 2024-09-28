import React from 'react';

function SculptorsHeader() {
  return (
    <div className="relative flex flex-col gap-4 bg-red-500  pt-28">
      <h1 className="text-4xl font-bold text-left pl-28 bg-blue-500 mb-4">
        Escultores
      </h1>
      <div className="flex justify-between items-center px-12 bg-green-500 p-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Explorar Escultor
        </button>
        <div className="flex gap-4">
          <div className="flex justify-center items-center ">
            <input type="text" placeholder="Buscar escultor" />
            <button className="bg-blue-500 text-white  rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <button className="bg-blue-500 text-white  rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SculptorsHeader;
