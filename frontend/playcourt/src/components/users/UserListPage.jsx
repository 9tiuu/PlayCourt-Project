import { useEffect, useState } from 'react';
import api from '../../api/apis';

const UserListPage = () =>{
    const [listUsers, setlistUsers]=useState([]);

    const ListarUsuarios= async () =>{
        try{
            const response= await api.get('users/');
            setlistUsers(response.data);
        }catch(error){
            console.log(error.message);
        };
    };

    useEffect(()=>{
        ListarUsuarios();
    }, []);

    return(
        <div className="">
            <h2 className="text-2xl font-bold mb-8 text-black dark:text-white uppercase">Listado de usuarios</h2>

            <div className="flex md:justify-between md:items-center md:flex-row flex-col md:gap-0 gap-4 mb-6">
                
                <form class="md:w-96 h-auto">   
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-color4 dark:border-color5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600" placeholder="Search Mockups, Logos..." required />
                        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Buscar
                        </button>
                    </div>
                </form>

                <button className="bg-blue-600 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3.5 px-6 rounded" title="Editar">
                    Nuevo usuario
                </button>

            </div>

            <div className="overflow-x-auto rounded-lg dark:bg-color4">
                <table className="min-w-full border border-gray-200 dark:border-color5">
                    <thead className="bg-gray-100 dark:bg-color2 dark:text-white text-gray-700 text-sm">
                        <tr>
                            <th className="px-6 py-3 text-left font-bold">ID</th>
                            <th className="px-6 py-3 text-left font-bold">Nombre</th>
                            <th className="px-6 py-3 text-left font-bold">Apellido</th>
                            <th className="px-6 py-3 text-left font-bold">Correo electrónico</th>
                            <th className="px-6 py-3 text-left font-bold">Género</th>
                            <th className="px-6 py-3 text-left font-bold">Rol</th>
                            <th className="px-6 py-3 text-left font-bold">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-gray-800 dark:text-white">
                        {
                            listUsers.map((user, index) => (
                                <tr key={index} className="transition-colors duration-150 text-sm">
                                    <td className="px-6 py-3">{user.id}</td>
                                    <td className="px-6 py-3">{user.name}</td>
                                    <td className="px-6 py-3">{user.lastname}</td>
                                    <td className="px-6 py-3">{user.email}</td>
                                    <td className="px-6 py-3">{user.gender}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.rol?.namerol === "Administrador" ? "bg-blue-200 text-blue-800" : "bg-green-100 text-green-800"}`}>
                                            {user.rol?.namerol}
                                        </span>
                                    </td>

                                    <td className='px-6 py-3 flex gap-2'>
                                        <button className="bg-blue-600 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Editar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square text-white" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                            </svg>
                                        </button>
        
                                        <button className="bg-red-500 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Eliminar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill text-white" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default UserListPage;