import { useEffect, useState } from 'react';
import api from '../../api/apis';

const ReservasPagadasListView = () =>{
    const [listReservas, setListReservas] = useState([]);
    const [detailsModal, setDetailsModal] = useState(false);
    const [listCanchas, setListCanchas] = useState([]);
    const [listHorarios, setListHorarios] = useState([]);
    const [listEstadosReserva, setListEstadosReserva] = useState([]);
    const [listUsers, setlistUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getUsers = async () => {
        try {
            const response = await api.get('users/');
            setlistUsers(response.data);

        } catch(error){
            console.log(error.message);
        };
    };

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
            console.log("FECHAS QUE LLEGAN:", response.data.map(r => r.reserva_fecha));
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

    

    useEffect(()=>{
        obtenerReservas();
        obtenerCanchas();
        obtenerHorarios();
        obtenerEstadosReserva();
        getUsers();
    }, []);

    const ActivateDetailModal = (id) => {
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
    };

    const DesactivateDetailModal = () => {
        setDetailsModal(!detailsModal);
    };

    const filteredReservas = listReservas
        .filter(res => res.estado_reserva?.estado_reserva_nombre === "Pagado")
        .filter((res) => {
            const cancha = res.cancha_deportiva?.cancha_nombre?.toLowerCase() || "";
            const fecha = res.reserva_fecha || "";
            const texto = searchTerm.toLowerCase();

            return cancha.includes(texto) || fecha.includes(texto);
        });

    return(
        <div className="">
            <h2 className="text-2xl font-bold mb-8 text-black dark:text-white uppercase">Listado de Reservas</h2>

            <div className="flex md:justify-between md:items-center md:flex-row flex-col md:gap-0 gap-4 mb-6">
                
                <div className="md:w-96 h-auto">   
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-600 focus:border-blue-600 dark:bg-color4 dark:border-color5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600" placeholder="Nombre / fecha de reserva" />
                    </div>
                </div>

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
                            filteredReservas.map((c, index) => (
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
                detailsModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Detalles de la reserva</h3>
                            <p className='text-black dark:text-white mt-1'></p>

                            <div className='mt-6 overflow-y-auto h-[31rem]'>
                                <div className="flex gap-3 mt-1">
                                    <div className="relative w-full mb-3">
                                        <p className='className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-[1px] border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"'>
                                            {formDataUpdate.nombre_cliente}
                                        </p>
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nombre cliente</label>
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <p className='className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-[1px] border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"'>
                                            {formDataUpdate.apellido_cliente}
                                        </p>
                                        
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Apellido cliente</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-3">
                                    <p className='className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-[1px] border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"'>
                                        {formDataUpdate.correo_cliente}
                                    </p>
                                    
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Correo cliente</label>
                                </div>

                                <div className="relative w-full mb-3">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                        {listCanchas.find(r => r.id === formDataUpdate.cancha_deportiva_id)?.cancha_nombre || ''} Nº{listCanchas.find(r => r.id === formDataUpdate.cancha_deportiva_id)?.cancha_numero || ''}       
                                    </p>
                                    
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Cancha deportiva</label>
                                </div>                

                                <div className="relative w-full mb-3">
                                    <p className='className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-[1px] border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"'>
                                        {formDataUpdate.reserva_precio}
                                    </p>
                                    
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Precio</label>
                                </div>

                                <div className="relative w-full mb-3">
                                    <p className='className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-[1px] border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"'>
                                        {formDataUpdate.reserva_fecha}
                                    </p>
                                    
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Fecha reservada</label>
                                </div>

                                <div className="relative w-full mb-3">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                        {listHorarios.find(r => r.id === formDataUpdate.horario_reserva_id)?.horario_reserva_hora || ''} - {listHorarios.find(r => r.id === formDataUpdate.horario_reserva_id)?.horario_reserva_termino || ''}      
                                    </p>
                                    
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Horario reservado</label>
                                </div>  

                                <div className="relative w-full mb-3">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                        {listEstadosReserva.find(r => r.id === formDataUpdate.estado_reserva_id)?.estado_reserva_nombre || ''}
                                    </p>
                                    
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Horario reservado</label>
                                </div>  

                                <div className="relative w-full mb-3">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                        {listUsers.find(r => r.id === formDataUpdate.usuario_id)?.name || ''} {listUsers.find(r => r.id === formDataUpdate.usuario_id)?.lastname || 'Cliente Web'}
                                    </p>
                                    
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Creado por</label>
                                </div>  

                                <div className="flex mr-3 gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={DesactivateDetailModal}  className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear usuario">
                                        Volver
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}
export default ReservasPagadasListView;