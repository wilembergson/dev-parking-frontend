import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    cars: number,
    motocycles: number
}

export default function TypeVehicleChats({ cars, motocycles }: Props) {
    const data = {
        datasets: [
            {
                label: 'Tipos dos veículos',
                data: [cars, motocycles],
                backgroundColor: [
                    'rgb(255 191 0)',
                    'rgb(168 85 247)'
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className='flex w-44'>
            <Pie data={data} />
        </div>
    )
}
