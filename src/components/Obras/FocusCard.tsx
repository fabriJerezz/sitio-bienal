'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { cn } from '@/components/lib/utils';
import useUserStore from '@/store/userStore';
import { set } from 'react-hook-form';

const PopUp = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold mb-4">Gracias por tu voto</h2>
      <p className="mb-4">
        Se te mandará un mail con la confirmación del mismo
      </p>
      <button
        onClick={onClose}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Cerrar
      </button>
    </div>
  </div>
);

const ErrorPopUp = ({
  onClose,
  error,
}: {
  onClose: () => void;
  error: string;
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold mb-4">Error</h2>

      <p className="mb-4">
        {error === 'Invalid token.'
          ? 'Necesitas loguearte para poder votar'
          : error}
      </p>

      <button
        onClick={onClose}
        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
      >
        Cerrar
      </button>
    </div>
  </div>
);

const Rating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => (
  <div className="flex space-x-2">
    {[1, 2, 3, 4, 5].map((value) => (
      <button
        key={value}
        onClick={() => setRating(value)}
        className={cn(
          'px-2 py-1 rounded-full',
          rating === value ? 'bg-blue-500 text-white' : 'bg-gray-200'
        )}
      >
        {value}
      </button>
    ))}
  </div>
);

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    handleVote,
    setRating,
    rating,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    handleVote: (card: any) => void;
    setRating: (rating: number) => void;
    rating: number;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out shadow-lg',
        hovered !== null && hovered !== index && 'blur-sm scale-[0.98]'
      )}
    >
      <Image
        src={
          `https://res.cloudinary.com/dq1vfo4c8/${card.src}` ||
          'https://via.placeholder.com/300'
        }
        alt={card.title}
        fill
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          'absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300',
          hovered === index ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="flex flex-col w-full bg-white bg-opacity-75 p-4 rounded-lg">
          <div className="text-xl md:text-2xl font-medium text-gray-900">
            {card.title}
          </div>
          <Rating rating={rating} setRating={setRating} />
          <button
            className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={() => handleVote(card)}
          >
            Votar
          </button>
        </div>
      </div>
    </div>
  )
);

Card.displayName = 'Card';

type Card = {
  id: string;
  title: string;
  src: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isErrorPopUpVisible, setIsErrorPopUpVisible] = useState(false);
  const [rating, setRating] = useState(1);
  const [error, setError] = useState('');
  const user = useUserStore((state) => state.user);

  const handleVote = async (card: Card) => {
    try {
      console.log('Votando por la obra', card.id);
      console.log('Usuario', user?.token);
      const response = await fetch(
        `https://tp-final-bienal.onrender.com/api/votar_obra/${card.id}/`,
        {
          method: 'POST',
          headers: {
            Authorization: `Token ${user?.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ puntacion: rating }),
        }
      );

      if (response.ok) {
        setIsPopUpVisible(true);
      } else {
        const error = await response.json();
        console.error('Error al enviar el voto', error);
        setError(error.detail);
        setIsErrorPopUpVisible(true);
      }
    } catch (error) {
      console.error('Error al enviar el voto', error);
    }
  };

  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
  };

  const handleCloseErrorPopUp = () => {
    setIsErrorPopUpVisible(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          handleVote={handleVote}
          setRating={setRating}
          rating={rating}
        />
      ))}
      {isPopUpVisible && <PopUp onClose={handleClosePopUp} />}
      {isErrorPopUpVisible && (
        <ErrorPopUp onClose={handleCloseErrorPopUp} error={error} />
      )}
    </div>
  );
}
