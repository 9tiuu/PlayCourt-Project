import { useEffect, useState } from 'react';
import api from '../../api/apis';
import GetIdUserLogged from '../../utils/GetIdUserLogged';

const EmployeesListView = () =>{
    const [listEmpleados, setListEmpleados] = useState([]);
    const [deleteModal, setDeleteaModal] = useState(false); 
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const idUser = GetIdUserLogged();
    const [createdByUser, setCreatedByUser] = useState([null]);
    const [idEmpleado, setIdEmpleado] = useState('');
    const [IdEmpleadoOriginal, setIdEmpleadoOriginal] = useState('');

    useEffect(() => {
        setCreatedByUser(idUser);
    }, [idUser]);

    const [formData, setFormData] = useState({
        nombre: '',
        segundo_nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        edad: '',
        genero: '',
        cargo: '',
        jornada: '',
        correo: '',
        celular: '',
        rut: '',
        fecha_ingreso: '',
        tipo_contrato: '',
        sueldo: '',
        usuario_id: '',
    });

    const [formDataUpdate, setFormDataUpdate] = useState({
        nombre: '',
        segundo_nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        edad: '',
        genero: '',
        cargo: '',
        jornada: '',
        correo: '',
        celular: '',
        rut: '',
        fecha_ingreso: '',
        tipo_contrato: '',
        sueldo: '',
        usuario_id: '',
    });
    
    const obtenerEmpleados = async () => {
        try {
            const response = await api.get('empleados/');
            setListEmpleados(response.data);

        } catch(error){
            console.log(error.message);
        };
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            usuario_id: createdByUser,
        });
    };

    const handleChangeUpdate = (e) => {
        setFormDataUpdate({
            ...formDataUpdate,
            [e.target.name]: e.target.value,
            usuario_id: IdEmpleadoOriginal,
        });
    };

    const AgregarNuevoEmpleado = async (e) => {
        e.preventDefault();

        if (formData.nombre.trim() === '' || 
            formData.segundo_nombre.trim() === '' || 
            formData.apellido_paterno.trim() === '' || 
            formData.apellido_materno.trim() === '' || 
            formData.edad.trim() === '' || 
            formData.genero.trim() === '' || 
            formData.cargo.trim() === '' ||
            formData.jornada.trim() === '' ||
            formData.correo.trim() === '' ||
            formData.celular.trim() === '' ||
            formData.rut.trim() === '' ||
            formData.fecha_ingreso.trim() === '' ||
            formData.tipo_contrato.trim() === '' ||
            formData.sueldo.trim() === ''
        ) {
            setErrors('No pueden haber campos vacíos');
            console.log(formData);
            return
        };
            
        try {
            await api.post('empleados/', formData);
            setMessage('¡Empleado registrado con exito!');
            setErrors('');
            setFormData({ 
                nombre: '',
                segundo_nombre: '',
                apellido_paterno: '',
                apellido_materno: '',
                edad: '',
                genero: '',
                cargo: '',
                jornada: '',
                correo: '',
                celular: '',
                rut: '',
                fecha_ingreso: '',
                tipo_contrato: '',
                sueldo: '',
                usuario_id: '',
            });

            obtenerEmpleados();
            console.log(formData);

        } catch(error) {
            console.log(error.message);
            console.log(formData);  
            setErrors('Error al registrar un empleado');
        };

    };

    const EditarEmpleado = async (e) => {
        e.preventDefault();

        if (formDataUpdate.nombre.trim() === '' || 
            formDataUpdate.segundo_nombre.trim() === '' || 
            formDataUpdate.apellido_paterno.trim() === '' || 
            formDataUpdate.apellido_materno.trim() === '' || 
            !formDataUpdate.edad || 
            formDataUpdate.genero.trim() === '' || 
            formDataUpdate.cargo.trim() === '' ||
            formDataUpdate.jornada.trim() === '' ||
            formDataUpdate.correo.trim() === '' ||
            formDataUpdate.celular.trim() === '' ||
            formDataUpdate.rut.trim() === '' ||
            formDataUpdate.fecha_ingreso.trim() === '' ||
            formDataUpdate.tipo_contrato.trim() === '' ||
            !formDataUpdate.sueldo
        ) {
            setErrors('No pueden haber campos vacíos');
            console.log(formDataUpdate);
            return

        } else {
            try {
                await api.put(`empleados/${idEmpleado}/`, formDataUpdate);
                setMessage('¡Empleado actualizado con exito!');
                obtenerEmpleados();
            } catch(error) {
                console.log(error.message);
                console.log(formDataUpdate);
            };
        };  

    };

    const EliminarEmpleado = async (id) => {
        try {
            await api.delete(`empleados/${id}/`);
            setMessage('¡Empleado eliminado con exito!');
            setDeleteaModal(!deleteModal);
            obtenerEmpleados();
            
        } catch(error) {
            console.log(error.message);
        };
    };

    useEffect(()=>{
        obtenerEmpleados();
    }, []);

    const ActivateAddModal = () => {
        setAddModal(!addModal);
        setMessage('');
        setErrors('');
    };

    const ActivateEditModal = (id, empleadoOriginal) => {
        setIdEmpleado(id);
        setIdEmpleadoOriginal(empleadoOriginal);  
        
        const empleadoSeleccionado = listEmpleados.find(c => c.id === id);
        if (empleadoSeleccionado) {
            setFormDataUpdate({
                nombre: empleadoSeleccionado.nombre || '',
                segundo_nombre: empleadoSeleccionado.segundo_nombre || '',
                apellido_paterno: empleadoSeleccionado.apellido_paterno || '',
                apellido_materno: empleadoSeleccionado.apellido_materno || '',
                edad: empleadoSeleccionado.edad || '',
                genero: empleadoSeleccionado.genero || '',
                cargo: empleadoSeleccionado.cargo || '',
                jornada: empleadoSeleccionado.jornada || '',
                correo: empleadoSeleccionado.correo || '',
                celular: empleadoSeleccionado.celular || '',
                rut: empleadoSeleccionado.rut || '',
                fecha_ingreso: empleadoSeleccionado.fecha_ingreso || '',
                tipo_contrato: empleadoSeleccionado.tipo_contrato || '',
                sueldo: empleadoSeleccionado.sueldo || '',
                usuario_id: empleadoSeleccionado.usuario?.id || '',
            });
        }
        setUpdateModal(!updateModal);
        setMessage('');
        setErrors('');
    };

    const DesactivateEditModal = () => {
        setUpdateModal(!updateModal);
    };

    const ActivateDetailModal = (id, empleadoOriginal) => {
        setIdEmpleado(id);
        setIdEmpleadoOriginal(empleadoOriginal);  
        
        const empleadoSeleccionado = listEmpleados.find(c => c.id === id);
        if (empleadoSeleccionado) {
            setFormDataUpdate({
                nombre: empleadoSeleccionado.nombre || '',
                segundo_nombre: empleadoSeleccionado.segundo_nombre || '',
                apellido_paterno: empleadoSeleccionado.apellido_paterno || '',
                apellido_materno: empleadoSeleccionado.apellido_materno || '',
                edad: empleadoSeleccionado.edad || '',
                genero: empleadoSeleccionado.genero || '',
                cargo: empleadoSeleccionado.cargo || '',
                jornada: empleadoSeleccionado.jornada || '',
                correo: empleadoSeleccionado.correo || '',
                celular: empleadoSeleccionado.celular || '',
                rut: empleadoSeleccionado.rut || '',
                fecha_ingreso: empleadoSeleccionado.fecha_ingreso || '',
                tipo_contrato: empleadoSeleccionado.tipo_contrato || '',
                sueldo: empleadoSeleccionado.sueldo || '',
                usuario_id: empleadoSeleccionado.usuario?.id || '',
            });
        }
        setDetailModal(!detailModal);
        setMessage('');
        setErrors('');
    };

    const DesactivateDetailModal = () => {
        setDetailModal(!detailModal);
    };

    const ActivateDeleteModal = (id) => {
        setIdEmpleado(id);
        setDeleteaModal(!deleteModal);
    };

    const DesactivateDeleteModal = () => {
        setDeleteaModal(!deleteModal);
    };

    return(
        <div className="">
            <h2 className="text-2xl font-bold mb-8 text-black dark:text-white uppercase">Listado del Empleados</h2>

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

                    Nuevo empleado
                </button>

            </div>

            <div className="overflow-x-auto rounded-lg dark:bg-color4">
                <table className="min-w-full border border-gray-200 dark:border-color5">
                    <thead className="bg-gray-100 dark:bg-color2 dark:text-white text-gray-700 text-sm">
                        <tr>
                            <th className="px-6 py-3 text-left font-bold">ID</th>
                            <th className="px-6 py-3 text-left font-bold">Nombre</th>
                            <th className="px-6 py-3 text-left font-bold">Apellido paterno</th>
                            <th className="px-6 py-3 text-left font-bold">Apellido materno</th>
                            <th className="px-6 py-3 text-left font-bold">RUT</th>
                            <th className="px-6 py-3 text-left font-bold">Cargo</th>
                            <th className="px-6 py-3 text-left font-bold">Correo</th>
                            <th className="px-6 py-3 text-left font-bold">Celular</th>
                            <th className="px-6 py-3 text-left font-bold">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-color5 text-gray-800 dark:text-white">
                        {
                            listEmpleados.map((c, index) => (
                                <tr key={index} className="transition-colors duration-150 text-sm">
                                    <td className="px-6 py-3">{c.id}</td>
                                    <td className="px-6 py-3">{c.nombre}</td>
                                    <td className="px-6 py-3">{c.apellido_paterno}</td>
                                    <td className="px-6 py-3">{c.apellido_materno}</td>
                                    <td className="px-6 py-3">{c.rut}</td>
                                    <td className="px-6 py-3">{c.cargo}</td>
                                    <td className="px-6 py-3">{c.correo}</td>
                                    <td className="px-6 py-3">{c.celular}</td>

                                    <td className='px-6 py-3 flex gap-2'>
                                        <button onClick={()=>ActivateEditModal(c.id, c.usuario?.id)} className="bg-blue-600 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Actualizar">
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

                                        <button onClick={()=>ActivateDetailModal(c.id, c.usuario?.id)} className="bg-green-600 hover:bg-green-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Actualizar">
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
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Nuevo empleado</h3>
                            <p className='text-black dark:text-white mt-1'>Registre un nuevo empleado al sistema completando estos campos</p>

                            <form onSubmit={AgregarNuevoEmpleado} className='mt-6 overflow-y-auto h-[31rem]'>
                                <div className="relative w-full mb-6">
                                    <input name='nombre' onChange={handleChange} type="text" id="nombre" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nombre</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='segundo_nombre' onChange={handleChange} type="text" id="segundo_nombre" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Segundo nombre</label>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative w-full mb-6">
                                        <input name='apellido_paterno' onChange={handleChange} type="text" id="apellido_paterno" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Apellido Paterno</label>
                                    </div>
                                    <div className="relative w-full mb-6">
                                        <input name='apellido_materno' onChange={handleChange} type="text" id="apellido_materno" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Apellido Materno</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='edad' onChange={handleChange} type="text" id="edad" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Edad</label>
                                </div>

                                <select name='genero' onChange={handleChange} id="genero" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Género</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                
                                <div className="relative w-full mb-6">
                                    <input name='cargo' onChange={handleChange} type="text" id="cargo" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Cargo</label>
                                </div>
                                
                                <select name='jornada' onChange={handleChange} id="jornada" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Jornada laboral</option>
                                    <option value="08:00 - 18:00">13:00 - 17:00</option>
                                    <option value="08:00 - 18:00">08:00 - 16:00</option>
                                    <option value="08:00 - 18:00">06:00 - 18:00</option>
                                    <option value="08:00 - 18:00">10:00 - 22:00</option>
                                </select>

                                <div className="relative w-full mb-6">
                                    <input name='correo' onChange={handleChange} type="text" id="correo" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Correo</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='celular' onChange={handleChange} type="text" id="celular" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Celular</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='rut' onChange={handleChange} type="text" id="rut" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">RUT</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='fecha_ingreso' onChange={handleChange} type="date" id="fecha_ingreso" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Fecha de ingreso</label>
                                </div>

                                <select name='tipo_contrato' onChange={handleChange} id="tipo_contrato" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Tipo de contrato</option>
                                    <option value="Indefinido">Indefinido</option>
                                    <option value="Tiempo parcial">Tiempo parcial</option>
                                </select>

                                <div className="relative w-full mb-6">
                                    <input name='sueldo' onChange={handleChange} type="text" id="sueldo" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Sueldo</label>
                                </div>

                                <p className='mb-6 text-green-500 font-semibold'>{message}</p>
                                <p className='mb-6 text-red-500 font-semibold'>{errors}</p>

                                <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={ActivateAddModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                        Cancelar
                                    </button>
                                    <button  className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear usuario">
                                        Registrar
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
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Actualizar empleado</h3>
                            <p className='text-black dark:text-white mt-1'>Actualize los datos del empleado en los siguientes estos campos</p>

                            <form onSubmit={EditarEmpleado} className='mt-6 overflow-y-auto h-[31rem]'>
                                <div className="relative w-full mb-6 mt-3">
                                    <input name='nombre' value={formDataUpdate.nombre} onChange={handleChangeUpdate} type="text" id="nombre" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nombre</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='segundo_nombre' value={formDataUpdate.segundo_nombre} onChange={handleChangeUpdate} type="text" id="segundo_nombre" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Segundo nombre</label>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative w-full mb-6">
                                        <input name='apellido_paterno' value={formDataUpdate.apellido_paterno} onChange={handleChangeUpdate} type="text" id="apellido_paterno" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Apellido Paterno</label>
                                    </div>
                                    <div className="relative w-full mb-6">
                                        <input name='apellido_materno' value={formDataUpdate.apellido_materno} onChange={handleChangeUpdate} type="text" id="apellido_materno" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Apellido Materno</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='edad' value={formDataUpdate.edad} onChange={handleChangeUpdate} type="text" id="edad" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Edad</label>
                                </div>

                                <select name='genero' value={formDataUpdate.genero} onChange={handleChangeUpdate} id="genero" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Género</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                
                                <div className="relative w-full mb-6">
                                    <input name='cargo' value={formDataUpdate.cargo} onChange={handleChangeUpdate} type="text" id="cargo" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Cargo</label>
                                </div>
                                
                                <select name='jornada' value={formDataUpdate.jornada} onChange={handleChangeUpdate} id="jornada" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Jornada laboral</option>
                                    <option value="08:00 - 18:00">13:00 - 17:00</option>
                                    <option value="08:00 - 18:00">08:00 - 16:00</option>
                                    <option value="08:00 - 18:00">06:00 - 18:00</option>
                                </select>

                                <div className="relative w-full mb-6">
                                    <input name='correo' value={formDataUpdate.correo} onChange={handleChangeUpdate} type="text" id="correo" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Correo</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='celular' value={formDataUpdate.celular} onChange={handleChangeUpdate} type="text" id="celular" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Celular</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='rut' value={formDataUpdate.rut} onChange={handleChangeUpdate} type="text" id="rut" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">RUT</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='fecha_ingreso' value={formDataUpdate.fecha_ingreso} onChange={handleChangeUpdate} type="date" id="fecha_ingreso" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Fecha de ingreso</label>
                                </div>

                                <select name='tipo_contrato' value={formDataUpdate.tipo_contrato} onChange={handleChangeUpdate} id="tipo_contrato" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Tipo de contrato</option>
                                    <option value="Indefinido">Indefinido</option>
                                    <option value="Tiempo parcial">Tiempo parcial</option>
                                </select>

                                <div className="relative w-full mb-6">
                                    <input name='sueldo' value={formDataUpdate.sueldo} onChange={handleChangeUpdate} type="text" id="sueldo" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Sueldo</label>
                                </div>

                                <p className='mb-6 text-green-500 font-semibold'>{message}</p>
                                <p className='mb-6 text-red-500 font-semibold'>{errors}</p>

                                <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={DesactivateEditModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                        Cancelar
                                    </button>
                                    <button  className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear usuario">
                                        Actualizar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {
                detailModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Detalles de empleado</h3>
                            <div className='mt-6 overflow-y-auto h-[31rem]'>
                                <div className="relative w-full mb-6 mt-3">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.nombre}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nombre</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.segundo_nombre}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Segundo nombre</label>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative w-full mb-6">
                                        <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.apellido_paterno}</p>
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Apellido Paterno</label>
                                    </div>
                                    <div className="relative w-full mb-6">
                                        <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.apellido_materno}</p>
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Apellido Materno</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.edad}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Edad</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.genero}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Edad</label>
                                </div>
                                
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.cargo}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Cargo</label>
                                </div>
                                
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.jornada}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Edad</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.correo}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Correo</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.celular}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Celular</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.rut}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">RUT</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.fecha_ingreso}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Fecha de ingreso</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.tipo_contrato}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Edad</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.sueldo}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Sueldo</label>
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
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>¿Eliminar Personal corporativo?</h3>
                            <p className='text-black dark:text-white mt-1 mb-6'>Se eliminará el empleado de manera permanente. ¿Seguro que quieres eliminarlo?</p>

                            <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                <button onClick={DesactivateDeleteModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                    Cancelar
                                </button>
                                <button onClick={() => EliminarEmpleado(idEmpleado)} className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Eliminar usuario">
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
export default EmployeesListView;