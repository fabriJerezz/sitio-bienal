"use client";
import Image from 'next/image'
import esc from './public/Venus_of_Arles_Louvre_Ma439_n08.webp'
import HiddenInfo from './CardInfo/HiddenInfo';


interface CardInfoProps {
  pais: string;
  años: number;
  nombre: string;
  img: string;
  art: string;
  tec: string;
}

export default function CardInfo({pais,nombre,img}: CardInfoProps) {
  return (
     <div className='flex w-80 bg-primary z-3 flex-col items-center relative rounded-lg border-secondary border p-2 transform transition-transform hover:scale-105 cursor-pointer'>
        <header className='relative'>
            <h1 className="relative text-xl tracking-widest text-secondary font-bold m-2">Nombre</h1>
        </header>
        <div className='relative w-full h-full'>
            <Image alt="Descripción de la imagen" src={esc} className='w-full h-full'></Image>
        </div>
        <button className='mt-5 relative bg-secundary border-secondary border pr-10 pl-10 pt-1 pb-1 rounded-lg text-xl  '>Votar</button>
    </div>
  )
}
