import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

export default function VoteQR() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      const response = await fetch('/api/generate-token'); // Cambiar a la ruta correcta LA DE ENZO
      const data = await response.json();
      setToken(data.token);
    }

    fetchToken();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR para votar</h1>
      {token ? <QRCode value={token} /> : <p>Cargando token...</p>}
    </div>
  );
}
