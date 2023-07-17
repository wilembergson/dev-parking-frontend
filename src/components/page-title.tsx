import { ReactNode } from "react"

type Props = {
    children: ReactNode
}
export default function PageTitle({ children }: Props) {
    return (
        <section className='flex justify-center font-principal items-center sm:w-3/5 w-full pt-4 pb-2 sm:px-0 px-2 border border-b-0 border-t-0 border-x-0 border-gray-clear'>
            <h1 className='text-5xl text-gray-clear font-black mr-4 mt-4'>
                {children}
            </h1>
        </section>
    )
}