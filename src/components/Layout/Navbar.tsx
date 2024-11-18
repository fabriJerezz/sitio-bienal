'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import useUserStore from '@/store/userStore';
import { LoginDropdownMenu } from '@/components/Users/login-dropdown-menu';
import ConfigurationIcon from '../ui/configurationIcon';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const user = useUserStore.getState().user;
  const isAdmin = useMemo(() => user?.staff, [user]);

  console.log(user);
  const controlNavbar = (): void => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
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
  }, []);
  return (
    <div
      className={`text-secondary w-screen z-50 flex items-center fixed py-3 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between w-[90%] mx-auto">
        <Link href="/" className="text-2xl font-bold">
          Sitio Bienal
        </Link>
        <div className="flex items-center gap-4">
          {isAdmin && <Link href="/admin">admin</Link>}
          {!user && <LoginDropdownMenu />}
          {user && (
            <div className="flex gap-2 border border-solid px-2 py-1 rounded-lg">
              <button onClick={() => useUserStore.getState().logout()}>
                Salir
              </button>
              <button>
                <ConfigurationIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
