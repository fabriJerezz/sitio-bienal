import useUserStore from '@/store/userStore';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const user = useUserStore((state) => state.user);
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);

  const newUser = {
    username: 'fabri',
    password: 'elfrontend12',
  };

  useEffect(() => {
    login(newUser);
  }, []);

  console.log(user);
  return (
    <div className="flex justify-center items-center relative h-screen w-screen z-5 text-white">
      <video
        className="absolute z-1 w-screen h-screen object-cover"
        src="./Videos/fondo.webm"
        autoPlay
        muted
        loop
      ></video>
      <div className="flex flex-col z-10 relative gap-3">
        <header className="flex flex-col justify-center m-0 p-0">
          <h1 className="text-5xl text-center m-0 p-0">
            <b>Bienal</b> Chaco 2024
          </h1>
          <h2 className="text-xl text-primary-300 text-center m-0 p-0">
            Donde el arte toma forma
          </h2>
        </header>
        <div className="flex gap-10 justify-center items-center text-xl">
          <Link href="/obras">
            <button className="p-3 rounded-full border hover:bg-white hover:bg-opacity-50 transition duration-300">
              Explorar obras
            </button>
          </Link>
          <Link
            href="/escultores"
            className="p-3 rounded-full border hover:bg-white hover:bg-opacity-50 transition duration-300"
          >
            Conoce a los Escultores
          </Link>
          <Link
            href="/eventos"
            className="p-3 rounded-full border hover:bg-white hover:bg-opacity-50 transition duration-300"
          >
            Eventos
          </Link>
        </div>
      </div>
    </div>
  );
}
