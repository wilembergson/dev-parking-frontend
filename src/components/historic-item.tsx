'use client'
import formatedDate from "@/utils/formated-date";
import { ReactNode, useState, useEffect } from "react";

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
    const [checkIn, setCheckIn] = useState<string>('')
    const [checkOut, setCheckOut] = useState<string>('')

    useEffect(() => {
        const formatedCheckIn = formatedDate(info.checkIn)
        const formatedCheckOut = formatedDate(info.checkOut)
        setCheckIn(formatedCheckIn)
        setCheckOut(formatedCheckOut)
    }, [])

    return (
        <section className="flex font-principal shadow-md m-2 cursor-pointer">
            <Item title="CheckIn">{checkIn}</Item>
            <Item title="Checkout">{checkOut}</Item>
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