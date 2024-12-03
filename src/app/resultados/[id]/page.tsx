'use client';
import Plot from '@/components/Events/Plot';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function Page() {
  const [data, setData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://tp-final-bienal.onrender.com/api/resultados/${id}/`
        );

        const data = await response.json();
        setData(data);
        console.log(data.detail);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [id]);

  const values = [];
  const labels = [];
  for (const key in data) {
    labels.push(key);
    values.push(data[key].total_votos);
  }

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
      <div className="  w-1/2 bg-white shadow-lg rounded-lg p-4 object-cover">
        {data.detail === 'No hay votaciones para este evento' ? (
          <p className="text-center text-red-500">
            No hay votaciones para este evento
          </p>
        ) : (
          <Plot
            data={graphData}
            layout={layout}
            config={{ responsive: true }}
          />
        )}
      </div>
    </div>
  );
}
