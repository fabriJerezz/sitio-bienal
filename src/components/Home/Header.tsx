export default function Header() {
    return (
        <div className='flex justify-center items-center relative h-full z-5'>
            <video className="absolute z-1 w-full h-auto" src="./Videos/fondo.webm" autoPlay muted loop></video>
            <div className='flex flex-col z-10 bg-slate-500 relative gap-10'>
                <header className="flex flex-col justify-center bg-black">
                    <h1 className='text-4xl font-bold '>Bienal Chaco 2024</h1>
                    <h2>Donde el arte toma forma</h2>
                </header>
                <div className="flex gap-3 justify-center items-center bg-slate-50">
                    <button className="bg-blue-500 text-white p-1 rounded-full">Explorar obras</button>
                    <button className="bg-blue-500 text-white p-1 rounded-full">Conoce a los Escultores</button>
                    <button className="bg-blue-500 text-white p-1 rounded-full">Proximos Eventos</button>
                </div>
            </div>
        </div>
    )
}