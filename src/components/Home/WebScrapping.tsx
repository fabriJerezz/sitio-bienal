import React, { useEffect } from 'react';
import { useState } from 'react';
import { set } from 'react-hook-form';
import { New } from '../../types';
import { GralCarousel } from './GralCarousel';
import { Oswald } from 'next/font/google';

const oswald = Oswald({ subsets: ['latin'] });

function WebScrapping() {
  const [news, setNews] = useState<New[]>([]); //
  const [artirsts, setArtists] = useState([]); //
  const [auctions, setAuctions] = useState([]); //

  async function fetchNotices() {
    try {
      const response = await fetch(
        'https://informacionexterna.onrender.com/api/news/'
      );
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Failed getting news', error);
    }
  }

  async function fetchArtists() {
    try {
      const response = await fetch(
        'https://informacionexterna.onrender.com/api/artists/'
      );
      const data = await response.json();
      setArtists(data);
    } catch (error) {
      console.error('Error getting artists', error);
    }
  }

  async function fetchAuctions() {
    try {
      const response = await fetch(
        'https://informacionexterna.onrender.com/api/auctions/'
      );
      const data = await response.json();
      setAuctions(data);
    } catch (error) {
      console.error('Error getting auctions', error);
    }
  }

  useEffect(() => {
    fetchNotices();
    fetchArtists();
    fetchAuctions();
  }, []);

  console.log('Noticias', news);
  console.log('Artistas', artirsts);
  console.log('Subastas', auctions);

  return (
    <section
      className={`relative flex w-full justify-center flex-col bg-black text-white ${oswald.className}`}
    >
      <h1 className="text-white text-6xl w-full text-center mb-6 mt-6">
        Ultimas Noticias
      </h1>
      <div className="w-full flex justify-center bg-black text-black pt-10 pb-10 ">
        <GralCarousel array={news} />
      </div>
      <h1 className="text-white text-6xl w-full  mb-6 mt-6">Subastas</h1>
      <div className="w-full flex justify-center bg-black text-black pt-10 pb-10 ">
        <GralCarousel array={auctions} />
      </div>
      <h1 className="text-white text-6xl w-full  mb-6 mt-6">Artistas</h1>
      <div className="w-full flex justify-center bg-black text-black pt-10 pb-10 ">
        <GralCarousel array={artirsts} />
      </div>
    </section>
  );
}

export default WebScrapping;
