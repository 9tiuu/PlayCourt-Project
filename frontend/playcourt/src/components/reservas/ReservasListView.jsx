import { useEffect, useState } from 'react';
import api from '../../api/apis';
import GetIdUserLogged from '../../utils/GetIdUserLogged';
import UserAuth from '../../utils/UserAuth';

const ReservasListView = () =>{
    const [listReservas, setListReservas] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false); 
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const [idReserva, setIdReserva] = useState('');
    const idUser = GetIdUserLogged();
    const [createdByUser, setCreatedByUser] = useState([null]);
    const [IdUsuarioOriginal, setIdUsuarioOriginal] = useState('');
    const [listCanchas, setListCanchas] = useState([]);
    const [listHorarios, setListHorarios] = useState([]);
    const [listEstadosReserva, setListEstadosReserva] = useState([]);
    const user = UserAuth();

    useEffect(() => {
        setCreatedByUser(idUser);
    }, [idUser]);

    const [formData, setFormData] = useState({
        nombre_cliente: '',
        apellido_cliente: '',
        correo_cliente: '',
        cancha_deportiva_id: '',
        reserva_precio: '',
        reserva_fecha: '',
        horario_reserva_id: '',
        estado_reserva_id: 1,
        usuario_id: '',
    });

    const [formDataUpdate, setFormDataUpdate] = useState({
        nombre_cliente: '',
        apellido_cliente: '',
        correo_cliente: '',
        cancha_deportiva_id: '',
        reserva_precio: '',
        reserva_fecha: '',
        horario_reserva_id: '',
        estado_reserva_id: '',
        usuario_id: '',
    });
    
    const obtenerReservas = async () => {
        try {
            const response = await api.get('reservascanchas/');
            setListReservas(response.data);

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

    const obtenerHorarios = async () => {
        try {
            const response = await api.get('horariosreserva/');
            setListHorarios(response.data);

        } catch(error){
            console.log(error.message);
        };
    };

    const obtenerEstadosReserva = async () => {
        try {
            const response = await api.get('estadosreserva/');
            setListEstadosReserva(response.data);

        } catch(error){
            console.log(error.message);
        };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newFormData = {
            ...formData,
            [name]: value,
            usuario_id: createdByUser,
        };

        if (name === "cancha_deportiva_id") {  // Si está cambiando la cancha, calcular su precio
            const canchaSeleccionada = listCanchas.find((r) => r.id === Number(value));
            if (canchaSeleccionada) { newFormData.reserva_precio = canchaSeleccionada.cancha_precio }
        };

        setFormData(newFormData);
    };

    const handleChangeUpdate = (e) => {
        const { name, value } = e.target;

        const newFormData = {
            ...formDataUpdate,
            [name]: value,
            usuario_id: IdUsuarioOriginal,
        };

        if (name === "cancha_deportiva_id") {  // Si está cambiando la cancha, calcular su precio
            const canchaSeleccionada = listCanchas.find((r) => r.id === Number(value));
            if (canchaSeleccionada) { newFormData.reserva_precio = canchaSeleccionada.cancha_precio }
        };

        setFormDataUpdate(newFormData);
    };

    const AgregarNuevaReserva = async (e) => {
        e.preventDefault();

        if (formData.nombre_cliente.trim() === '' || 
            formData.apellido_cliente.trim() === '' || 
            formData.correo_cliente.trim() === '' || 
            !formData.cancha_deportiva_id || 
            !formData.reserva_precio || 
            formData.reserva_fecha.trim() === '' ||
            !formData.horario_reserva_id || 
            !formData.estado_reserva_id
        ) {
            setErrors('No pueden haber campos vacíos');
            setTimeout(() => setErrors(''), 3000);
            return
        };
            
        try {
            await api.post('reservascanchas/', formData);
            setMessage('¡Reserva registrada con exito!');
            setTimeout(() => setMessage(''), 3000);

            setFormData({ 
                nombre_cliente: '',
                apellido_cliente: '',
                correo_cliente: '',
                cancha_deportiva_id: '',
                reserva_precio: '',
                reserva_fecha: '',
                horario_reserva_id: '',
                estado_reserva_id: 1,
                usuario_id: '',
            });

            obtenerReservas();
            console.log(formData);

        } catch(error) {
            console.log(error.message);
            setErrors(error.response.data.detail);
            setTimeout(() => setErrors(''), 3000);
        };
    };

    const EditarReserva = async (e) => {
        e.preventDefault();

        if (formDataUpdate.nombre_cliente.trim() === '' || 
            formDataUpdate.apellido_cliente.trim() === '' || 
            formDataUpdate.correo_cliente.trim() === '' || 
            !formDataUpdate.cancha_deportiva_id || 
            !formDataUpdate.reserva_precio || 
            formDataUpdate.reserva_fecha.trim() === '' ||
            !formDataUpdate.horario_reserva_id || 
            !formDataUpdate.estado_reserva_id
        ) {
            setErrors('No pueden haber campos vacíos');
            console.log(formDataUpdate);
            setTimeout(() => setErrors(''), 3000);
            return

        } else {
            try {
                await api.put(`reservascanchas/${idReserva}/`, formDataUpdate);
                setMessage('¡Reserva actualizada con exito!');
                setTimeout(() => setMessage(''), 3000);
                obtenerReservas();

            } catch(error) {
                console.log(error.message);
                setErrors(error.response.data.detail);
                setTimeout(() => setErrors(''), 3000);
            };
        };  
    };

    const EliminarReserva = async (id) => {
        try {
            await api.delete(`reservascanchas/${id}/`);
            setMessage('Reserva eliminada con exito!');
            setTimeout(() => setMessage(''), 3000);

            setDeleteModal(!deleteModal);
            obtenerReservas();
            
        } catch(error) {
            console.log(error.message);
        };
    };

    useEffect(()=>{
        obtenerReservas();
        obtenerCanchas();
        obtenerHorarios();
        obtenerEstadosReserva();
    }, []);

    const ActivateAddModal = () => {
        setAddModal(!addModal);
        setMessage('');
        setErrors('');
    };

    const ActivateEditModal = (id, UsuarioOriginal) => {
        setIdReserva(id);
        setIdUsuarioOriginal(UsuarioOriginal);
        const reservaSeleccionada = listReservas.find(c => c.id === id);

        if (reservaSeleccionada) {
            setFormDataUpdate({
                nombre_cliente: reservaSeleccionada.nombre_cliente || '',
                apellido_cliente: reservaSeleccionada.apellido_cliente || '',
                correo_cliente: reservaSeleccionada.correo_cliente || '',
                cancha_deportiva_id: reservaSeleccionada.cancha_deportiva?.id || '',
                reserva_precio: reservaSeleccionada.reserva_precio || '',
                reserva_fecha: reservaSeleccionada.reserva_fecha || '',
                horario_reserva_id: reservaSeleccionada.horario_reserva?.id || '',
                estado_reserva_id: reservaSeleccionada.estado_reserva?.id || '',
                usuario_id: reservaSeleccionada.usuario?.id || '',
            });
        };

        setUpdateModal(!updateModal);
        setMessage('');
        setErrors('');
    };

    const DesactivateEditModal = () => {
        setUpdateModal(!updateModal);
    };

    const ActivateDetailModal = (id) => {
        setIdReserva(id);
        const reservaSeleccionada = listReservas.find(c => c.id === id);

        if (reservaSeleccionada) {
            setFormDataUpdate({
                nombre_cliente: reservaSeleccionada.nombre_cliente || '',
                apellido_cliente: reservaSeleccionada.apellido_cliente || '',
                correo_cliente: reservaSeleccionada.correo_cliente || '',
                cancha_deportiva_id: reservaSeleccionada.cancha_deportiva?.id || '',
                reserva_precio: reservaSeleccionada.reserva_precio || '',
                reserva_fecha: reservaSeleccionada.reserva_fecha || '',
                horario_reserva_id: reservaSeleccionada.horario_reserva?.id || '',
                estado_reserva_id: reservaSeleccionada.estado_reserva?.id || '',
                usuario_id: reservaSeleccionada.usuario?.id || '',
            });
        };
        
        setDetailsModal(!detailsModal);
        setMessage('');
        setErrors('');
    };

    const DesactivateDetailModal = () => {
        setDetailsModal(!detailsModal);
    };

    const ActivateDeleteModal = (id) => {
        setIdReserva(id);
        setDeleteModal(!deleteModal);
    };

    const DesactivateDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    return(
        <div className="">
            <h2 className="text-2xl font-bold mb-8 text-black dark:text-white uppercase">Listado de Reservas</h2>

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

                    Nueva reserva
                </button>

            </div>

            <div className="max-h-[28rem] overflow-x-auto rounded-lg dark:bg-color4">
                <table className="min-w-full border border-gray-200 dark:border-color5">
                    <thead className="bg-gray-100 dark:bg-color2 dark:text-white text-gray-700 text-sm">
                        <tr>
                            <th className="px-6 py-3 text-left font-bold">ID</th>
                            <th className="px-6 py-3 text-left font-bold">Cancha deportiva</th>
                            {/* <th className="px-6 py-3 text-left font-bold">Nº Cancha</th> */}
                            <th className="px-6 py-3 text-left font-bold">Precio</th>
                            <th className="px-6 py-3 text-left font-bold">Fecha de reserva</th>
                            <th className="px-6 py-3 text-left font-bold">Hora de reserva</th>
                            <th className="px-6 py-3 text-left font-bold">Hora de expiración</th>
                            <th className="px-6 py-3 text-left font-bold">Estado de reserva</th>
                            <th className="px-6 py-3 text-left font-bold">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-color5 text-gray-800 dark:text-white">
                        {
                            listReservas.map((c, index) => (
                                <tr key={index} className="transition-colors duration-150 text-sm">
                                    <td className="px-6 py-3">{c.id}</td>
                                    <td className="px-6 py-3">{c.cancha_deportiva?.cancha_nombre} Nº{c.cancha_deportiva?.cancha_numero}</td>
                                    {/* <td className="px-6 py-3">{c.cancha_deportiva?.cancha_numero}</td> */}
                                    <td className="px-6 py-3">${c.reserva_precio}</td>
                                    <td className="px-6 py-3">{c.reserva_fecha}</td>
                                    <td className="px-6 py-3">{c.horario_reserva?.horario_reserva_hora} - {c.horario_reserva?.horario_reserva_termino}</td>
                                    <td className="px-6 py-3">{c.horario_reserva?.horario_reserva_expiracion}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.estado_reserva?.estado_reserva_nombre === "Por Pagar" ? "bg-orange-200 text-orange-600" : c.estado_reserva?.estado_reserva_nombre === "Pagado" ? "bg-green-100 text-green-700" : c.estado_reserva?.estado_reserva_nombre === "Cancelado" ? "bg-red-100 text-red-700" : "bg-gray-100 text-black"}`}>
                                            {c.estado_reserva?.estado_reserva_nombre}
                                        </span>
                                    </td>

                                    <td className='px-6 py-3 flex gap-2'>
                                        <button onClick={()=>ActivateEditModal(c.id, c.usuario?.id)} className="bg-blue-600 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Actualizar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square text-white" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                            </svg>
                                        </button>

                                        {
                                            user?.rol.namerol !== 'Administrador' ? (
                                                <></>
                                            ) : (
                                                <button onClick={()=>ActivateDeleteModal(c.id)} className="bg-red-500 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Eliminar">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill text-white" viewBox="0 0 16 16">
                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                                    </svg>
                                                </button>
                                            )
                                        }                        

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
                addModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Nueva reserva</h3>
                            <p className='text-black dark:text-white mt-1'>Agregue una nueva reserva al sistema completando estos campos</p>

                            <form onSubmit={AgregarNuevaReserva} className='mt-6 overflow-y-auto h-[31rem]'>
                                <div className="flex gap-3">
                                    <div className="relative w-full mb-3">
                                        <input name='nombre_cliente' value={formData.nombre_cliente} onChange={handleChange} type="text" id="nombre_cliente" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nombre cliente</label>
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <input name='apellido_cliente' value={formData.apellido_cliente} onChange={handleChange} type="text" id="apellido_cliente" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Apellido cliente</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-3">
                                    <input name='correo_cliente' value={formData.correo_cliente} onChange={handleChange} type="email" id="correo_cliente" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Correo cliente</label>
                                </div>
                                
                                <select name='cancha_deportiva_id' value={formData.cancha_deportiva_id} onChange={handleChange} id="cancha_deportiva_id" className="bg-white border mb-3 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Seleccionar cancha deportiva</option>
                                    {
                                        listCanchas.map((c, index) => (
                                            <option key={index} value={c.id}>{c.cancha_nombre} Nº{c.cancha_numero}</option>
                                        ))
                                    }
                                </select>

                                <div className="relative w-full mb-3">
                                    <input name='reserva_precio' value={formData.reserva_precio} onChange={handleChange} type="number" id="reserva_precio" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Precio</label>
                                </div>

                                <div className="relative w-full mb-3">
                                    <input name='reserva_fecha' value={formData.reserva_fecha} onChange={handleChange} type="date" id="reserva_fecha" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Fecha a reservar</label>
                                </div>

                                <select name='horario_reserva_id' value={formData.horario_reserva_id} onChange={handleChange} id="horario_reserva_id" className="bg-white border mb-3 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Seleccionar horario de reserva</option>
                                    {
                                        listHorarios.map((c, index) => (
                                            <option key={index} value={c.id}>{c.horario_reserva_hora} - {c.horario_reserva_termino}</option>
                                        ))
                                    }
                                </select>

                                <select name='estado_reserva_id' value={formData.estado_reserva_id} onChange={handleChange} id="estado_reserva_id" className="bg-white border mb-4 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Seleccionar estado de reserva</option>
                                    {
                                        listEstadosReserva.map((c, index) => (
                                            <option key={index} value={c.id}>{c.estado_reserva_nombre}</option>
                                        ))
                                    }
                                </select>

                                <p className='mb-3 text-green-500 font-semibold'>{message}</p>
                                <p className='mb-3 text-red-500 font-semibold'>{errors}</p>

                                <div className="flex mr-3 gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={ActivateAddModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                        Cancelar
                                    </button>
                                    <button  className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear usuario">
                                        Registrar reserva
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            
            {
                updateModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Nueva reserva</h3>
                            <p className='text-black dark:text-white mt-1'>Agregue una nueva reserva al sistema completando estos campos</p>

                            <form onSubmit={EditarReserva} className='mt-6 overflow-y-auto h-[31rem]'>
                                <div className="flex gap-3">
                                    <div className="relative w-full mb-3">
                                        <input name='nombre_cliente' value={formDataUpdate.nombre_cliente} onChange={handleChangeUpdate} type="text" id="nombre_cliente" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nombre cliente</label>
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <input name='apellido_cliente' value={formDataUpdate.apellido_cliente} onChange={handleChangeUpdate} type="text" id="apellido_cliente" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Apellido cliente</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-3">
                                    <input name='correo_cliente' value={formDataUpdate.correo_cliente} onChange={handleChangeUpdate} type="email" id="correo_cliente" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Correo cliente</label>
                                </div>
                                
                                <select name='cancha_deportiva_id' value={formDataUpdate.cancha_deportiva_id} onChange={handleChangeUpdate} id="cancha_deportiva_id" className="bg-white border mb-3 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Seleccionar cancha deportiva</option>
                                    {
                                        listCanchas.map((c, index) => (
                                            <option key={index} value={c.id}>{c.cancha_nombre} Nº{c.cancha_numero}</option>
                                        ))
                                    }
                                </select>

                                <div className="relative w-full mb-3">
                                    <input name='reserva_precio' value={formDataUpdate.reserva_precio} onChange={handleChangeUpdate} type="number" id="reserva_precio" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Precio</label>
                                </div>

                                <div className="relative w-full mb-3">
                                    <input name='reserva_fecha' value={formDataUpdate.reserva_fecha} onChange={handleChangeUpdate} type="date" id="reserva_fecha" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Fecha a reservar</label>
                                </div>

                                <select name='horario_reserva_id' value={formDataUpdate.horario_reserva_id} onChange={handleChangeUpdate} id="horario_reserva_id" className="bg-white border mb-3 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Seleccionar horario de reserva</option>
                                    {
                                        listHorarios.map((c, index) => (
                                            <option key={index} value={c.id}>{c.horario_reserva_hora} - {c.horario_reserva_termino}</option>
                                        ))
                                    }
                                </select>

                                <select name='estado_reserva_id' value={formDataUpdate.estado_reserva_id} onChange={handleChangeUpdate} id="estado_reserva_id" className="bg-white border mb-4 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Seleccionar estado de reserva</option>
                                    {
                                        listEstadosReserva.map((c, index) => (
                                            <option key={index} value={c.id}>{c.estado_reserva_nombre}</option>
                                        ))
                                    }
                                </select>

                                <p className='mb-3 text-green-500 font-semibold'>{message}</p>
                                <p className='mb-3 text-red-500 font-semibold'>{errors}</p>

                                <div className="flex mr-3 gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={DesactivateEditModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                        Cancelar
                                    </button>
                                    <button  className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear usuario">
                                        Actualizar reserva
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {
                detailsModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Detalles de horario de reserva</h3>
                            <div className='mt-6'>
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.horario_reserva_hora}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Hora de inicio</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.horario_reserva_termino}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Hora de termino</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.horario_reserva_expiracion}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Hora de expiración</label>
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
                deleteModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>¿Eliminar reserva?</h3>
                            <p className='text-black dark:text-white mt-1 mb-6'>Se eliminará la reserva seleccionada de manera permanente. ¿Seguro que quieres eliminarla?</p>

                            <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                <button onClick={DesactivateDeleteModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                    Cancelar
                                </button>
                                <button onClick={() => EliminarReserva(idReserva)} className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Eliminar usuario">
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
export default ReservasListView;