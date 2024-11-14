// components/FlipCards.tsx
'use client';
import React from 'react';
import '@/app/globals.css';
import { useEffect, useState } from 'react';
import { Escultura } from '@/components/Esculturas/paginationEsculturas';

interface FlipCardsProps {
  name: string;
  location: string;
  frontImage?: string;
  backImage?: string;
  escultorId: number;
}

const FlipCards: React.FC<FlipCardsProps> = ({ name, location, frontImage, backImage, escultorId}) => {
  const [obras, setObras] = useState<Escultura[]>([]);
  const frontImageUrl = frontImage ? `https://res.cloudinary.com/dq1vfo4c8/${frontImage}` : 'https://via.placeholder.com/300';
  const backImageUrl = backImage ? `https://res.cloudinary.com/dq1vfo4c8/${backImage}` : 'https://via.placeholder.com/300';

  const fetchObras = async (escultorId: number): Promise<Escultura[]> => {
    try {
      const res = await fetch(`https://tp-final-bienal.onrender.com/api/obras/?escultor_id=${escultorId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error('Failed to authenticate user');
      }
      setObras(data.results);
      return data.results;
    } catch (error) {
      console.error('Error fetching obras:', error);
      throw error;
    }
  }

  useEffect(() => {
     fetchObras(escultorId);
  }, []);


  return (
    <div className="flip-card-wrapper ">
      <div className="flip-card-inner rounded-lg">
        {/* Parte frontal de la tarjeta */}
        <div className="flip-card-front rounded-lg">
          <img src={frontImageUrl} alt="Front" className="card-image  rounded-lg" />
          <div className="card-name">{name}</div>
        </div>
        {/* Parte trasera de la tarjeta */}
        <div className="flip-card-back bg-white rounded-lg">
          <img src={backImageUrl} alt="Back" className="card-image" />
          <div className="card-location">{location}</div>

          <div className="card-obras">
            {obras.map((obra) => (
              <div key={obra.id}>{obra.titulo}</div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCards;