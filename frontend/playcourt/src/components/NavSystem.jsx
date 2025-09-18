import UserAuth from "../utils/UserAuth";
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../img/PlayCourt.png';
import Logo2 from '../img/PlayCourt2.png';
import ThemeToggle from "./Toggle";

const NavSystem = ({ OpenMenuBottom }) => {
    const user = UserAuth();
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpenDropdown(false);
            };
        };
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => { // eliminar el usuario guardado en el localstorage
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 z-40 w-full bg-white dark:bg-color6 border-b border-gray-300 dark:border-color5">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between md:px-2">
                    <div className="flex items-center justify-start rtl:justify-end gap-4">
                        <button onClick={OpenMenuBottom} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-color4 dark:focus:ring-color5">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <img src={Logo} alt="icon" className="max-w-36 flex dark:hidden" />
                        <img src={Logo2} alt="icon" className="max-w-36 dark:flex hidden" />
                        <ThemeToggle />
                    </div>
                    <div className="flex items-center">
                        <div ref={dropdownRef} className="flex items-center ms-3">
                            <div>
                                <button onClick={toggleDropdown} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-blue-100 dark:focus:ring-color3" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-10 h-10 rounded-full" src="https://i.pinimg.com/originals/98/07/b1/9807b10894c44569b95eac4267ae742f.jpg" alt="userphoto" />
                                </button>
                            </div>
                            {   
                                isOpenDropdown && (
                                    <div className="z-50 absolute top-0 p-2 right-0 translate-y-[3.8rem] w-60 mr-2 my-4 text-base list-none bg-white dark:bg-color6 divide-y divide-gray-300 dark:divide-color5 rounded-lg shadow border-gray-100 dark:border-color5 border" id="dropdown-user">
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm text-gray-900 dark:text-white" role="none">
                                                {user.name} {user.lastname}
                                            </p>
                                            <p className="text-sm font-medium text-blue-500 truncate" role="none">
                                                {user.email}
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <a href="..." className="block px-4 py-2 rounded-sm text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-color4 dark:hover:text-white" role="menuitem">
                                                    Configuración
                                                </a>
                                            </li>
                                            <li>
                                                <button onClick={handleLogout} className="block rounded-sm px-4 py-2 w-full text-left text-sm text-gray-700 dark:hover:text-red-400 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-color4" role="menuitem">
                                                    Cerrar sesión
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavSystem;