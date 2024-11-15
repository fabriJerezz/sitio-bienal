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
    <div className="gap-2 py-4 px-2 relative w-64 h-full rounded-lg overflow-hidden shadow-lg bg-gray-800 flex flex-col">
      <div className="relative w-full px-6 flex-grow">
        <div className="font-bold text-2xl mb-2 text-white">{nombre}</div>
        <p className="text-gray-300 text-sm">{descripcion}</p>
      </div>
      <div className="px-8 pt-4 pb-2 w-full flex flex-col bg-gray-900 rounded-lg shadow-md">
        <span className="text-gray-300 font-semibold">
          Inicio: {fecha_inicio}
        </span>
        <span className="text-gray-300 font-semibold">Fin: {fecha_final}</span>
      </div>
    </div>
  );
}
