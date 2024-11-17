'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useUserStore from '@/store/userStore';
import Link from 'next/link';

const Page = () => {
  const { user } = useUserStore();
  const { params } = useParams();

  console.log('User', user);

  useEffect(() => {
    if (params && typeof params === 'string') {
      const [someToken, somePieceId, someRating] = params.split('-');
      console.log('Token:', someToken);
      console.log('PieceId:', somePieceId);
      console.log('Rating:', someRating);

      console.log(user);

      const postVote = async () => {
        const url = `https://tp-final-bienal.onrender.com/vote/${somePieceId}/${someToken}/`;
        console.log('URL:', url);
        console.log('Token:', user?.token);
        console.log('Rating:', someRating);

        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${user?.token}`,
            },
            body: JSON.stringify({
              puntuacion: someRating,
            }),
          });

          if (response.ok) {
            alert('Voto Registrado');
          } else {
            const errorData = await response.json();
            console.error('Error en la respuesta:', errorData.detail);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      postVote();
    }
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <h1>Vote Page</h1>
      <Link href="/eventos/2">Go back</Link>
    </div>
  );
};

export default Page;
