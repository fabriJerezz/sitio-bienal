import Image from 'next/image';

interface ConcreteEventCardProps {
  nombre: string;
  fecha_inicio: string;
  fecha_final: string;
  descripcion: string;
  estado: string;
  portada: string | null;
}

export default function ConcreteEventCard({
  nombre,
  fecha_inicio,
  fecha_final,
  descripcion,
  estado,
  portada,
}: ConcreteEventCardProps) {
  return (
    <div className="gap-1 py-2 px-2 relative w-full h-full rounded-lg overflow-hidden shadow-lg bg-gray-800 flex flex-col">
      <div className="relative w-full flex-grow">
        <div className="font-bold text-2xl mb-2 text-white">{nombre}</div>
        <p className="text-gray-300 text-sm">{descripcion}</p>
      </div>
      <div className="px-4 pt-4 pb-2 w-full flex flex-col bg-gray-900 rounded-lg shadow-md">
        <span className="text-gray-300 font-semibold">
          Inicio: {fecha_inicio}
        </span>
        <span className="text-gray-300 font-semibold">Fin: {fecha_final}</span>
      </div>
      <button className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300">
        Ver detalles
      </button>
    </div>
  );
}
