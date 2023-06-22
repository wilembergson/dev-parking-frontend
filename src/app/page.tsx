import HalfScreenSection from "@/components/half-screen-section";
import LoginForm from "@/components/login-form";
import Title from "@/components/title";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full h-full flex-col items-center">
      <img className="absolute z-11 w-full  h-full" src="/bg-inicio.jpg" alt="" />
      <div className="flex absolute z-10 w-full h-full bg-white bg-opacity-10 flex-row space-between">
        <HalfScreenSection>
          <Title textColor="text-white" textSize="text-8xl" textBlack>
            Parking
          </Title>
          <Title textColor="text-yellow" textSize="text-5xl" textBlack>
            controle de estacionamento
          </Title>
        </HalfScreenSection>
        <HalfScreenSection>
          <LoginForm />
        </HalfScreenSection>
      </div>
    </main>
  )
}
