'use client';
import React from 'react';

import Image from 'next/image';
import esc from '../../../../public/imgs/esc1.jpg';
import { getCountryCode } from '../../lib/getCountryCode';

interface CardInfoProps {
  country: string;
  name: string;
  img: string;
  mov: string;
  history: string;
  province: string;
  technique: string;
  lastname: string;
}

export default function CardInfo({
  country,
  name,
  img,
  mov,
  history,
  province,
  technique,
  lastname,
}: CardInfoProps) {
  // const [showHidden, setShowHidden] = useState(false);

  // const handleClick = () => {
  //   setShowHidden(!showHidden);
  // };

  return (
    <>
      <div
        // onClick={handleClick}
        className="flex w-90 bg-black z-3 flex-col relative rounded-lg border-secondary    text-white"
      >
        <div className="relative w-full h-full">
          <Image
            alt="Descripción de la imagen"
            src={esc}
            className="w-full h-full rounded-xl transform transition-transform hover:scale-105 cursor-pointer"
          ></Image>
        </div>
        <h2 className="text-3xl font-bold  text-white mt-2 relative">
          <Image
            alt="Country flag"
            src={`https://flagcdn.com/${getCountryCode(country)}.svg`}
            width={80}
            height={80}
            className="absolute  right-8 bottom-3 "
          ></Image>
          {name} {lastname}
        </h2>
        <div className="flex justify-end m-0 p-0">
          <button className="text-white p-1 rounded-lg text-2xl border inline-block m-0  font-bold pl-2 pr-2 hover:bg-white/20 transition-all duration-75 ease-in-out">
            Votar
          </button>
        </div>
      </div>
    </>
  );
}
