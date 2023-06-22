import { ReactNode } from "react"

type Props = {
    textColor: string,
    textSize: string,
    children: ReactNode
    textBlack?: boolean
}

export default function Title({ textColor, textSize, children, textBlack }: Props) {
    const className = `${textColor} ${textSize} ${textBlack ? 'font-black' : ""} font-principal justify-center z-12 text-center m-5`
    return (
        <h1 className={className}>
            {children}
        </h1>
    )
}