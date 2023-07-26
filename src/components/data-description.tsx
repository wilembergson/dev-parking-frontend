import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function DataDescription({children}: Props){
    return(
        <h1 className='text-xl text-gray-clear font-black mr-4'>
            {children}
        </h1>
    )
}