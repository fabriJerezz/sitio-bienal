import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Link from 'next/link';

interface QRProps {
  rating: number;
  pieceId: string;
}

export default function VoteQR({ rating, pieceId }: QRProps) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      const response = await fetch(
        'https://tp-final-bienal.onrender.com/generate-token'
      ); // Cambiar a la ruta correcta LA DE ENZO
      const data = await response.json();
      setToken(data.token);
    }

    fetchToken();
  }, []);

  const url = ` http://localhost:3000/eventos/vote/${token}-${pieceId}-${rating}`;

  return (
    <div>
      {token ? <QRCode value={url} /> : <p>Cargando token...</p>}

      <Link href={url}>IR A LA RUTA</Link>
    </div>
  );
}
