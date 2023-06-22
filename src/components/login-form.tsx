import Title from "./title";
import { TfiEmail } from 'react-icons/tfi'
import { AiFillLock } from 'react-icons/ai'

export default function LoginForm() {
    return (
        <div className="flex flex-col bg-slate-100 w-1/2 h-2/3 p-5 pt-16 rounded-3xl items-center">
            <Title textColor="text-gray-500" textSize="text-4xl" textBlack>
                Login
            </Title>
            <form className="flex flex-col items-center w-full mt-10 font-principal">
                <section className="flex items-center rounded-lg overflow-hidden pl-3 mb-8 bg-white w-4/5">
                    <TfiEmail size={25} color="#FFBF00" />
                    <input type="email" placeholder="email" className="flex w-full border-none focus:outline-none p-3 text-gray-700" />
                </section>
                <section className="flex items-center rounded-lg overflow-hidden pl-3 bg-white w-4/5">
                    <AiFillLock size={25} color="#FFBF00" />
                    <input type="password" placeholder="senha" className="flex w-full border-1 focus:outline-none p-3 text-gray-700" />
                </section>
                <button className="flex bg-yellow text-white text-4xl px-5 py-3 rounded-xl mt-16">
                    Entrar
                </button>
            </form>
        </div>
    )
}