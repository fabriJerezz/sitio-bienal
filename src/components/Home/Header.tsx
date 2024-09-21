export default function Header() {
    return (
        <div className='flex justify-center items-center relative h-screen w-screen z-5'>
            <video className="absolute z-1 w-screnn h-screen bg-cover" src="./Videos/fondo.webm" autoPlay muted loop></video>
            <div className='flex flex-col z-10  relative gap-3'>
                <header className="flex flex-col justify-center m-0 p-0">
                    <h1 className='text-2xl  text-al text-center tracking-wider m-0 p-0'><span className="text-3xl font-bold">Bienal </span> Chaco 2024</h1>
                    <h2 className="text-sm text-primary-300 text-center m-0 p-0">Donde el arte toma forma</h2>
                </header>
                <div className="flex gap-3 justify-center items-center ">
                    <button className="text-white p-1 rounded-full border text-xs hover:bg-white hover:bg-opacity-50 transition duration-300">Explorar obras</button>
                    <button className="text-white p-1 rounded-full border text-xs hover:bg-white hover:bg-opacity-50 transition duration-300">Conoce a los Escultores</button>
                    <button className="text-white p-1 rounded-full border text-xs hover:bg-white hover:bg-opacity-50 transition duration-300">Proximos Eventos</button>
                </div>
            </div>
        </div>
    )
}