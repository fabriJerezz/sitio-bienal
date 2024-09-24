'use client';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import esc from './public/Venus_of_Arles_Louvre_Ma439_n08.webp';

interface CardInfoProps {
  country: string;
  name: string;
  img: string;
  mov: string;
  history: string;
  province: string;
  technique: string;
}

export default function CardInfo({
  country,
  name,
  img,
  mov,
  history,
  province,
  technique,
}: CardInfoProps) {
  const [showHidden, setShowHidden] = useState(false);

  const handleClick = () => {
    setShowHidden(!showHidden);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="flex w-64 bg-primary z-3 flex-col relative rounded-lg border-secondary border p-2 transform transition-transform hover:scale-105 cursor-pointer"
      >
        <header className="relative  mb-2">
          <h1 className="relative text-3xl tracking-widest text-secondary font-bold">
            {name}
          </h1>
          <h2 className="relative text-xl ml-3 italic">{province}</h2>
        </header>
        <div className="relative w-full h-full">
          <Image
            alt="Descripción de la imagen"
            src={esc}
            className="w-full h-full rounded-xl"
          ></Image>
        </div>
        <button className="mt-5 relative bg-secundary border-secondary border pr-10 pl-10 pt-1 pb-1 rounded-lg text-xl  ">
          Votar
        </button>
      </div>
    </>
  );
}
