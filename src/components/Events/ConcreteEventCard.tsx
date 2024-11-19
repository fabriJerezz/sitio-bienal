import Image from 'next/image';
import Link from 'next/link';

interface ConcreteEventCardProps {
  id: number;
  nombre: string;
  fecha_inicio: string;
  fecha_final: string;
  descripcion: string;
  estado: string;
  foto1: string | File | null;
  foto2: string | File | null;
}

export default function ConcreteEventCard({
  id,
  nombre,
  fecha_inicio,
  fecha_final,
  descripcion,
  estado,
  foto1,
  foto2,
}: ConcreteEventCardProps) {
  return (
    <div className="gap-1 py-2 px-2 relative w-full h-full rounded-lg overflow-hidden shadow-lg bg-white text-black flex flex-col">
      <div className="relative w-full flex-grow">
        <div className="font-bold text-2xl mb-2 ">{nombre}</div>
        <p className=" text-sm">{descripcion}</p>
      </div>
      <div className="px-4 pt-4 pb-2 w-full flex flex-col bg-black rounded-lg shadow-md text-white">
        <span className=" font-semibold">Inicio: {fecha_inicio}</span>
        <span className=" font-semibold">Fin: {fecha_final}</span>
      </div>
      <Link
        href={`/eventos/${id}`}
        className="text-center mt-4 py-2 px-4 bg-black hover:bg-gray-950 text-white font-bold rounded-lg shadow-md transition duration-300"
      >
        Ver detalles
      </Link>
    </div>
  );
}
