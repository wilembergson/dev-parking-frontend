import { ReactNode } from "react";
import BackButton from "./back-button";

type Vacancy = {
    id: string;
    localization: string;
    occupied: boolean;
    type: string;
}

type Customer = {
    name: string;
    rg: string;
    id: string;
}

type EmployeeUser = {
    id: string;
    name: string;
    rg: string;
    email: string;
}
export type informations = {
    id: string;
    vehiclePlate: string;
    checkIn: Date;
    checkOut: Date;
    pricePerHour: number
    priceTotal: number | null,
    finished: boolean
    vacancy: Vacancy;
    customer: Customer;
    employeeUser: EmployeeUser
}

type children = {
    info: informations
}

export default function HistoricItem({ info }: children) {

    async function formatCheckIn(date: Date) {
        const checkIn = new Date(date)
        const day = (checkIn.getDate() < 10) ? `0${checkIn.getDate()}` : `${checkIn.getDate()}`
        const month = (checkIn.getMonth() + 1 < 10) ? `0${checkIn.getMonth() + 1}` : `${checkIn.getMonth() + 1}`
        const hour = (checkIn.getHours() < 10) ? `0${checkIn.getHours()}` : `${checkIn.getHours()}`
        const minutes = checkIn.getUTCMinutes()
        return (`${day}/${month}/${checkIn.getFullYear()} às ${hour}:${minutes}`)
    }
    return (
        <section className="flex font-principal shadow-md m-2 cursor-pointer">
            <Item title="Checkout">{info.checkOut.toString()}</Item>
            <Item title="Placa">{info.vehiclePlate}</Item>
            <Item title="Cliente">{info.customer.name}</Item>
        </section>
    )
}

type Prop = {
    children: ReactNode,
    title: string
}
function Item({ children, title }: Prop) {
    return (
        <div className="flex flex-col items-center my-2 mx-4">
            <h2 className="font-black">{title}</h2>
            {children}
        </div>
    )
}