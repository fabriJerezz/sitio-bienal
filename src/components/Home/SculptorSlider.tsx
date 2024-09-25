import { CarouselSculptors } from './CarouselSculptors';

export default function Slider() {
  return (
    <>
      <section className=" relative w-full min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <header className="relative text-color-black  flex flex-col text-center mb-10 ">
          <h1 className="relative p-0 m-0 text-6xl">
            Nuestros <span className="font-bold">Escultores</span>
          </h1>
        </header>
        <CarouselSculptors />
      </section>
    </>
  );
}
