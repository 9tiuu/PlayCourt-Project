import { useEffect, useState } from 'react';
import NavSystem from '../../components/NavSystem';
import OptionsMenu from '../../components/OptionsMenu';
import UserListPage from '../../components/users/UserListPage';
import { Link } from 'react-router-dom';


const UsersView = () => {
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

            <main>
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

                <div className="p-4 sm:ml-64 mt-3 bg-white dark:bg-color1">
                    <div className="p-4 border-2 border-gray-300 border-dashed rounded-lg h-[90vh] dark:border-color5 mt-14">
                        <div className="">
                            <UserListPage />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default UsersView;