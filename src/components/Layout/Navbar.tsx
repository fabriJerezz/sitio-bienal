import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="bg-primary text-secondary py-4 sticky top-0 z-50 h-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Sitio Bienal</div>
          <div className="flex items-center gap-4">
            <Link href="/">Inicio</Link>
            <Link href="/">Sobre nosotros</Link>
            <Link href="/">Contacto</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar