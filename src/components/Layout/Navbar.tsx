'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';



const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const user = useUserStore.getState().user;
  const isAdmin = useMemo(() => user?.rol === 'staff', [user]);

  const controlNavbar = (): void => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShowNavbar(false);
      } else {
        // if scroll up show the navbar
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);
  return (
    <div
      className={`text-secondary w-screen z-50 flex items-center fixed py-3 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between w-[90%] mx-auto">
        <div className="text-2xl font-bold">Sitio Bienal</div>
        <div className="flex items-center gap-4">
          {isAdmin && 
            <Link href="/admin">admin</Link>
          }
          <Link href="/">Inicio</Link>
          <Link href="/">Sobre nosotros</Link>
          <Link href="/">Contacto</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
