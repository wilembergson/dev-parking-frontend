import React, { ReactNode } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    free: number,
    occupied: number
}

export default function CircleChart({ free, occupied }: Props) {
    const data = {
        datasets: [
            {
                label: 'Vagas',
                data: [occupied, free],
                backgroundColor: [
                    'rgb(220 38 38)',
                    'rgb(22 163 74)',
                ],
                borderColor: [
                    'red',
                    'green',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className='flex w-28'>
            <Doughnut data={data} />
        </div>
    )
}
