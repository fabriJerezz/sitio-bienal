import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Piece } from '@/types';
import img1 from '../../../../public/imgs/esc1.jpg';
import img2 from '../../../../public/imgs/esc2.jpg';
import img3 from '../../../../public/imgs/esc3.jpg';
import img4 from '../../../../public/imgs/esc4.jpg';
import img5 from '../../../../public/imgs/esc5.jpg';
import img6 from '../../../../public/imgs/esc6.jpg';

const Gallery = () => {
  const [pieces, setPieces] = useState<Piece[]>([]);

  const fetchObras = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    try {
      setPieces(data.results);
      console.log(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchObras('https://tp-final-bienal.onrender.com/api/obras');
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col bg-black overflow-hidden">
      <div className="inline-flex flex-col p-1 border-white border-right mt-5  ml-5">
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
            <Image
              src={img1}
              alt="obra"
              className="absolute w-1/4 h-auto top-[2%] left-[10%]"
            />
            <Image
              src={img2}
              alt="obra"
              className="absolute w-1/4 h-auto top-[15%] left-[40%]"
            />
            <Image
              src={img3}
              alt="obra"
              className="absolute w-1/4 h-auto top-[30%] left-[20%]"
            />
            <Image
              src={img4}
              alt="obra"
              className="absolute w-1/4 h-auto top-[15%] left-[70%]"
            />
            <Image
              src={img5}
              alt="obra"
              className="absolute w-1/4 h-auto top-[20%] left-[60%]"
            />
            <Image
              src={img6}
              alt="obra"
              className="absolute w-1/4 h-auto top-[50%] left-[80%]"
            />
          </div>
          <div className="relative w-1/3 h-full float-left">
            <Image
              src={img1}
              alt="obra"
              className="absolute w-1/4 h-auto top-[10%] left-[10%]"
            />
            <Image
              src={img2}
              alt="obra"
              className="absolute w-1/4 h-auto top-[30%] left-[40%]"
            />
            <Image
              src={img3}
              alt="obra"
              className="absolute w-1/4 h-auto top-[60%] left-[20%]"
            />
            <Image
              src={img4}
              alt="obra"
              className="absolute w-1/4 h-auto top-[15%] left-[70%]"
            />
            <Image
              src={img5}
              alt="obra"
              className="absolute w-1/4 h-auto top-[50%] left-[60%]"
            />
            <Image
              src={img6}
              alt="obra"
              className="absolute w-1/4 h-auto top-[45%] left-[80%]"
            />
          </div>
          <div className="relative w-1/3 h-full float-left">
            <Image
              src={img1}
              alt="obra"
              className="absolute w-1/4 h-auto top-[10%] left-[10%]"
            />
            <Image
              src={img2}
              alt="obra"
              className="absolute w-1/4 h-auto top-[35%] left-[40%]"
            />
            <Image
              src={img3}
              alt="obra"
              className="absolute w-1/4 h-auto top-[30%] left-[20%]"
            />
            <Image
              src={img4}
              alt="obra"
              className="absolute w-1/4 h-auto top-[15%] left-[70%]"
            />
            <Image
              src={img5}
              alt="obra"
              className="absolute w-1/4 h-auto top-[20%] left-[60%]"
            />
            <Image
              src={img6}
              alt="obra"
              className="absolute w-1/4 h-auto top-[50%] left-[80%]"
            />
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
