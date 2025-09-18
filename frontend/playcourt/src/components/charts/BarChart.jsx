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
    const labels = ["Mar", "Abr", "May", "Jun", "Jul", "Agos", "Sep"];

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
                label: "Ventas",
                data: [40, 55, 30, 78, 65, 59, 90],
                backgroundColor: "rgba(28, 100, 242, 0.6)",
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Gráfico de Barras con Chart.js",
                color: isDark ? "#ffffff" : "#000000",
            },
            scales: {
                x: { ticks: { color: isDark ? "#ffffff" : "#475569" } },
                y: { ticks: { color: isDark ? "#ffffff" : "#475569" } },
            },
        },
    };
    return <Bar options={options} data={data} />;
};

export default BarChart;