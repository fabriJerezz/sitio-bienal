import React from 'react'

function HiddenInfo() {
  return (
    <div>
        <div className='relative flex justify-center border-b p-0'>
            <h2 className='p-0 m-0 text-xl'>Detalles</h2>
        </div>
        <ul className='text-sm flex flex-col m-1  w-full gap-1'>
            <li >Pais: <span>Francia</span></li>
            <li >Años: <span>1000</span></li>
            <li >Movimiento Artistico: <span>Renacimiento</span></li>
            <li >Tecnica: <span>Escultura en marmol</span></li>
        </ul>
    </div>
  )
}

export default HiddenInfo