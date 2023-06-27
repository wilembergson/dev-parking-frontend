import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function HeaderOption({ children }: Props) {
    return (
        <section className="flex h-max text-xl p-8 cursor-pointer hover:bg-purple-800 transition duration-400">
            {children}
        </section>
    )
}