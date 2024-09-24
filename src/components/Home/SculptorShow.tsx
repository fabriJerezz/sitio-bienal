import { CarouselSize } from './carousel-size';

export default function Slider() {
  return (
    <>
      <section className=" relative w-full min-h-screen bg-primary/50 flex flex-col items-center justify-center">
        <header className="text-color-black  flex flex-col text-center mb-10">
          <h1 className="relative p-0 m-0 text-6xl">
            Nuestros <span className="font-bold">Escultores</span>
          </h1>
        </header>
        <CarouselSize />
      </section>
    </>
  );
}
