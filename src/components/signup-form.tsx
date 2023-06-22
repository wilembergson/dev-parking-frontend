import Title from "./title";
import Input from "./input";
import FormButtom from "./form-butom";

export default function SignupForm({ setForm }: any) {
    return (
        <div className="flex relative flex-col bg-slate-100 xl:w-6/12 w-full  py-16 rounded-3xl items-center" data-aos="flip-left">
            <Title textColor="text-gray-500" textSize="text-4xl" textBlack>
                Signup
            </Title>
            <form className="flex flex-col items-center w-full mt-10 font-principal">
                <Input type="text" placehoder="nome" />
                <Input type="number" placehoder="RG" />
                <Input type="email" placehoder="email" />
                <Input type="password" placehoder="senha" />
                <h3 onClick={() => setForm('login')} className="flex mt-10 text-gray-500 font-black cursor-pointer hover:text-yellow duration-500">
                    Fazer login
                </h3>
                <FormButtom>
                    Registrar
                </FormButtom>

            </form>
        </div>
    )
}