import React from 'react';
import SculptorsHeader from '../../components/Escultores/SculptorsHeader';
import EscultoresList from '../../components/Escultores/Pagination/PaginationSculptors';

function Page() {
  return (
    <div className="w-full bg-black flex flex-col gap-2 pt-20">
      {/* <SculptorsHeader /> */}
      <EscultoresList />
    </div>
  );
}

export default Page;
