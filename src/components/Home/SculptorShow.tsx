import CardInfo from "./Slider/CardInfo";

export default function Slider() {
  return (
    <>
      <section className=" relative w-full min-h-screen bg-primary flex flex-col items-center justify-center">
        <header className="text-color-black  flex flex-col text-center m-10">
            <h1 className="border-b relative p-0 m-0 text-6xl">Nuestros <span className="font-bold">Escultores</span></h1>
        </header>
        <div className="grid grid-cols-4 gap-10">
          <CardInfo />
          <CardInfo />
          <CardInfo />
          <CardInfo />
           <CardInfo />
            <CardInfo />
             <CardInfo />
              <CardInfo />

        </div>
      </section>
    </>
  );
}
