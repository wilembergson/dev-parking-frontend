import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function HalfScreenSection({ children }: Props) {
    return (
        <section className="flex relative z-11 sm:w-1/2 w-full h-full p-10 justify-center items-center flex-col">
            {children}
        </section>
    )
}