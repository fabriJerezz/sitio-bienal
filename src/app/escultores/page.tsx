import React from 'react';
import SculptorsHeader from '../../components/Escultores/SculptorsHeader';
import PaginationSculptors from '../../components/Escultores/Pagination/PaginationSculptors';
function page() {
  return (
    <div className="w-screen  bg-black flex flex-col gap-2">
      {/* <SculptorsHeader /> */}
      <PaginationSculptors />
    </div>
  );
}

export default page;
