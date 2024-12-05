import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Piece } from '@/types';

const Gallery = () => {
  const [pieces, setPieces] = useState<Piece[]>([]);

  const fetchObras = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPieces(data.results);
      console.log(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchObras('https://tp-final-bienal.onrender.com/api/obras');
  }, []);

  const renderImages = (pieces: Piece[]) => {
    const positions = [
      { top: '2%', left: '10%' },
      { top: '15%', left: '40%' },
      { top: '30%', left: '20%' },
      { top: '15%', left: '70%' },
      { top: '20%', left: '60%' },
      { top: '50%', left: '80%' },
    ];

    return pieces
      .slice(0, 6)
      .map((piece, index) => (
        <Image
          key={piece.id}
          src={`https://res.cloudinary.com/dq1vfo4c8/${piece.foto1}`}
          alt={piece.titulo}
          width={150}
          height={150}
          className="absolute w-1/4 h-auto"
          style={positions[index]}
        />
      ));
  };

  return (
    <div className="relative w-screen h-screen flex flex-col bg-black overflow-hidden">
      <div className="inline-flex flex-col p-1 border-white border-right mt-5 ml-5">
        <h1 className="text-4xl font-bold text-white border-r-4 border-white w-max pr-5">
          Galeria de
        </h1>
        <h2 className="text-4xl font-extrabold text-white ml-40 mt-3 w-max border-r-4 border-white pr-5">
          Obras
        </h2>
      </div>
      <div className="relative w-screen h-screen overflow-hidden">
        <div className="absolute w-[300%] h-full animate-scroll">
          <div className="relative w-1/3 h-full float-left">
            {renderImages(pieces)}
          </div>
          <div className="relative w-1/3 h-full float-left">
            {renderImages(pieces)}
          </div>
          <div className="relative w-1/3 h-full float-left">
            {renderImages(pieces)}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-66.666%);
          }
        }
        .animate-scroll {
          animation: scroll 52.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Gallery;
