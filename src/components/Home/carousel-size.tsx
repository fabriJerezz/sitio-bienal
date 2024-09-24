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

export function CarouselSize() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        Nuestros Escultores
      </h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3">
              <Card className="border border-gray-200">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Escultor {index + 1}
                  </h3>
                  <p className="text-sm text-gray-500">Especialidad</p>
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
