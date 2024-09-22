import React, { useEffect, useRef } from 'react'

interface HiddenInfoProps {
    handleClick: () => void;
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
            <div ref={ref} className='bg-red-500 w-screen h-screen absolute z-50 top-0 left-0 bottom-0 right-0 flex justify-center items-center'>
                    <div className='bg-green-500  relative w-1/2 h-1/2 flex flex-col items-center justify-center border-b p-0'>

                            <div>
                                <ul className='text-sm flex flex-col m-1  w-full gap-1'>
                                        <li >Pais: <span>Francia</span></li>
                                        <li >Años: <span>1000</span></li>
                                        <li >Movimiento Artistico: <span>Renacimiento</span></li>
                                        <li >Tecnica: <span>Escultura en marmol</span></li>
                                </ul>
                            </div>
                    </div>
            </div>
    )
}

export default HiddenInfo