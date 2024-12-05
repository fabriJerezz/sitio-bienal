'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useUserStore from '@/store/userStore';
import Link from 'next/link';
import Image from 'next/image';
import logo from 'public/imgs/logoBienal.jpg';

const Page = () => {
  const { user } = useUserStore();
  const { params } = useParams();

  const [confirmVote, setConfirmVote] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setConfirmVote(false);
    if (params && typeof params === 'string') {
      const [someToken, somePieceId, someRating] = params.split('-');
      const postVote = async () => {
        const url = `https://tp-final-bienal.onrender.com/vote/${somePieceId}/${someToken}/`;

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
            setConfirmVote(true);
          } else {
            const errorData = await response.json();
            console.log(errorData.detail);
            console.log('Error en la respuesta:', errorData.error);
            setError(errorData.detail);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      postVote();
    }
  }, [user?.token]);

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <div className="w-full h-14 bg-black absolute top-0 left-0"></div>
      <Image src={logo} alt="Voto Confirmado" width={250} height={250} />
      {confirmVote ? (
        <div className="flex flex-col border border-black justify-center items-center gap-2 p-4 rounded-lg">
          <h1 className="text-3xl font-semibold">
            ¡Gracias por realizar la votacion!
          </h1>
          <p>Se te mandara un mail de confirmacion</p>
          <Link
            href="/eventos"
            className="bg-black hover:bg-gray-950 text-white font-bold py-2 px-4 rounded"
          >
            Volver a inicio
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {error === 'Ya has votado por esta obra' ? (
            <>
              <h1 className="text-4xl">Usted ya ha votado por esta obra</h1>
              <p>
                Recuerde que solo puede votar a la misma obra, una unica vez
              </p>
              <Image
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGdmbjZqeXVseXNpbDZ3ZmN3b3UwamgwcG1jeXZoNTcyZGoxYzhnOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YTzh3zw4mj1XpjjiIb/giphy.webp"
                width={200}
                height={200}
                alt="Error Gif"
              />
            </>
          ) : error === 'Invalid token.' ? (
            <>
              <h1 className="text-3xl">Error de autenticación</h1>
              <p>Por favor, inicie sesión nuevamente.</p>
              <Image
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGdmbjZqeXVseXNpbDZ3ZmN3b3UwamgwcG1jeXZoNTcyZGoxYzhnOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YTzh3zw4mj1XpjjiIb/giphy.webp"
                width={200}
                height={200}
                alt="Error Gif"
              />
            </>
          ) : error === 'Token inválido o expirado.' ? (
            <>
              <h1 className="text-3xl">Codigo QR Expirado</h1>
              <p>El codigo vence cada 1 minuto</p>

              <Image
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGdmbjZqeXVseXNpbDZ3ZmN3b3UwamgwcG1jeXZoNTcyZGoxYzhnOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YTzh3zw4mj1XpjjiIb/giphy.webp"
                width={200}
                height={200}
                alt="Error Gif"
              />
            </>
          ) : error === 'Votacion finalizada' ? (
            <>
              <h1 className="text-3xl">
                No puede votar en eventos ya finalizados o en eventos por
                iniciar
              </h1>
              <p>Recuerde solo puede votar en eventos en curso</p>
              <Image
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGdmbjZqeXVseXNpbDZ3ZmN3b3UwamgwcG1jeXZoNTcyZGoxYzhnOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YTzh3zw4mj1XpjjiIb/giphy.webp"
                width={200}
                height={200}
                alt="Error Gif"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl">
                Esperando confirmacion de nuestra base de datos
              </h1>
              <Image
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW9vaHNnM3MybG9nMm56bzQzYzFkenlyanM3N3pzNnY2OXdxcHdyeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.webp"
                width={150}
                height={150}
                alt="Loading Gif"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
