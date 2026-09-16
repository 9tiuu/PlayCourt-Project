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

const VecesMantencionCanchas = () => {
    const [canchas, setCanchas] = useState([]);
    const [mantenciones, setMantenciones] = useState([]);
    const [isDark, setIsDark] = useState(false);

    // Detecta dark mode
    useEffect(() => {
        const checkDark = () =>
            setIsDark(document.documentElement.classList.contains("dark"));
        checkDark();
        const obs = new MutationObserver(checkDark);
        obs.observe(document.documentElement, { attributes: true });

        return () => obs.disconnect();
    }, []);

    // Obtener canchas
    const obtenerCanchas = async () => {
        try {
            const { data } = await api.get("canchasdeportivas/");
            setCanchas(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Obtener mantenciones
    const obtenerMantenciones = async () => {
        try {
            const { data } = await api.get("mantencioncanchas/");
            setMantenciones(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        obtenerCanchas();
        obtenerMantenciones();
    }, []);

    // --- Procesar datos ---
    const conteo = {};

    mantenciones.forEach((m) => {
        const cancha = m.cancha_deportiva;
        if (!cancha) return;

        const estado = m.estado_mantencion?.estado_mantencion_nombre;

        // Solo "Completado" y "En proceso"
        if (estado !== "Completado" && estado !== "En proceso") return;

        const id = cancha.id || cancha.cancha_id;
        if (!conteo[id]) conteo[id] = 0;
        conteo[id]++;
    });

    const labels = [];
    const valores = [];

    canchas.forEach((c) => {
        const id = c.id || c.cancha_id;
        labels.push(`${c.cancha_nombre} Nº${c.cancha_numero}`);
        valores.push(conteo[id] || 0);
    });

    const data = {
        labels,
        datasets: [
            {
                label: "Veces con mantención",
                data: valores,
                backgroundColor: [
                    "#1E3A8A", // Azul oscuro
                    "#3B82F6", // Azul vibrante
                    "#60A5FA", // Azul claro
                    "#93C5FD", // Azul pastel
                    "#C7D2FE", // Azul lavanda
                    "#7C3AED", // Morado fuerte
                    "#8B5CF6", // Morado vivo
                    "#A78BFA", // Morado medio
                    "#C4B5FD", // Morado suave
                    "#EDE9FE", // Lavanda pastel
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
                text: "Veces que ha tenido mantención cada cancha",
                color: isDark ? "#ffffff" : "#000000",
                align: "start",
                textAlign: "left",
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

export default VecesMantencionCanchas;
