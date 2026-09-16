import { useEffect, useState } from 'react';
import NavSystem from '../components/NavSystem';
import OptionsMenu from '../components/OptionsMenu';
import BarChart from '../components/charts/BarChart';
import { Link } from 'react-router-dom';
import VecesReservadaCanchaDeportiva from '../components/charts/VecesReservadaCanchaDeportiva';
import ReservasStatus from '../components/charts/ReservasStatus';
import VecesMantencionCanchas from '../components/charts/VecesMantencionCanchas';

const HomePage = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const options = OptionsMenu();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const OpenMenuButtom = () => {
        setOpenMenu(!openMenu)
    };
    
    return (
        <>
            <main className='bg-gray-100 dark:bg-color1'>
                <NavSystem OpenMenuBottom={OpenMenuButtom} />
                <aside id="logo-sidebar" className={`fixed top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform ${openMenu ? '' : '-translate-x-full'} bg-white border-r border-gray-300 sm:translate-x-0 dark:bg-color6 dark:border-color4`} aria-label="Sidebar">
                    <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-[#232331]">
                        <ul className="space-y-2 font-medium mt-2">
                            {
                                options.map((o, index) => (
                                    <li key={index}>
                                        <Link to={o.option_route} className="flex items-center p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-600 hover:transition transition duration-200 hover:duration-200 group">
                                            {o.option_icon}
                                            <span className="flex-1 ms-3 whitespace-nowrap text-gray-900 group-hover:text-blue-600 transition hover:transition duration-200 hover:duration-200 dark:text-white dark:group-hover:text-white">
                                                {o.option_name}
                                            </span>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </aside>

                <div className="sm:ml-64 mt-3 bg-gray-100 dark:bg-color1">
                    <div className="mt-16 p-8 bg-blue-700 dark:bg-[#121219] md:h-72 h-96 w-full">
                        <p className='text-sm text-white dark:text-[#70749d]'>
                            Inicio / Dashboards
                        </p>
                        <h2 className="text-3xl font-bold mb-4 text-white dark:text-white">
                            ¡Bienvenido a PlayCourt!
                        </h2>
                        <p className='md:w-[40rem] text-white dark:text-[#70749d]'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam atque adipisci corporis explicabo, quae excepturi ipsa corrupti iure voluptas suscipit.
                        </p>
                    </div>
                    <div className="p-4 -translate-y-28">
                        <div className="p-4 rounded-lg md:h-screen h-[90rem]">
                            {/* <h2 className="text-2xl font-bold mb-4 text-black dark:text-white uppercase">
                                ¡Bienvenidos a PlayCourt!
                            </h2> */}

                            <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4 md:h-auto h-[90%]">
                                <div className="w-full overflow-x-auto h-56 p-4 bg-white dark:bg-color2 rounded-lg">
                                    <BarChart />
                                </div>

                                <div className="flex flex-col justify-between p-2 h-56 rounded-sm bg-white dark:bg-color2">
                                    <div className="border-b-4 dark:border-b-blue-600 border-b-blue-600 border dark:border-color5 border-gray-300 rounded-lg flex flex-col justify-between h-full p-4">
                                        <p className='text-left font-bold mb-3 text-black dark:text-white text-base uppercase'>Capital actual (dummy data)</p>
                                        <div className="flex flex-col gap-1">
                                            <p className='text-left font-extrabold mb-3 text-green-600 dark:text-green-400 text-3xl'>${0} CLP</p>
                                            <p className='text-left font-normal mb-3 text-black dark:text-white text-xs'>Monto total del capital actual del negocio</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between p-2 h-56 rounded-sm bg-white dark:bg-color2">
                                    <div className="border-b-4 dark:border-b-blue-600 border-b-blue-600 border dark:border-color5 border-gray-300 rounded-lg flex flex-col justify-between h-full p-4">
                                        <p className='text-left font-bold mb-3 text-black dark:text-white text-base uppercase'>Total de egresos/gastos (dummy data)</p>
                                        <div className="flex flex-col gap-1">
                                            <p className='text-left font-extrabold mb-3 text-red-700 dark:text-red-400 text-3xl'>$-{0} CLP</p>
                                            <p className='text-left font-normal mb-3 text-black dark:text-white text-xs'>Monto total de Egresos registrados</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full overflow-x-auto h-56 p-4 bg-white dark:bg-color2 rounded-lg">
                                    <VecesReservadaCanchaDeportiva />
                                </div>

                                <div className="w-full overflow-x-auto h-56 p-4 bg-white dark:bg-color2 rounded-lg">
                                    <ReservasStatus />
                                </div>

                                <div className="w-full overflow-x-auto h-56 p-4 bg-white dark:bg-color2 rounded-lg">
                                    <VecesMantencionCanchas />
                                </div>
                            </div>

                            {/* <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-color4">
                                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </p>
                                </div>
                                
                                <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-color4">
                                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </p>
                                </div>
                                <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-color4">
                                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </p>
                                </div>
                                <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-color4">
                                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default HomePage;