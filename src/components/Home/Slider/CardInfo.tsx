import Image from 'next/image'
import esc from './CardInfo/Venus_of_Arles_Louvre_Ma439_n08.webp'


interface CardInfoProps {
  pais: string;
  años: number;
  nombre: string;
  img: string;
  art: string;
  tec: string;
}

export default function CardInfo({pais, años,nombre,img,art,tec}: CardInfoProps) {
  return (
    <div className='flex w-80  bg-primary z-3 flex-col items-center relative rounded-lg border-secondary border p-2'>
        <header className='relative'>
            <h1 className="relative text-xl tracking-widest text-secondary">Nombre</h1>
        </header>
        <div className='relative w-full h-full'>
            <Image alt="Descripción de la imagen" src={esc} className='w-full h-full'></Image>
        </div>
        <div className='relative h-auto w-full  flex flex-col items-center justify-between'>
            <div className='relative h-auto bg-primary/70 w-full flex flex-col justify-center'>
                <div className='relative flex justify-center border-b p-0'>
                    <h2 className='p-0 m-0 text-xl'>Detalles</h2>
                </div>
                <ul className='text-sm flex flex-col m-1  w-full gap-1'>
                    <li >Pais: <span>{pais}</span></li>
                    <li >Años: <span>{años}</span></li>
                    <li >Movimiento Artistico: <span>{art}</span></li>
                    <li >Tecnica: <span>{tec}</span></li>
                </ul>
            </div>
            <button className='relative bg-secundary border-secondary border pr-10 pl-10 pt-1 pb-1 rounded-lg text-xl  '>Votar</button>
        </div>
    </div>
  )
}