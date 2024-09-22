"use client";
import React, { useEffect, useRef } from 'react'

interface HiddenInfoProps {
    handleClick: () => void;
    pais: string;
    años: number;
    movimiento: string;
    nombre: string;
    historia:string;
}

const HiddenInfo: React.FC<HiddenInfoProps> = ({ handleClick,historia }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function checkClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handleClick();
            }
        }

        document.addEventListener("mousedown", checkClick);
        return () => {
            document.removeEventListener("mousedown", checkClick);
        };
    }, []);

    return ( 
            <div  className=' w-screen h-screen absolute z-50 top-0 left-0 bottom-0 right-0 flex justify-center items-center' style={{backdropFilter: 'blur(5px)'}}>
                    <div ref={ref} className='bg-green-500  relative w-3/4 h-3/4 flex  flex-col items-center justify-between border-b p-0'>
                            <header className='flex w-full bg-red-450 justify-between'>
                                <div className='bg-slate-400 w-1/2'>
                                    <h1 className='font-extrabold text-3xl'>Nombre</h1>
                                </div>
                                <div className='bg-slate-950 w-1/2'>
                                    <h1 className='font-extrabold text-3xl'>Esculturas</h1>
                                </div>
                            </header>
                            <div className='flex w-full h-full'>
                                <div className='bg-blue-500 relative w-1/2 h-full'>
                                    <ul className='text-2xl flex flex-col m-1  w-full gap-2 ml-3'>
                                            <li >Pais: <span className='font-bold'>Francia</span></li>
                                            <li >Años: <span className='font-bold'>1000</span></li>
                                            <li >Movimiento Artistico: <span className='font-bold'>Renacimiento</span></li>
                                            <li >Tecnica: <span className='font-bold'>Escultura en marmol</span></li>
                                    </ul>
                                    <video className='rounded-lg mt-2 mb-2' muted loop autoPlay src="../../Videos/fondo.webm"></video>
                                    <p className='text-center font-bold text-lg'>asdadasdadas</p>
                                </div>
                                <div className='bg-red-500  relative w-1/2 h-full'>
                                        asdasdsa
                                </div>
                            </div>
                    </div>
            </div>
    )
}

export default HiddenInfo