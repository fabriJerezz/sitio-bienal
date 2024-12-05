import React from 'react';
import SculptorsHeader from '../../components/Escultores/SculptorsHeader';
import EscultoresList from '../../components/Escultores/Pagination/EscultoresList';
function page() {
  return (
    <div className="w-screen  bg-black flex flex-col gap-2">
      {/* <SculptorsHeader /> */}
      <EscultoresList />
    </div>
  );
}

export default page;
