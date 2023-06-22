import Title from "./title";
import { TfiEmail } from 'react-icons/tfi'
import { AiFillLock } from 'react-icons/ai'
import FormButtom from "./form-butom";

export default function LoginForm({ setForm }: any) {
    return (
        <div className="flex relative flex-col bg-slate-100 xl:w-6/12 w-full  py-16 rounded-3xl items-center">
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
                <h3 onClick={() => setForm('signup')} className="flex mt-10 text-gray-500 font-black cursor-pointer hover:text-yellow duration-500">
                    Registrar novo usuário
                </h3>
                <FormButtom>
                    Entrar
                </FormButtom>
            </form>
        </div>
    )
}