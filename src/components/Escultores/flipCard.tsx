// components/FlipCards.tsx
'use client';
import React from 'react';
import './FlipCard.css';

interface FlipCardsProps {
  name: string;
  location: string;
  frontImage?: string;
  backImage?: string;
}

const FlipCards: React.FC<FlipCardsProps> = ({ name, location, frontImage, backImage }) => {
  const frontImageUrl = frontImage ? `https://res.cloudinary.com/dq1vfo4c8/${frontImage}` : 'https://via.placeholder.com/300';
  const backImageUrl = backImage ? `https://res.cloudinary.com/dq1vfo4c8/${backImage}` : 'https://via.placeholder.com/300';

  return (
    <div className="flip-card-wrapper">
      <div className="flip-card-inner">
        {/* Parte frontal de la tarjeta */}
        <div className="flip-card-front">
          <img src={frontImageUrl} alt="Front" className="card-image" />
          <div className="card-name">{name}</div>
        </div>
        {/* Parte trasera de la tarjeta */}
        <div className="flip-card-back">
          <img src={backImageUrl} alt="Back" className="card-image" />
          <div className="card-location">{location}</div>
        </div>
      </div>
    </div>
  );
};

export default FlipCards;