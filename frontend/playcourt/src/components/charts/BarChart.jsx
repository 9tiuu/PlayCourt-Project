import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => { // Pasar Props de los datos en un componente futuro
    const [isDark, setIsDark] = useState(false);
    const labels = ["Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    useEffect(() => {
        const checkDark = () =>
        setIsDark(document.documentElement.classList.contains("dark"));
        checkDark();

        const observer = new MutationObserver(checkDark);
        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    const data = {
        labels,
        datasets: [
            {
                label: "$ Obtenido",
                data: [40000, 55000, 30000, 78000, 65000, 55000, 0], // Aqui, Sumar el precio total de reservas con estado "Pagado - Confirmado"
                backgroundColor: "rgba(28, 100, 242)",
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,  // 👈 CLAVE
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: isDark ? "#ffffff" : "#000000", // 👈 AQUÍ CAMBIA EL LABEL
                },
            },
            title: {
                display: true,
                text: "Ingreso mensual obtenido (Dummy Data)",
                color: isDark ? "#ffffff" : "#000000",
            },
        },
        scales: {
            x: { ticks: { color: isDark ? "#ffffff" : "#475569" } },
            y: { ticks: { color: isDark ? "#ffffff" : "#475569" } },
        },
    };

    return <Bar options={options} data={data} />;
};

export default BarChart;