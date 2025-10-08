import { useEffect, useState } from "react";
import UserAuth from "../utils/UserAuth";

const OptionsMenu = () => {
    const user = UserAuth();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Opciones para el rol de Administrador
        const Opciones_Administrador = [
            {
                option_name: 'Inicio',
                option_route: '/', 
                option_icon:
                    <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-color3 group-hover:text-blue-600 group-hover:transition dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                    </svg>

            },
            {
                option_name: 'Usuarios',
                option_route: '/usuarios', 
                option_icon:
                    // <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-color3 group-hover:text-blue-600 group-hover:transition dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    //     <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                    // </svg>

                    <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-color3 group-hover:text-blue-600 group-hover:transition dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
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