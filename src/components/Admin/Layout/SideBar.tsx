'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/admin' },
  { name: 'Escultores', href: '/admin/escultores' },
  { name: 'Usuarios', href: '/admin/usuarios' },
  { name: 'Obras', href: '/admin/obras' },
  { name: 'Configuración', href: '/admin/configuracion' },
];

const Sidebar = () => {
  const path = usePathname();
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold pt-32">Panel de Admin</h2>
      </div>
      <nav className="flex flex-col p-4">
        {links.map((link) => (
          <Link key={link.name} href={link.href}>
            <div
              className={`py-2 px-4 hover:bg-gray-700 hover:rounded-md flex items-center ${
                path === link.href
                  ? 'bg-gray-700 border-l-4 border-blue-500 rounded-md'
                  : ''
              }`}
            >
              {link.name}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
