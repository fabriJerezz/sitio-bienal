import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col ">
      <div className="p-4">
        <h2 className="text-2xl font-bold pt-32">Admin Panel</h2>
      </div>
      <nav className="flex flex-col p-4">
        <Link href="/admin/sculptors">
          <div className="py-2 px-4 hover:bg-gray-700">Sculptors</div>
        </Link>
        <Link href="/admin/users">
          <div className="py-2 px-4 hover:bg-gray-700">Users</div>
        </Link>
        <Link href="/admin/settings">
          <div className="py-2 px-4 hover:bg-gray-700">Settings</div>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
