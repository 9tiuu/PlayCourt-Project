import { useEffect, useState } from 'react';
import api from '../../api/apis';

const CanchasListView = () =>{
    const [addCanchaModal, setAddCanchaModal] = useState(false);
    const [deleteCanchaModal, setDeleteCanchaModal] = useState(false); 
    const [listCanchas, setListCanchas] = useState([]);

    const obtenerCanchas = async () => {
        try {
            const DatosCanchas = await api.get('canchasdeportivas/');
            setListCanchas(DatosCanchas.data);

        } catch(error){
            console.log(error.message);
        };
    };

    const AgregarNuevaCancha = async (e) => {
        e.preventDefault();

    };

    useEffect(()=>{
        obtenerCanchas();
    }, []);

    const ActivateAddModal = () => {
        setAddCanchaModal(!addCanchaModal);
    };

    const ActivateDeleteModal = () => {
        setDeleteCanchaModal(!deleteCanchaModal);
    };

    return(
        <div className="">
            <h2 className="text-2xl font-bold mb-8 text-black dark:text-white uppercase">Listado de Canchas deportivas</h2>

            <div className="flex md:justify-between md:items-center md:flex-row flex-col md:gap-0 gap-4 mb-6">
                
                <form onSubmit={AgregarNuevaCancha} className="md:w-96 h-auto">   
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-600 focus:border-blue-600 dark:bg-color4 dark:border-color5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600" placeholder="Search Mockups, Logos..." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Buscar
                        </button>
                    </div>
                </form>

                <button onClick={ActivateAddModal} className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3.5 px-6 rounded" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
                        <path d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Nueva cancha
                </button>

            </div>

            <div className="overflow-x-auto rounded-lg dark:bg-color4">
                <table className="min-w-full border border-gray-200 dark:border-color5">
                    <thead className="bg-gray-100 dark:bg-color2 dark:text-white text-gray-700 text-sm">
                        <tr>
                            <th className="px-6 py-3 text-left font-bold">ID</th>
                            <th className="px-6 py-3 text-left font-bold">Nombre</th>
                            <th className="px-6 py-3 text-left font-bold">Número</th>
                            <th className="px-6 py-3 text-left font-bold">Dimensión</th>
                            <th className="px-6 py-3 text-left font-bold">Categoría</th>
                            <th className="px-6 py-3 text-left font-bold">Estado</th>
                            <th className="px-6 py-3 text-left font-bold">Creado por</th>
                            <th className="px-6 py-3 text-left font-bold">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-color5 text-gray-800 dark:text-white">
                        {
                            listCanchas.map((c, index) => (
                                <tr key={index} className="transition-colors duration-150 text-sm">
                                    <td className="px-6 py-3">{c.id}</td>
                                    <td className="px-6 py-3">{c.cancha_nombre}</td>
                                    <td className="px-6 py-3">{c.cancha_numero}</td>
                                    <td className="px-6 py-3">{c.cancha_dimension}</td>
                                    <td className="px-6 py-3">{c.categoria_cancha?.categoria_cancha_nombre}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.estado_cancha?.estado_cancha_nombre === "Disponible" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                            {c.estado_cancha?.estado_cancha_nombre}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">{c.usuario?.name} {c.usuario?.lastname}</td>
                                    

                                    <td className='px-6 py-3 flex gap-2'>
                                        <button className="bg-blue-600 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Actualizar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square text-white" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                            </svg>
                                        </button>
                
                                        <button onClick={ActivateDeleteModal} className="bg-red-500 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Eliminar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill text-white" viewBox="0 0 16 16">
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

            {
                addCanchaModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Nueva Cancha deportiva</h3>
                            <p className='text-black dark:text-white mt-1'>Agregue una nueva cancha deportiva al sistema completando estos campos</p>

                            <form className='mt-6'>
                                <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={ActivateAddModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                        Cancelar
                                    </button>
                                    <button  className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear usuario">
                                        Crear cancha
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {
                deleteCanchaModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>¿Eliminar cancha deportiva?</h3>
                            <p className='text-black dark:text-white mt-1 mb-6'>Se eliminará la cancha seleccionada de manera permanente. ¿Seguro que quieres eliminarla?</p>

                            <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                <button onClick={ActivateDeleteModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                    Cancelar
                                </button>
                                <button  className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Eliminar usuario">
                                    Si, eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default CanchasListView;