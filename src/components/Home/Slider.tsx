import CardInfo from "./Slider/CardInfo"

export default function Slider() {
  return (
    <>
      <section className="w-full h-full bg-white relative flex-col items-center justify-center flex gap-3">
        <header className="text-color-black bg-black flex flex-col">
            <h1 className="">Nuestros Escultores</h1>
            <p className="p-0 m-0">Nuestros mejores escultores</p>
        </header>
        <div className="flex gap-10 justify-center items-center" >
          <CardInfo  />
          <CardInfo />
          <CardInfo />
          <CardInfo />
        </div>
      </section>
    </>
  )
}
