'use client';

import * as React from 'react';
import { Card, CardContent } from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { useEffect, useState } from 'react';
import CardInfo from './SculptureShow/CardInfo';

export function CarouselSize() {
  const [sculptors, setSculptors] = useState([]);

  const fetchSculptors = async () => {
    try {
      console.log('Fetching sculptors...');
      const response = await fetch(
        'https://tp-final-bienal.onrender.com/api/escultores/',
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch sculptors:', error);
      return [];
    }
  };

  useEffect(() => {
    const getSculptors = async () => {
      console.log('Calling fetchSculptors...');
      const fetchedSculptors = await fetchSculptors();
      console.log('Setting sculptors state...');
      setSculptors(fetchedSculptors);
    };
    getSculptors();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {sculptors.map((sculptor, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3">
              <Card className="border border-gray-200">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <CardInfo
                    key={index}
                    country={sculptor.pais}
                    name={sculptor.nombre}
                    img={sculptor.imagen}
                    mov={sculptor.movimiento}
                    history={sculptor.historia}
                    province={sculptor.provincia}
                    technique={sculptor.tecnica}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
