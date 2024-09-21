export default function Header() {
    return (
        <div className='flex justify-center items-center relative h-full z-5'>
            <video className="absolute z-1 w-full h-auto" src="./Videos/fondo.webm" autoPlay muted loop></video>
            <div className='flex flex-col z-10  relative gap-10'>
                <header className="flex flex-col justify-center ">
                    <h1 className='text-4xl font-bold text-al text-center'>Bienal Chaco 2024</h1>
                    <h2 className="text-1xl text-primary-300 text-center">Donde el arte toma forma</h2>
                </header>
                <div className="flex gap-3 justify-center items-center ">
                    <button className=" text-white p-1 rounded-full border">Explorar obras</button>
                    <button className=" text-white p-1 rounded-full border">Conoce a los Escultores</button>
                    <button className=" text-white p-1 rounded-full border">Proximos Eventos</button>
                </div>
            </div>
        </div>
    )
}