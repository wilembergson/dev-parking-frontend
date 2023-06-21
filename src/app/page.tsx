import HalfScreenSection from "@/components/half-screen-section";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full h-full flex-col items-center">
      <img className="absolute z-11 w-full  h-full" src="/bg-inicio.jpg" alt="" />
      <div className="flex absolute z-10 w-full h-full bg-white bg-opacity-10 flex-row space-between">
        <HalfScreenSection>
          <h1>
            Parking
          </h1>
          <h1>
            controle de estacionamento
          </h1>
        </HalfScreenSection>
        <HalfScreenSection>
          <div className="flex bg-white w-1/2 h-2/3 p-5 rounded-3xl justify-center">
            LOGIN
          </div>
        </HalfScreenSection>
      </div>
    </main>
  )
}
