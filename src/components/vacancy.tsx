import { AiFillCar } from "react-icons/ai"
import { FaMotorcycle } from "react-icons/fa"

type Props = {
    vacancy: {
        id: string,
        localization: string,
        occupied: string,
        type: string
    }
}

export default function Vacancy({ vacancy }: Props) {
    const { id, localization, occupied, type } = vacancy
    return (
        <section key={id} className={`flex font-principal flex-col items-center justify-center w-36  h-36 hover:opacity-80 transition duration-300
            cursor-pointer m-2 text-white rounded-lg
            ${occupied ? 'bg-red-600' : 'bg-green-500'}`}>
            {type === 'CAR' ? <AiFillCar size={52} />:<FaMotorcycle size={52} />}
            <h1 className="flex text-4xl">
                {localization}
            </h1>
            <h2 className="flex text-xl">
                {occupied ? 'Ocupado' : 'Disponível'}
            </h2>
        </section>
    )
}