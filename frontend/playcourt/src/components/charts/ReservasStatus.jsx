import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import api from "../../api/apis";

ChartJS.register(ArcElement, Tooltip, Legend);

const ReservasStatus = () => {
    const [reservas, setReservas] = useState([]);
    const [isDark, setIsDark] = useState(false);

    // Detectar Dark Mode
    useEffect(() => {
        const checkDark = () =>
            setIsDark(document.documentElement.classList.contains("dark"));
        checkDark();

        const obs = new MutationObserver(checkDark);
        obs.observe(document.documentElement, { attributes: true });

        return () => obs.disconnect();
    }, []);

    // Obtener reservas
    const obtenerReservas = async () => {
        try {
            const { data } = await api.get("reservascanchas/");
            setReservas(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        obtenerReservas();
    }, []);

    // --- Procesar datos ---
    let pagado = 0;
    let cancelado = 0;
    let expirado = 0;

    reservas.forEach((r) => {
        if (r.estado_reserva?.estado_reserva_nombre === "Pagado - Confirmado") pagado++;
        if (r.estado_reserva?.estado_reserva_nombre === "Cancelado") cancelado++;
        if (r.estado_reserva?.estado_reserva_nombre === "Expirado") expirado++;
    });

    // Data para el gráfico
    const data = {
        labels: ["Pagado - Confirmado", "Cancelado", "Expirado"],
        datasets: [
            {
                label: "Cantidad",
                data: [pagado, cancelado, expirado],
                backgroundColor: [
                    "#1E3A8A", // Azul oscuro
                    "#3B82F6", // Azul vibrante
                    "#60A5FA", // Azul claro
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Cantidad de Reservas Pagadas, Canceladas y Expiradas",
                color: isDark ? "#ffffff" : "#000000",
                align: "start",
                font: {
                    size: 12,
                    weight: "bold",
                },
                padding: {
                    top: 0,
                    bottom: 20,
                },
            },
            legend: {
                position: "right",
                labels: {
                    color: isDark ? "#ffffff" : "#000000",
                    font: {
                        size: 11,
                    },
                },
            },
        },
    };

    return <Doughnut data={data} options={options} />;
};

export default ReservasStatus;
