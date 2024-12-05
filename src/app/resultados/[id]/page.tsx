'use client';
import Plot from '@/components/Events/Plot';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function Page() {
  const [data, setData] = useState([]);
  const [mostVoted, setMostVoted] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://tp-final-bienal.onrender.com/api/resultados/${id}/`
        );

        const jsonData = await response.json();
        const transformedData = Object.keys(jsonData).map((key) => ({
          name: key,
          total_votos: jsonData[key].total_votos,
        }));
        setData(transformedData);

        if (transformedData.length > 0) {
          const maxVoted = transformedData.reduce((prev, current) =>
            prev.total_votos > current.total_votos ? prev : current
          );
          setMostVoted(maxVoted);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [id]);

  const values = data.map((item) => item.total_votos);
  const labels = data.map((item) => item.name);

  const graphData = [
    {
      type: 'pie',
      values,
      labels,
      hole: 0.3,
    },
  ];

  const layout = {
    title: '',
    xaxis: {
      title: 'Eje X',
    },
    yaxis: {
      title: 'Eje Y',
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black">
      <h1 className="text-3xl font-extrabold text-white mb-6">
        Resultados del evento
      </h1>
      <div className="w-1/2 bg-white shadow-lg rounded-lg p-4 object-cover">
        {data.length === 0 ? (
          <p className="text-center text-red-500">
            No hay votaciones para este evento
          </p>
        ) : (
          <>
            <Plot
              data={graphData}
              layout={layout}
              config={{ responsive: true }}
            />
            <p className="text-center text-black text-2xl">
              Total de votos: {values.reduce((a, b) => a + b, 0)}
            </p>
            {mostVoted && (
              <h2 className="text-center text-black text-xl">
                Obra más votada: "{mostVoted.name}" con{' '}
                <span>{mostVoted.total_votos} puntos de votación</span>
              </h2>
            )}
          </>
        )}
      </div>
    </div>
  );
}
