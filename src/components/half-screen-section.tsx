import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function HalfScreenSection({ children }: Props) {
    return (
        <section className="flex relative z-11 w-1/2 h-full p-10 justify-center items-center flex-col">
            {children}
        </section>
    )
}