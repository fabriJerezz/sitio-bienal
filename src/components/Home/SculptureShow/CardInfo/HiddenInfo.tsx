import React, { useEffect, useRef } from 'react'

interface HiddenInfoProps {
    handleClick: () => void;
    pais: string;
    años: number;
    movimiento: string;
    nombre: string;
    historia:string;
}

const HiddenInfo: React.FC<HiddenInfoProps> = ({ handleClick }) => {
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
                    <div ref={ref} className='bg-green-500  relative w-1/2 h-1/2 flex  flex-col items-center justify-between border-b p-0'>
                            <header className='flex w-full bg-red-450 justify-between'>
                                <div className='bg-slate-400 w-1/2'>
                                    <h1 className='font-bold text-3xl'>Nombre</h1>
                                    </div>
                                <div className='bg-slate-950 w-1/2'>
                                    <h1 className='font-bold text-3xl'>Esculturas</h1></div>
                            </header>
                            <div className='flex w-full h-full'>
                                <div className='bg-blue-500 relative w-1/2 h-full'>
                                    <ul className='text-sm flex flex-col m-1  w-full gap-1'>
                                            <li >Pais: <span>Francia</span></li>
                                            <li >Años: <span>1000</span></li>
                                            <li >Movimiento Artistico: <span>Renacimiento</span></li>
                                            <li >Tecnica: <span>Escultura en marmol</span></li>
                                    </ul>
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