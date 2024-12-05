// components/FlipCards.tsx
'use client';
import React, { useEffect, useState } from 'react';
import '@/app/globals.css';

interface Escultura {
  id: number;
  titulo: string;
  foto1: string;
}

interface FlipCardsProps {
  name: string;
  location: string;
  frontImage?: string;
  backImage?: string;
  escultorId: number;
}

const FlipCards: React.FC<FlipCardsProps> = ({
  name,
  location,
  frontImage,
  backImage,
  escultorId,
}) => {
  const [obras, setObras] = useState<Escultura[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const frontImageUrl = frontImage
    ? `https://res.cloudinary.com/dq1vfo4c8/${frontImage}`: 'https://via.placeholder.com/300';
  const backImageUrl = backImage
    ? `https://res.cloudinary.com/dq1vfo4c8/${backImage}` : 'https://via.placeholder.com/300';

  const fetchObras = async (escultorId: number): Promise<Escultura[]> => {
    try {
      const res = await fetch(
        `https://tp-final-bienal.onrender.com/api/obras/?id_escultor=${escultorId}`
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error('Failed to fetch obras');
      }
      setObras(data.results);
      return data.results;
    } catch (error) {
      console.error('Error fetching obras:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchObras(escultorId);
  }, [escultorId]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % obras.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + obras.length) % obras.length
    );
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Contenedor de la tarjeta */}
      <div
        className="flip-card-wrapper mb-2"
        onMouseEnter={toggleFlip}
        onMouseLeave={toggleFlip}
      >
        <div
          className={`flip-card-inner rounded-lg ${isFlipped ? 'flipped' : ''}`}
        >
          {/* Parte frontal */}
          <div className="flip-card-front rounded-lg">
            <img
              src={frontImageUrl}
              alt="Front"
              className="card-image rounded-lg object-cover w-full h-full"
            />
          </div>
          {/* Parte trasera */}
          <div className="flip-card-back bg-white rounded-lg relative">
            {obras.length > 0 && (
              <>
                <img
                  src={`https://res.cloudinary.com/dq1vfo4c8/${obras[currentIndex].foto1}`}
                  alt={obras[currentIndex].titulo}
                  className="object-cover w-full h-full rounded-lg"
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
                  <button
                    onClick={handlePrevious}
                    className="px-4 py-2 bg-gray-200/50 border-gray-300 rounded-full hover:bg-gray-400/50 text-black hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-left"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M20 15h-8v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h8a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1z" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-gray-200/50 border-gray-300 rounded-full hover:bg-gray-400/50 text-black hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-right"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 9h8v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1z" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Nombre en la parte inferior */}
      <div className="text-center text-lg font-semibold text-white mt-1 mb-10">
        {isFlipped && obras.length > 0 ? obras[currentIndex].titulo : name}
      </div>
    </div>
  );
};

export default FlipCards;
