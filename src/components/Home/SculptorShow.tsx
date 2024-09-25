import { CarouselSize } from './carousel-size';
import { useState, useEffect } from 'react';

export default function Slider() {
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
    <>
      <section className=" relative w-full min-h-screen bg-primary/50 flex flex-col items-center justify-center">
        <header className="relative text-color-black  flex flex-col text-center mb-10 ">
          <h1 className="relative p-0 m-0 text-6xl">
            Nuestros <span className="font-bold">Escultores</span>
          </h1>
        </header>
        <CarouselSize />
      </section>
    </>
  );
}
