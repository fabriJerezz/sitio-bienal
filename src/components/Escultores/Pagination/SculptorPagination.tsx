import React from 'react';
import Pagination from './Pagination';

function SculptorPagination({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = 10;

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

  // Calculate the start and end index for the current page
  const entriesPerPage = 3; // Adjust this number as needed
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
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
