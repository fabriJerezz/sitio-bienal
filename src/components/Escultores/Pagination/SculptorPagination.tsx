import React from 'react';
import Pagination from './Pagination';

function SculptorPagination({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}) {
  // Obtiene la página actual desde los parámetros de búsqueda o usa 1 como valor predeterminado
  const currentPage = Number(searchParams?.page) || 1;

  // Número total de páginas (esto podría venir de una API o cálculo basado en datos reales)
  const totalPages = 4;

  // Array de entradas de ejemplo (en una aplicación real, esto vendría de una base de datos o API)
  const entries = [
    'entry1',
    'entry2',
    'entry3',
    'entry4',
    'entry5',
    'entry6',
    'entry7',
    'entry8',
    'entry9',
    'entry10',
  ];

  // Calcula el índice de inicio y fin para la página actual
  const entriesPerPage = 3; // Ajusta este número según sea necesario
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  // Obtiene las entradas para la página actual
  const currentEntries = entries.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        {currentEntries.map((entry, index) => (
          <div key={`${entry}-${index + startIndex}`}>{entry}</div>
        ))}
      </div>

      <Pagination totalPages={totalPages} />
    </>
  );
}

export default SculptorPagination;
