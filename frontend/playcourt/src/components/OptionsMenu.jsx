import { useEffect, useState } from "react";
import UserAuth from "../utils/UserAuth";

const OptionsMenu = () => {
    const user = UserAuth();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Opciones para el rol de Administrador
        const Opciones_Administrador = [
            {
                option_name: 'Usuarios',
                option_route: '...', 
                option_icon:
                    <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-color3 group-hover:text-blue-600 group-hover:transition dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                    </svg>
            },
            {
                option_name: 'Usuarios',
                option_route: '...', 
                option_icon:
                    <svg className="shrink-0 w-5 h-5 text-gray-500 duration-200 hover:duration-200 transition dark:text-color3 group-hover:text-blue-600 group-hover:transition dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                    </svg>
            },
        ];

        // Opciones para el rol de Operaciones
        const Opciones_Operacionales = [];

        // Opciones para el rol de Finanzas
        const Opciones_Finanzas = [];

        if (user?.rol?.namerol === "Administrador") {
            setOptions(Opciones_Administrador);
        };

        if (user?.rol?.namerol === "Operaciones") {
            setOptions(Opciones_Operacionales);
        };

        if (user?.rol?.namerol === "Finanzas") {
            setOptions(Opciones_Finanzas);
        };
    }, [user]);

    return options;
};

export default OptionsMenu;