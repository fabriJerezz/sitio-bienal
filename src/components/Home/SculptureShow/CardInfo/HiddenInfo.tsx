'use client';
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import venusImage from '../public/Venus_of_Arles_Louvre_Ma439_n08.webp';
import Image from 'next/image';

interface HiddenInfoProps {
  handleClick: () => void;
  pais: string;
  años: number;
  movimiento: string;
  nombre: string;
  historia: string;
  tec: string;
}

const HiddenInfo: React.FC<HiddenInfoProps> = ({
  handleClick,
  historia,
  pais,
  nombre,
  años,
  movimiento,
  tec,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const allScultures = [
    {
      id: 1,
      img: venusImage,
      nombre: 'Venus de Arles',
      pais: 'Francia',
      años: 1000,
      movimiento: 'Renacimiento',
      frase: 'Una gran obra de arte',
    },
    {
      id: 2,
      img: venusImage,
      nombre: 'Venus de Arles',
      pais: 'Francia',
      años: 1000,
      movimiento: 'Renacimiento',
    },
  ];

  //const sculturesToShow = allScultures.filter((sculture) => sculture.id === 1);

  useEffect(() => {
    function checkClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handleClick();
      }
    }

    document.addEventListener('mousedown', checkClick);
    return () => {
      document.removeEventListener('mousedown', checkClick);
    };
  }, [handleClick]);

  return (
    <div
      className="w-screen h-screen absolute z-50 top-0 left-0 bottom-0 right-0 flex justify-center items-center"
      style={{ backdropFilter: 'blur(5px)' }}
    >
      <div
        ref={ref}
        className="bg-primary relative w-3/4 h-3/4 flex flex-col items-center justify-between border-b p-5 rounded-2xl"
      >
        <header className="flex w-full bg-red-450 justify-between border-b pt-2 pb-2">
          <div className="w-1/2">
            <h1 className="font-extrabold text-3xl tracking-widest">
              {nombre}
            </h1>
          </div>
          <div className="w-1/2">
            <h1 className="font-extrabold text-3xl tracking-widest">
              Esculturas
            </h1>
          </div>
        </header>
        <div className="flex w-full h-full pt-4 pb-0 m-0">
          <div className="relative w-1/2 h-full p-2">
            <ul className="text-2xl flex flex-col w-full gap-2">
              <li>
                Pais: <span className="font-bold">{pais}</span>
              </li>
              <li>
                Años: <span className="font-bold">{años}</span>
              </li>
              <li>
                Movimiento Artistico:{' '}
                <span className="font-bold">{movimiento}</span>
              </li>
              <li>
                Tecnica: <span className="font-bold">{tec}</span>
              </li>
            </ul>
            <video
              className="rounded-lg w-full mt-2"
              muted
              loop
              autoPlay
              src="../../Videos/fondo.webm"
            ></video>
            <p className="text-center font-bold text-lg">{historia}</p>
          </div>
          <div className="relative w-1/2 h-full p-8 border-l"></div>
        </div>
      </div>
    </div>
  );
};

export default HiddenInfo;
