/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyLineChart = ({ data, expenseLimit }: { data: any[], expenseLimit: number }) => {


    const totalExpense = data.reduce((total, entry) => total + entry.expense, 0);
    const warning = totalExpense > expenseLimit;

    const chartData = {
        labels: data.map((item) => item.date),
        datasets: [
            {
                label: "Income",
                data: data.map((item) => item.income),
                borderColor: "green",
                backgroundColor: "rgba(0, 128, 0, 0.3)",
                fill: true,
                tension: 0.3
            },
            {
                label: "Expense",
                data: data.map((item) => item.expense),
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.3)",
                fill: true,
                tension: 0.3
            }
        ]
    };


    return (
        <div style={{ height: "400px" }}>
            <Line data={chartData} options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: "top"
                    }
                }
            }} />
            {warning && <div className="text-red-500 font-bold">⚠️ Expense limit exceeded! {totalExpense}</div>}
        </div>
    );
};

export default MonthlyLineChart;
