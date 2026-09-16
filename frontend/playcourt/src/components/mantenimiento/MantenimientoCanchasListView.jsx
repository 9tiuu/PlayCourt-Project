import { useEffect, useState } from 'react';
import api from '../../api/apis';
import GetIdUserLogged from '../../utils/GetIdUserLogged';

const MantenimientoCanchasListView = () =>{
    const [listMantenciones, setListMantenciones] = useState([]);
    const [listMantencionesEstado, setlistMantencionesEstado] = useState([]);
    const [listCanchas, setListCanchas] = useState([]);
    const [listUsers, setlistUsers] = useState([]);
    const [deleteMantencionModal, setDeleteMantencionModal] = useState(false); 
    const [addMantencionModal, setAddMantencionModal] = useState(false);
    const [editMantencionModal, setEditMantencionModal] = useState(false);
    const [detailMantencionModal, setDetailMantencionModal] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const idUser = GetIdUserLogged();
    const [newMantencion, setNewMantencion] = useState([null]);
    const [idMantencion, setIdmantencion] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setNewMantencion(idUser);
    }, [idUser]);

    const [formData, setFormData] = useState({
        cancha_deportiva_id: '',
        mantencion_fecha: '',
        mantencion_descripcion: '',
        estado_mantencion_id: '',
        mantencion_proxima_fecha: '',
        mantencion_observaciones: '',
        usuario_id: '',
    });

    const getUsers = async () => {
        try {
            const response = await api.get('users/');
            setlistUsers(response.data);

        } catch(error){
            console.log(error.message);
        };
    };
    
    const obtenerMantenciones = async () => {
        try {
            const DatosMantenciones = await api.get('mantencioncanchas/');
            setListMantenciones(DatosMantenciones.data);

        } catch(error){
            console.log(error.message);
        };
    };

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
            usuario_id: newMantencion,
        });
    };

    const AgregarNuevaMantencion = async (e) => {
        e.preventDefault();

        if (!formData.cancha_deportiva_id || formData.mantencion_fecha.trim() === '' || formData.mantencion_descripcion.trim() === '' || !formData.estado_mantencion_id || formData.mantencion_proxima_fecha.trim() === '' || formData.mantencion_observaciones.trim() === '') {
            setErrors('No pueden haber campos vacíos');
            setTimeout(() => setErrors(''), 3000);
            return
        };
            
        try {
            await api.post('mantencioncanchas/', formData);
            setMessage('Mantenimiento de cancha creada con exito!');
            setTimeout(() => setMessage(''), 3000);
            setErrors('');
            setFormData({ cancha_deportiva_id: '', mantencion_fecha: '', mantencion_descripcion: '', estado_mantencion_id: '', mantencion_proxima_fecha: '', mantencion_observaciones: '', usuario_id: ''});
            obtenerMantenciones();

        } catch(error) {
            console.log(error.message);  
                        
            if (error.response?.data?.non_field_errors) {
                setErrors(error.response.data.non_field_errors[0]);
            } 
            else { setErrors('Error al crear la mantencion') };

            setTimeout(() => setErrors(''), 3000);
        };

    };

    const EditarMantencion = async (e) => {
        e.preventDefault();

        if (!formData.cancha_deportiva_id || formData.mantencion_fecha.trim() === '' || formData.mantencion_descripcion.trim() === '' || !formData.estado_mantencion_id || formData.mantencion_proxima_fecha.trim() === '' || formData.mantencion_observaciones.trim() === '') {
            setErrors('No pueden haber campos vacíos');
            setTimeout(() => setErrors(''), 3000);

        } else {
            try {
                await api.put(`mantencioncanchas/${idMantencion}/`, formData);
                setMessage('¡Mantención de cancha actualizada con exito!');
                setTimeout(() => setMessage(''), 3000);
                obtenerMantenciones();

            } catch(error) {
                console.log(error.message);
                
                if (error.response?.data?.non_field_errors) {
                    setErrors(error.response.data.non_field_errors[0]);
                } 
                else { setErrors('Error al crear la mantencion') };

                setTimeout(() => setErrors(''), 3000);
            };
        };  

    };

    const EliminarMantencion = async (id) => {
        try {
            await api.delete(`mantencioncanchas/${id}/`);
            setMessage('¡Cancha eliminada con exito!');
            setDeleteMantencionModal(!deleteMantencionModal);
            obtenerMantenciones();
            
        } catch(error) {
            console.log(error.message);
            console.log(formData);
        };
    };

    const getMantencionesEstado = async () => {
        try {
            const response = await api.get('estadosmantencion/');
            setlistMantencionesEstado(response.data);

        } catch(error) {
            console.log(error.message);
        };
    };

    useEffect(()=>{
        obtenerMantenciones();
        obtenerCanchas();
        getMantencionesEstado();
        getUsers();
    }, []);

    const ActivateAddModal = () => {
        setAddMantencionModal(!addMantencionModal);
        setMessage('');
        setErrors('');
    };

    const ActivateEditModal = (id) => {
        setIdmantencion(id);
        const mantencionSeleccionada = listMantenciones.find(c => c.id === id);
        if (mantencionSeleccionada) {
            setFormData({
                cancha_deportiva_id: mantencionSeleccionada.cancha_deportiva?.id || '',
                mantencion_fecha: mantencionSeleccionada.mantencion_fecha || '',
                mantencion_descripcion: mantencionSeleccionada.mantencion_descripcion || '',
                estado_mantencion_id: mantencionSeleccionada.estado_mantencion?.id || '',
                mantencion_proxima_fecha: mantencionSeleccionada.mantencion_proxima_fecha || '',
                mantencion_observaciones: mantencionSeleccionada.mantencion_observaciones || '',
                usuario_id: mantencionSeleccionada.usuario?.id || '',
            });
        }
        setEditMantencionModal(!editMantencionModal);
        setMessage('');
        setErrors('');
    };

    const DesactivateEditModal = () => {
        setEditMantencionModal(!editMantencionModal);
    };

    const ActivateDetailModal = (id) => {
        setIdmantencion(id);
        const mantencionSeleccionada = listMantenciones.find(c => c.id === id);
        if (mantencionSeleccionada) {
            setFormData({
                cancha_deportiva_id: mantencionSeleccionada.cancha_deportiva?.id || '',
                mantencion_fecha: mantencionSeleccionada.mantencion_fecha || '',
                mantencion_descripcion: mantencionSeleccionada.mantencion_descripcion || '',
                estado_mantencion_id: mantencionSeleccionada.estado_mantencion?.id || '',
                mantencion_proxima_fecha: mantencionSeleccionada.mantencion_proxima_fecha || '',
                mantencion_observaciones: mantencionSeleccionada.mantencion_observaciones || '',
                usuario_id: mantencionSeleccionada.usuario?.id || '',
            });
        }
        setDetailMantencionModal(!detailMantencionModal);
        setMessage('');
        setErrors('');
    };

    const DesactivateDetailModal = () => {
        setDetailMantencionModal(!detailMantencionModal);
    };

    const ActivateDeleteModal = (id) => {
        setIdmantencion(id);
        setDeleteMantencionModal(!deleteMantencionModal);
    };

    const DesactivateDeleteModal = () => {
        setDeleteMantencionModal(!deleteMantencionModal);
    };

    const filteredMantenciones = listMantenciones.filter((res) => {
        const fecha = res.mantencion_fecha?.toLowerCase() || "";
        const estado = res.estado_mantencion?.estado_mantencion_nombre.toLowerCase() || "";

        const texto = searchTerm.toLowerCase();

        return (
            fecha.includes(texto) ||
            estado.includes(texto)
        );
    });

    return(
        <div className="">
            <h2 className="text-2xl font-bold mb-8 text-black dark:text-white uppercase">Registros de Mantenimientos</h2>

            <div className="flex md:justify-between md:items-center md:flex-row flex-col md:gap-0 gap-4 mb-6">
                
                <div className="md:w-96 h-auto">   
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-600 focus:border-blue-600 dark:bg-color4 dark:border-color5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600" placeholder="Nombre o categoría" />
                    </div>
                </div>

                <button onClick={ActivateAddModal} className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3.5 px-6 rounded" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
                        <path d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Nuevo Registro
                </button>

            </div>

            <div className="overflow-x-auto rounded-lg dark:bg-color4">
                <table className="min-w-full border border-gray-200 dark:border-color5">
                    <thead className="bg-gray-100 dark:bg-color2 dark:text-white text-gray-700 text-sm">
                        <tr>
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">ID</th>
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Cancha</th>
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Número</th>
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Fecha de Mantención</th>
                            {/* <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Descripción</th> */}
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Estado</th>
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Próxima Fecha de Mantención</th>
                            {/* <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Observaciones</th> */}
                            {/* <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Creado por</th> */}
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-color5 text-gray-800 dark:text-white">
                        {
                            filteredMantenciones.map((c, index) => (
                                <tr key={index} className="transition-colors duration-150 text-sm">
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.id}</td>
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.cancha_deportiva?.cancha_nombre}</td>
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">N°{c.cancha_deportiva?.cancha_numero}</td>
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.mantencion_fecha}</td>
                                    {/* <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.mantencion_descripcion}</td> */}
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.estado_mantencion?.estado_mantencion_nombre === "Por iniciar" ? "bg-blue-100 text-blue-800" : c.estado_mantencion?.estado_mantencion_nombre === "En proceso" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"}`}>
                                            {c.estado_mantencion?.estado_mantencion_nombre}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.mantencion_proxima_fecha}</td>
                                    {/* <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.mantencion_observaciones}</td> */}
                                    {/* <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.usuario?.name} {c.usuario?.lastname}</td> */}
                                    

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
                addMantencionModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Nueva Mantención de Cancha deportiva</h3>
                            <p className='text-black dark:text-white mt-1'>Agregue una nueva mantención de cancha deportiva al sistema completando estos campos</p>

                            <form onSubmit={AgregarNuevaMantencion} className='mt-6'>
                                <div className="flex gap-2 mb-6">
                                    <select name='cancha_deportiva_id' onChange={handleChange} id="cancha_deportiva_id" className="bg-white border border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                        <option selected value={''}>Seleccionar cancha deportiva</option>
                                        {
                                            listCanchas.map((c, index) => (
                                                <option key={index} value={c.id}>{c.cancha_nombre} Nº{c.cancha_numero}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="relative w-full">
                                        <input name='mantencion_fecha' onChange={handleChange} type="date" id="mantencion_fecha" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Fecha de mantención</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='mantencion_descripcion' onChange={handleChange} type="text" id="mantencion_descripcion" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Descripción</label>
                                </div>
                                
                                <select name='estado_mantencion_id' onChange={handleChange} id="estado_mantencion" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Estado</option>
                                    {
                                        listMantencionesEstado.map((r, index) => (
                                            <option key={index} value={r.id}>{r.estado_mantencion_nombre}</option>
                                        ))
                                    }
                                </select>

                                <div className="relative w-full mb-6">
                                    <input name='mantencion_proxima_fecha' onChange={handleChange} type="date" id="mantencion_proxima_fecha" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Próxima fecha de mantención</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <input name='mantencion_observaciones' onChange={handleChange} type="text" id="mantencion_observaciones" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Observaciones</label>
                                </div>

                                <p className='mb-6 text-green-500 font-semibold'>{message}</p>
                                <p className='mb-6 text-red-500 font-semibold'>{errors}</p>

                                <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={ActivateAddModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                        Cancelar
                                    </button>
                                    <button  className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear mantencion">
                                        Crear Mantención
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            
            {
                editMantencionModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Actualizar Registro</h3>
                            <p className='text-black dark:text-white mt-1'>Edite el registro de mantención seleccionado completando estos campos</p>

                            <form onSubmit={EditarMantencion} className='mt-6'>
                                <div className="flex gap-2 mb-6">
                                    <select name='cancha_deportiva_id' value={formData.cancha_deportiva_id} onChange={handleChange} id="cancha_deportiva_id" className="bg-white border border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                        <option selected value={''}>Seleccionar cancha deportiva</option>
                                        {
                                            listCanchas.map((c, index) => (
                                                <option key={index} value={c.id}>{c.cancha_nombre} Nº{c.cancha_numero}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="relative w-full">
                                        <input name='mantencion_fecha' value={formData.mantencion_fecha} onChange={handleChange} type="date" id="mantencion_fecha" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Fecha de mantención</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='mantencion_descripcion' value={formData.mantencion_descripcion} onChange={handleChange} type="text" id="mantencion_descripcion" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Descripción</label>
                                </div>
                                
                                <select name='estado_mantencion_id' value={formData.estado_mantencion_id} onChange={handleChange} id="estado_mantencion" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Estado</option>
                                    {
                                        listMantencionesEstado.map((r, index) => (
                                            <option key={index} value={r.id}>{r.estado_mantencion_nombre}</option>
                                        ))
                                    }
                                </select>

                                <div className="relative w-full mb-6">
                                    <input name='mantencion_proxima_fecha' value={formData.mantencion_proxima_fecha} onChange={handleChange} type="date" id="mantencion_proxima_fecha" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Próxima fecha de mantención</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <input name='mantencion_observaciones' value={formData.mantencion_observaciones} onChange={handleChange} type="text" id="mantencion_observaciones" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Observaciones</label>
                                </div>


                                <p className='mb-6 text-green-500 font-semibold'>{message}</p>
                                <p className='mb-6 text-red-500 font-semibold'>{errors}</p>

                                <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={DesactivateEditModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Editar usuario">
                                        Actualizar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {
                detailMantencionModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Detalles de la Mantención de la Cancha deportiva</h3>
                            <div className='mt-6'>
                                <div className="flex gap-2">
                                    <div className="relative w-full mb-6">
                                        <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{listCanchas.find(r => r.id === formData.cancha_deportiva_id)?.cancha_nombre || 'No hay cancha'} N°{listCanchas.find(r => r.id === formData.cancha_deportiva_id)?.cancha_numero || 'No hay numero'}</p>
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Cancha</label>
                                    </div>
                                    <div className="relative w-full mb-6">
                                        <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.mantencion_fecha}</p>
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Fecha de mantención</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.mantencion_descripcion}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Descripción</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{listMantencionesEstado.find(r => r.id === formData.estado_mantencion_id)?.estado_mantencion_nombre || 'No hay Estado'}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Estado</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.mantencion_proxima_fecha}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Próxima fecha de mantención</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.mantencion_observaciones}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Observaciones</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{listUsers.find(r => r.id === formData.usuario_id)?.name || ''} {listUsers.find(r => r.id === formData.usuario_id)?.lastname || 'Cliente Web'}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Usuario</label>
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
                deleteMantencionModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>¿Eliminar mantención de cancha deportiva?</h3>
                            <p className='text-black dark:text-white mt-1 mb-6'>Se eliminará la mantención seleccionada de manera permanente. ¿Seguro que quieres eliminarla?</p>

                            <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                <button onClick={DesactivateDeleteModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                    Cancelar
                                </button>
                                <button onClick={()=>EliminarMantencion(idMantencion)} className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Eliminar mantención">
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
export default MantenimientoCanchasListView;