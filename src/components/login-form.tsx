import Title from "./title";

export default function LoginForm() {
    return (
        <div className="flex flex-col bg-slate-100 w-1/2 h-2/3 p-5 pt-16 rounded-3xl items-center">
            <Title textColor="text-gray-500" textSize="text-4xl" textBlack>
                Login
            </Title>
            <form className="flex flex-col items-center w-full mt-10">
                <input type="email" placeholder="email" className="flex border-yellow-600 border-1 rounded-lg w-4/5 m-3 p-3" />
                <input type="password" placeholder="senha" className="flex m-3" />
            </form>
        </div>
    )
}