import CardInfo from "./Slider/CardInfo";

export default function Slider() {
  return (
    <>
      <section className=" relative w-full min-h-screen bg-primary flex flex-col items-center justify-center">
        <header className="text-color-black bg-black flex flex-col text-center m-3">
            <h1 className="border-b relative p-0 m-0 text-3xl">Mejores <span className="bolder">Escultores</span></h1>
        </header>
        <div className="flex gap-10 justify-center items-center">
          <CardInfo />
          <CardInfo />
          <CardInfo />
          <CardInfo />
        </div>
      </section>
    </>
  );
}
