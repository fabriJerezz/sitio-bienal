import React from 'react';
import Header from '../components/Home/Header';
import { CarouselSize } from '../components/Home/carousel-size';

export default function Home() {
  return (
    <>
      <Header />
      <div className="mt-20 flex items-center justify-center">
        <CarouselSize />
      </div>
    </>
  );
}
