'use client'
import 'aos/dist/aos.css'
import Aos from 'aos'
import { ToastContainer } from "react-toastify"
import { useEffect, useState } from "react";
import HalfScreenSection from "@/components/half-screen-section";
import LoginForm from "@/components/login-form";
import SignupForm from "@/components/signup-form";
import Title from "@/components/title";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [form, setForm] = useState('login')
  
  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, [])

  return (
    <main className="flex relative min-h-screen w-full h-full flex-col items-center">
      <img className="absolute z-11 w-full h-full" src="/bg-inicio.jpg" alt="" />
      <div className="flex absolute z-10 w-full h-full bg-white bg-opacity-10 sm:flex-row flex-col space-between">
        <ToastContainer />
        <HalfScreenSection data-aos="flip-up">
          <div data-aos="flip-up">
            <Title textColor="text-white" textSize="text-8xl" textBlack>
              Parking
            </Title>
            <Title textColor="text-yellow" textSize="text-5xl" textBlack>
              controle de estacionamento
            </Title>
          </div>
        </HalfScreenSection>
        <HalfScreenSection>
          {form === 'login' ? <LoginForm setForm={setForm} /> : <SignupForm setForm={setForm} />}
        </HalfScreenSection>
      </div>
    </main>
  )
}
