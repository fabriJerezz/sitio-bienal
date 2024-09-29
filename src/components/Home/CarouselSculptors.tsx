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
import { useEffect, useState, Suspense } from 'react';
import CardInfo from './SculptureShow/SculptorCard';

const fetchSculptors = async () => {
  try {
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
    return data.results;
  } catch (error) {
    console.error('Failed to fetch sculptors:', error);
    return [];
  }
};

export function CarouselSculptors() {
  const [sculptors, setSculptors] = useState([]);

  useEffect(() => {
    fetchSculptors().then(setSculptors);
  }, []);

  console.log(sculptors);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {sculptors.map((sculptor, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="border border-gray-200">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <CardInfo
                    key={index}
                    country={sculptor.nacionalidad}
                    name={sculptor.nombre}
                    img={sculptor.imagen}
                    mov={sculptor.movimiento}
                    history={sculptor.historia}
                    province={sculptor.nacionalidad}
                    technique={sculptor.tecnica}
                    lastname={sculptor.apellido}
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
