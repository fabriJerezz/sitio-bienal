'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useUserStore from '@/store/userStore';
import Link from 'next/link';

const Page = () => {
  const { user } = useUserStore();
  const { params } = useParams();
  const [token, setToken] = useState('');
  const [rating, setRating] = useState('');
  const [pieceId, setPieceId] = useState('');

  console.log('User', user);

  const postVote = async () => {
    const url = `https://tp-final-bienal.onrender.com/vote/${pieceId}/${token}/`;
    console.log('URL:', url);
    console.log('Token:', user?.token);
    console.log('Rating:', rating);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user?.token}`,
        },
        body: JSON.stringify({
          puntuacion: rating,
        }),
      });

      if (response.ok) {
        alert('Voto Registrado');
      } else {
        console.error('Error en la respuesta:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (params && typeof params === 'string') {
      const [someToken, somePieceId, someRating] = params.split('-');
      setToken(someToken);
      setPieceId(somePieceId);
      setRating(someRating);
    }
  }, [params]);

  console.log('Token', token);
  console.log('PieceId', pieceId);
  console.log('Rating', rating);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <h1>Vote Page</h1>
      <button onClick={postVote}>Confirm</button>
      <Link href="/eventos/2">Go back</Link>
    </div>
  );
};

export default Page;
