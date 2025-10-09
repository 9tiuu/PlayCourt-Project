import Logo from '../img/PlayCourt.png';
import { Link } from 'react-router-dom';
import {useState } from 'react';

const NavWeb = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const OpenMenuButtom = () => {
        setOpenMenu(!openMenu)
    };

    return (
        <>
            <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-300">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center md:justify-around justify-between md:px-2">
                        <div className="flex items-center justify-start rtl:justify-end gap-4">
                            <button onClick={OpenMenuButtom} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <img src={Logo} alt="icon" className="max-w-36 flex" />
                        </div>
                        <div className="flex items-center">
                            <ul className="md:flex hidden gap-8">
                                <li>
                                    <Link to={'/'} className="text-black font-semibold hover:text-blue-600 transition hover:transition hover:duration-300 duration-300">
                                        Inicio
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/reservas'} className="text-black font-semibold hover:text-blue-600 transition hover:transition hover:duration-300 duration-300">
                                        Reservas
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <aside id="logo-sidebar" className={`fixed md:hidden top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform ${openMenu ? '' : '-translate-x-full'} bg-white border-r border-gray-300 sm:translate-x-0`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium mt-2">
                        <li>
                            <Link to={'/'} className="flex items-center p-3 rounded-lg hover:bg-blue-100 hover:transition transition duration-200 hover:duration-200 group">
                                <span className="flex-1 ms-3 whitespace-nowrap text-gray-900 group-hover:text-blue-600 transition hover:transition duration-200 hover:duration-200">
                                    Inicio
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/reservas'} className="flex items-center p-3 rounded-lg hover:bg-blue-100 hover:transition transition duration-200 hover:duration-200 group">
                                <span className="flex-1 ms-3 whitespace-nowrap text-gray-900 group-hover:text-blue-600 transition hover:transition duration-200 hover:duration-200">
                                    Reservas
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default NavWeb;