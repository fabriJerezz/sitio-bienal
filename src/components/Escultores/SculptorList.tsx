import React from 'react';

function SculptorList() {
  return (
    <div className="w-screen h-screen bg-red-500 flex flex-col  py-2 items-center">
      <div className="flex bg-blue-500  w-full justify-end pr-60">
        <button className="text-white hover:text-purple-400 transition-colors duration-300 bg-purple-900 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-8 hover:scale-110 transition-transform duration-300"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
        </button>
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
