import Image from 'next/image'
import esc from './CardInfo/Venus_of_Arles_Louvre_Ma439_n08.webp'

interface CardInfoProps {
  pais: string;
  años: number;
  nombre: string;
  img: string;
}

export default function CardInfo({pais, años,nombre,img}: CardInfoProps) {
  return (
    <div className='flex w-32 h-auto bg-blue-300 z-3 flex-col items-center relative'>
        <header className='relative'>
            <h1 className='relative text-xl '>Nombre</h1>
        </header>
        <div className='relative w-full h-full'>
            <Image alt="Descripción de la imagen" src={esc} className='w-full h-full'></Image>
        </div>
        <div className='relative h-auto w-full bg-black flex flex-col items-center justify-between'>
            <div className='relative h-auto bg-slate-400 w-full flex flex-col justify-center'>
                <div className='relative flex justify-center '>
                    <h2>Detalles</h2>
                </div>
                <p>Pais: <span>{pais}</span></p>
                <p>Años: <span>{años}</span></p>
            </div>
            <button className='relative bg-slate-500'>Votar</button>
        </div>
    </div>
  )
}
