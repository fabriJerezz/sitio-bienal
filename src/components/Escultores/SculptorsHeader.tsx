import React from 'react';

function SculptorsHeader() {
  return (
    <div className="relative flex  gap-4  bg-black pt-28">
      <h1 className="text-4xl font-bold text-left pl-11  text-white">
        Escultores |
      </h1>
      <button className="text-white px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-lg">
        Descubrir Escultor
      </button>
    </div>
  );
}

export default SculptorsHeader;
