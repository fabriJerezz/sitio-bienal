import React from 'react';
import Image from 'next/image';
import img1 from '../../../../public/imgs/esc1.jpg';
import img2 from '../../../../public/imgs/esc2.jpg';
import img3 from '../../../../public/imgs/esc3.jpg';
import img4 from '../../../../public/imgs/esc4.jpg';
import img5 from '../../../../public/imgs/esc5.jpg';
import img6 from '../../../../public/imgs/esc6.jpg';

const Gallery = () => {
  return (
    <div className="relative w-screen h-screen flex flex-col bg-black ">
      <div className="inline-flex flex-col p-1 border-white border-right mt-5 mb-5 ml-5">
        <h1 className="text-4xl font-bold text-white border-r-4 border-white  w-max pr-5">
          Galeria de
        </h1>
        <h2 className="text-4xl font-extrabold text-white ml-40 mt-3 w-max border-r-4 border-white pr-5">
          Obras
        </h2>
      </div>
      <div className="relative w-screen h-screen overflow-hidden">
        <div className="relative w-full h-full animate-scroll">
          <Image
            src={img1}
            alt="obra"
            className="absolute w-90 h-auto"
            style={{ top: '10%', left: '30%' }}
          />
          <Image
            src={img2}
            alt="obra"
            className="absolute w-90 h-auto"
            style={{ bottom: '30%', right: '40%' }}
          />
          <Image
            src={img3}
            alt="obra"
            className="absolute w-90 h-auto"
            style={{ top: '50%', left: '30%' }}
          />
          <Image
            src={img4}
            alt="obra"
            className="absolute w-90 h-auto"
            style={{ top: '70%', left: '80%' }}
          />
          <Image
            src={img5}
            alt="obra"
            className="absolute w-90 h-auto"
            style={{ top: '20%', right: '70%' }}
          />
          <Image
            src={img6}
            alt="obra"
            className="absolute w-90 h-auto"
            style={{ top: '60%', left: '40%' }}
          />
          <Image
            src={img6}
            alt="obra"
            className="absolute w-90 h-auto"
            style={{ top: '20%', left: '30%' }}
          />
          <Image
            src={img6}
            alt="obra"
            className="absolute w-90 h-auto"
            style={{ top: '30%', left: '70%' }}
          />
          <Image
            src={img6}
            alt="obra"
            className="absolute w-90 h-auto"
            style={{ top: '60%', left: '70%' }}
          />
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Gallery;
