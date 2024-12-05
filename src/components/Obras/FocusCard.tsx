'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { cn } from '@/components/lib/utils';
import VoteQR from '../lib/VoteQR';

const PopUp = ({
  onClose,
  puntuacion,
  cardId,
}: {
  onClose: () => void;
  puntuacion: number;
  cardId: string;
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full flex flex-col justify-center items-center">
      <p>Escanea el QR para confirmar tu voto</p>
      <VoteQR rating={puntuacion} pieceId={cardId} />
      <button
        onClick={onClose}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
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
    handleVote: (id: number) => void;
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
        <div className="flex flex-col w-full bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <div className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
            {card.title}
          </div>
          <p className="text-lg text-gray-700 mb-4">Rating</p>
          <Rating rating={rating} setRating={setRating} />
          <button
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={() => handleVote(card.id)}
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
  src: string | null | File;
  description: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isErrorPopUpVisible, setIsErrorPopUpVisible] = useState(false);
  const [rating, setRating] = useState(1);
  const [error, setError] = useState('');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleVote = (id: any) => {
    setSelectedCardId(id);
    setIsPopUpVisible(true);
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
      {isPopUpVisible && (
        <PopUp
          onClose={handleClosePopUp}
          puntuacion={rating}
          cardId={selectedCardId!}
        />
      )}
    </div>
  );
}
