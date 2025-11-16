import { useEffect, useState } from 'react';
import api from '../../api/apis';
import GetIdUserLogged from '../../utils/GetIdUserLogged';

const CanchasListView = () =>{
    const [listCanchas, setListCanchas] = useState([]);
    const [listCanchasCategoria, setlistCanchasCategoria] = useState([]);
    const [listCanchasEstado, setlistCanchasEstado] = useState([]);
    const [deleteCanchaModal, setDeleteCanchaModal] = useState(false); 
    const [addCanchaModal, setAddCanchaModal] = useState(false);
    const [editCanchaModal, setEditCanchaModal] = useState(false);
    const [detailCanchaModal, setDetailCanchaModal] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const idUser = GetIdUserLogged();
    const [newCancha, setNewCancha] = useState([null]);
    const [idCancha, setIdCancha] = useState('');

    useEffect(() => {
        setNewCancha(idUser);
    }, [idUser]);

    const [formData, setFormData] = useState({
        cancha_nombre: '',
        cancha_numero: '',
        cancha_dimension: '',
        cancha_precio: '',
        categoria_cancha_id: '',
        estado_cancha_id: '',
        usuario_id: '',
    });
    
    const obtenerCanchas = async () => {
        try {
            const DatosCanchas = await api.get('canchasdeportivas/');
            setListCanchas(DatosCanchas.data);

        } catch(error){
            console.log(error.message);
        };
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            usuario_id: newCancha,
        });
    };

    const AgregarNuevaCancha = async (e) => {
        e.preventDefault();

        if (formData.cancha_nombre.trim() === '' || formData.cancha_numero.trim() === '' || formData.cancha_dimension.trim() === '' || !formData.cancha_precio || formData.categoria_cancha_id.trim() === '' || formData.estado_cancha_id.trim() === '') {
            setErrors('No pueden haber campos vacíos');
            setTimeout(() => setErrors(''), 3000);
            return
        };
            
        try {
            await api.post('canchasdeportivas/', formData);
            setMessage('¡Cancha creada con exito!');
            setTimeout(() => setMessage(''), 3000);
            setErrors('');
            setFormData({ cancha_nombre: '', cancha_numero: '', cancha_dimension: '', cancha_precio: '', categoria_cancha_id: '', estado_cancha_id: ''});
            obtenerCanchas();

        } catch(error) {
            console.log(error.message);  
                        
            if (error.response?.data?.non_field_errors) {
                setErrors(error.response.data.non_field_errors[0]);
            } 
            else { setErrors('Error al crear la cancha') };

            setTimeout(() => setErrors(''), 3000);
        };

    };

    const EditarCancha = async (e) => {
        e.preventDefault();

        if (formData.cancha_nombre.trim() === '' || String(formData.cancha_numero).trim() === '' || formData.cancha_dimension.trim() === '' || !formData.cancha_precio || !formData.categoria_cancha_id || !formData.estado_cancha_id) {
            setErrors('No pueden haber campos vacíos');
            setTimeout(() => setErrors(''), 3000);

        } else {
            try {
                await api.put(`canchasdeportivas/${idCancha}/`, formData);
                setMessage('¡Cancha actualizada con exito!');
                setTimeout(() => setMessage(''), 3000);
                setFormData({ cancha_nombre: '', cancha_numero: '', cancha_dimension: '', cancha_precio: '', categoria_cancha_id: '', estado_cancha_id: ''});
                obtenerCanchas();

            } catch(error) {
                console.log(error.message);
                
                if (error.response?.data?.non_field_errors) {
                    setErrors(error.response.data.non_field_errors[0]);
                } 
                else { setErrors('Error al crear la cancha') };

                setTimeout(() => setErrors(''), 3000);
            };
        };  

    };

    const EliminarCancha = async (id) => {
        try {
            await api.delete(`canchasdeportivas/${id}/`);
            setMessage('¡Cancha eliminada con exito!');
            setDeleteCanchaModal(!deleteCanchaModal);
            obtenerCanchas();
            
        } catch(error) {
            console.log(error.message);
            console.log(formData);
        };
    };

    const getCanchasCategoria = async () => {
        try {
            const response = await api.get('categoriascancha/');
            setlistCanchasCategoria(response.data);

        } catch(error) {
            console.log(error.message);
        };
    };

    const getCanchasEstado = async () => {
        try {
            const response = await api.get('estadoscanchas/');
            setlistCanchasEstado(response.data);

        } catch(error) {
            console.log(error.message);
        };
    };

    useEffect(()=>{
        obtenerCanchas();
        getCanchasCategoria();
        getCanchasEstado();
    }, []);

    const ActivateAddModal = () => {
        setAddCanchaModal(!addCanchaModal);
        setMessage('');
        setErrors('');
    };

    const ActivateEditModal = (id) => {
        setIdCancha(id);
        const canchaSeleccionada = listCanchas.find(c => c.id === id);
        if (canchaSeleccionada) {
            setFormData({
                cancha_nombre: canchaSeleccionada.cancha_nombre || '',
                cancha_numero: canchaSeleccionada.cancha_numero || '',
                cancha_dimension: canchaSeleccionada.cancha_dimension || '',
                cancha_precio: canchaSeleccionada.cancha_precio || '',
                categoria_cancha_id: canchaSeleccionada.categoria_cancha?.id || '',
                estado_cancha_id: canchaSeleccionada.estado_cancha?.id || '',
                usuario_id: canchaSeleccionada.usuario?.id || '',
            });
        }
        setEditCanchaModal(!editCanchaModal);
        setMessage('');
        setErrors('');
    };

    const DesactivateEditModal = () => {
        setEditCanchaModal(!editCanchaModal);
    };

    const ActivateDetailModal = (id) => {
        setIdCancha(id);
        const canchaSeleccionada = listCanchas.find(c => c.id === id);
        if (canchaSeleccionada) {
            setFormData({
                cancha_nombre: canchaSeleccionada.cancha_nombre || '',
                cancha_numero: canchaSeleccionada.cancha_numero || '',
                cancha_dimension: canchaSeleccionada.cancha_dimension || '',
                cancha_precio: canchaSeleccionada.cancha_precio || '',
                categoria_cancha_id: canchaSeleccionada.categoria_cancha?.id || '',
                estado_cancha_id: canchaSeleccionada.estado_cancha?.id || '',
                usuario_id: canchaSeleccionada.usuario?.id || '',
            });
        }
        setDetailCanchaModal(!detailCanchaModal);
        setMessage('');
        setErrors('');
    };

    const DesactivateDetailModal = () => {
        setDetailCanchaModal(!detailCanchaModal);
    };

    const ActivateDeleteModal = (id) => {
        setIdCancha(id);
        setDeleteCanchaModal(!deleteCanchaModal);
    };

    const DesactivateDeleteModal = () => {
        setDeleteCanchaModal(!deleteCanchaModal);
    };

    return(
        <div className="">
            <h2 className="text-2xl font-bold mb-8 text-black dark:text-white uppercase">Listado de Canchas deportivas</h2>

            <div className="flex md:justify-between md:items-center md:flex-row flex-col md:gap-0 gap-4 mb-6">
                
                <form className="md:w-96 h-auto">   
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
                            <th className="px-6 py-3 text-left font-bold">Precio</th>
                            <th className="px-6 py-3 text-left font-bold">Categoría</th>
                            <th className="px-6 py-3 text-left font-bold">Estado</th>
                            {/* <th className="px-6 py-3 text-left font-bold">Creado por</th> */}
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
                                    <td className="px-6 py-3">{c.cancha_precio}</td>
                                    <td className="px-6 py-3">{c.categoria_cancha?.categoria_cancha_nombre}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.estado_cancha?.estado_cancha_nombre === "Disponible" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                            {c.estado_cancha?.estado_cancha_nombre}
                                        </span>
                                    </td>
                                    {/* <td className="px-6 py-3">{c.usuario?.name} {c.usuario?.lastname}</td> */}
                                    

                                    <td className='px-6 py-3 flex gap-2'>
                                        <button onClick={()=>ActivateEditModal(c.id)} className="bg-blue-600 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Actualizar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square text-white" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                            </svg>
                                        </button>
                
                                        <button onClick={()=>ActivateDeleteModal(c.id)} className="bg-red-500 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Eliminar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill text-white" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                        </button>

                                        <button onClick={()=>ActivateDetailModal(c.id)} className="bg-green-600 hover:bg-green-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Actualizar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle text-white" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
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

                            <form onSubmit={AgregarNuevaCancha} className='mt-6'>
                                <div className="flex gap-2">
                                    <div className="relative w-full mb-6">
                                        <input name='cancha_nombre' onChange={handleChange} type="text" id="cancha_nombre" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nombre</label>
                                    </div>
                                    <div className="relative w-full mb-6">
                                        <input name='cancha_numero' onChange={handleChange} type="text" id="cancha_numero" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Número</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='cancha_dimension' onChange={handleChange} type="text" id="cancha_dimension" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Dimensión</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='cancha_precio' onChange={handleChange} type="number" id="cancha_precio" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Precio</label>
                                </div>
                                
                                <select name='categoria_cancha_id' onChange={handleChange} id="categoria_cancha" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Categoría</option>
                                    {
                                        listCanchasCategoria.map((r, index) => (
                                            <option key={index} value={r.id}>{r.categoria_cancha_nombre}</option>
                                        ))
                                    }
                                </select>

                                <select name='estado_cancha_id' onChange={handleChange} id="estado_cancha" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Estado</option>
                                    {
                                        listCanchasEstado.map((r, index) => (
                                            <option key={index} value={r.id}>{r.estado_cancha_nombre}</option>
                                        ))
                                    }
                                </select>

                                

                                <p className='mb-6 text-green-500 font-semibold'>{message}</p>
                                <p className='mb-6 text-red-500 font-semibold'>{errors}</p>

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
                editCanchaModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Actualizar Cancha deportiva</h3>
                            <p className='text-black dark:text-white mt-1'>Edite una nueva cancha deportiva al sistema completando estos campos</p>

                            <form onSubmit={EditarCancha} className='mt-6'>
                                <div className="flex gap-2">
                                    <div className="relative w-full mb-6">
                                        <input name='cancha_nombre' value={formData.cancha_nombre} onChange={handleChange} type="text" id="cancha_nombre" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nombre</label>
                                    </div>
                                    <div className="relative w-full mb-6">
                                        <input name='cancha_numero' value={formData.cancha_numero} onChange={handleChange} type="text" id="cancha_numero" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Número</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='cancha_dimension' value={formData.cancha_dimension} onChange={handleChange} type="text" id="cancha_dimension" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Dimensión</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='cancha_precio' value={formData.cancha_precio} onChange={handleChange} type="text" id="cancha_precio" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Precio</label>
                                </div>
                                
                                <select name='categoria_cancha_id' value={formData.categoria_cancha_id} onChange={handleChange} id="categoria_cancha" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Categoría</option>
                                    {
                                        listCanchasCategoria.map((r, index) => (
                                            <option key={index} value={r.id}>{r.categoria_cancha_nombre}</option>
                                        ))
                                    }
                                </select>

                                <select name='estado_cancha_id' value={formData.estado_cancha_id} onChange={handleChange} id="estado_cancha" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Estado</option>
                                    {
                                        listCanchasEstado.map((r, index) => (
                                            <option key={index} value={r.id}>{r.estado_cancha_nombre}</option>
                                        ))
                                    }
                                </select>

                                <p className='mb-6 text-green-500 font-semibold'>{message}</p>
                                <p className='mb-6 text-red-500 font-semibold'>{errors}</p>

                                <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={DesactivateEditModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear usuario">
                                        Editar cancha
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {
                detailCanchaModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Detalles de la Cancha deportiva</h3>
                            <div className='mt-6'>
                                <div className="flex gap-2">
                                    <div className="relative w-full mb-6">
                                        <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.cancha_nombre}</p>
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nombre</label>
                                    </div>
                                    <div className="relative w-full mb-6">
                                        <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.cancha_numero}</p>
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Número</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.cancha_dimension}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Dimensión</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.cancha_precio}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Precio</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{listCanchasCategoria.find(r => r.id === formData.categoria_cancha_id)?.categoria_cancha_nombre || 'Sin categoría'}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Categoria</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{listCanchasEstado.find(r => r.id === formData.estado_cancha_id)?.estado_cancha_nombre || 'Sin estado'}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Estado</label>
                                </div>
                                
                                <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={DesactivateDetailModal} className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                        Volver
                                    </button>
                                </div>
                            </div>
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
                                <button onClick={DesactivateDeleteModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                    Cancelar
                                </button>
                                <button onClick={()=>EliminarCancha(idCancha)} className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Eliminar usuario">
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