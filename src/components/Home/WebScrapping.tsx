import React, { useEffect } from 'react';
import { useState } from 'react';
import { set } from 'react-hook-form';

function WebScrapping() {
  const [news, setNews] = useState([]); //
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

  return <div>WebScrapping</div>;
}

export default WebScrapping;
