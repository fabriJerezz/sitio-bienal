'use client';
import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const generatePagination = (currentPage: number, totalPages: number) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className="flex gap-2 ">
        <a href={createPageURL(currentPage - 1)}>Prev</a>
        {allPages.map((page) => (
          <a key={page} href={createPageURL(page)}>
            {page}
          </a>
        ))}
        <a href={createPageURL(currentPage + 1)}>Next</a>
      </div>
    </>
  );
}

export default Pagination;
