import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

export default function FormButtom({ children }: Props) {
    return (
        <button className="flex bg-yellow hover:bg-yellow2 duration-500 text-white text-4xl px-5 py-3 rounded-xl mt-10">
            {children}
        </button>
    )
}