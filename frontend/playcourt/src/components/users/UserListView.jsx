import { useEffect, useState } from 'react';
import api from '../../api/apis';

const UserListView = () =>{
    const [listUsers, setlistUsers] = useState([]);
    const [listUsersRols, setlistUsersRols] = useState([]);
    const [updateUserModal, setUpdateUserModal] = useState(false);
    const [detailsUserModal, setDetailsUserModal] = useState(false);
    const [addUserModal, setAddUserModal] = useState(false);
    const [deleteUserModal, setDeleteUserModal] = useState(false); 
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const [idUsuario, setIdUsuario] = useState('');

    // Formulario para Crear usuarios
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        gender: '',
        rol_id: ''
    });

    // Formulario para Actualizar un usuario; esto para no mezclarlo con el anterioir
    const [formDataUpdate, setFormDataUpdate] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        gender: '',
        rol_id: ''
    });

    // En esta funcion se obtienen los usuarios mediante un GET; se guardan en el hook -> listUsers
    const getUsers = async () => {
        try {
            const response = await api.get('users/');
            setlistUsers(response.data);

        } catch(error){
            console.log(error.message);
        };
    };

    // Funcion para detectar cambios en los campos del formulario de Crear usuarios y guardarlos en un objeto -> formData
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Funcion para detectar cambios en los campos del formulario de Actualizar usuarios y guardarlos en un objeto -> formDataUpdate
    const handleChangeUpdate = (e) => {
        setFormDataUpdate({
            ...formDataUpdate,
            [e.target.name]: e.target.value,
        });
    };

    // Funcion para Crear un nuevo usuario a traves de un POST; si hay campos vacios muestra un mensaje de error, en caso contrario se crea
    // un nuevo usuario en base a los datos guardados en -> formData
    const addNewUser = async (e) => {
        e.preventDefault();

        if (formData.name.trim() === '' || formData.lastname.trim() === '' || formData.email.trim() === '' || !formData.gender || !formData.rol_id) {
            setErrors('No pueden haber campos vacíos')
            console.log(formData);
            
        } else {
            try {
                await api.post('users/', formData);
                setMessage('¡Usuario creado con exito!');
                setFormData({ name: '', lastname: '', email: '', password: '', gender: '', rol_id: '' });
                getUsers();

            } catch(error) {
                console.log(error.message);
                console.log(formData);
                setErrors('Error al registrar el nuevo usuario');
            };
        };  
    };

    // Obteniendo los roles actuales y guardando los objetos en el hook -> listUsersRols
    const getRoles = async () => {
        try {
            const response = await api.get('roles/');
            setlistUsersRols(response.data);

        } catch(error) {
            console.log(error.message);
        };
    };

    useEffect(()=>{
        getUsers();
        getRoles();
    }, []);

    // Funcion para actualizar los datos de un usuario seleccionado (luego de guardar su id al momento de seleccionarlo)
    // a traves de un PUT en base a los guardados en el -> formDataUpdate
    const ActualizarUsuario = async (e) => {
        e.preventDefault();

        if (formDataUpdate.name.trim() === '' || formDataUpdate.lastname.trim() === '' || formDataUpdate.email.trim() === '' || !formDataUpdate.gender || !formDataUpdate.rol_id) {
            setErrors('No pueden haber campos vacíos')
            
        } else {
            try {
                await api.put(`users/${idUsuario}/`, formDataUpdate);
                setMessage('¡Usuario actualizado con exito!');
                getUsers();
                console.log(formDataUpdate);

            } catch(error) {
                console.log(error.message);
            };
        };  
    };

    // Funcion para eliminar un usuario seleccionado (luego de guardar su id al momento de seleccionarlo)
    const EliminarUsuario = async (id) => {
        try {
            await api.delete(`users/${id}/`);
            setMessage('¡Usuario eliminado con exito!');
            setDeleteUserModal(!deleteUserModal);
            getUsers();
            
        } catch(error) {
            console.log(error.message);
            console.log(formData);
        };
    };

    const ActivateAddUserModal = () => {
        setAddUserModal(!addUserModal);
        setMessage('');
        setErrors('');
    };

    // Funcion para activar la modal que contiene el formulario de actualizacion de los usarios, que al
    // momento de ejecutarse, guarda tambien el id del usuario seleccionado
    const ActivateUpdateUserModal = (id) => {
        setIdUsuario(id);
        const usuarioSeleccionado = listUsers.find(user => user.id === id);
        if (usuarioSeleccionado) {
            setFormDataUpdate({
                name: usuarioSeleccionado.name || '',
                lastname: usuarioSeleccionado.lastname || '',
                email: usuarioSeleccionado.email || '',
                password: usuarioSeleccionado.password,
                gender: usuarioSeleccionado.gender || '',
                rol_id: usuarioSeleccionado.rol?.id || '',
            });
        };
        setUpdateUserModal(!addUserModal);
        setMessage('');
        setErrors('');
    };

    const DesactivateUpdateUserModal = () => {
        setUpdateUserModal(!updateUserModal);
        setMessage('');
        setErrors('');
    };

    //Detalles
    const ActivateDetailUserModal = (id) => {
        setIdUsuario(id);
        const usuarioSeleccionado = listUsers.find(user => user.id === id);
        if (usuarioSeleccionado) {
            setFormDataUpdate({
                name: usuarioSeleccionado.name || '',
                lastname: usuarioSeleccionado.lastname || '',
                email: usuarioSeleccionado.email || '',
                password: usuarioSeleccionado.password,
                gender: usuarioSeleccionado.gender || '',
                rol_id: usuarioSeleccionado.rol?.id || '',
            });
        };
        setDetailsUserModal(!detailsUserModal);
        setMessage('');
        setErrors('');
    };

    const DesactivateDetailUserModal = () => {
        setDetailsUserModal(!detailsUserModal);
        setMessage('');
        setErrors('');
    };

    // Funcion para activar la modal que contiene la confirmacion de eliminacion de los usarios, que al
    // momento de ejecutarse, guarda tambien el id del usuario seleccionado
    const ActivateDeleteUserModal = (id) => {
        setIdUsuario(id);
        setDeleteUserModal(!deleteUserModal);
    };

    const DesactivateDeleteUserModal = () => {
        setDeleteUserModal(!deleteUserModal);
    };

    return(
        <div className="">
            <h2 className="text-2xl font-bold mb-8 text-black dark:text-white uppercase">Listado de Usuarios</h2>

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

                <button onClick={ActivateAddUserModal} className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3.5 px-6 rounded" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
                        <path d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

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

                    <tbody className="divide-y divide-gray-200 dark:divide-color5 text-gray-800 dark:text-white">
                        {
                            listUsers.map((user, index) => (
                                <tr key={index} className="transition-colors duration-150 text-sm">
                                    <td className="px-6 py-3">{user.id}</td>
                                    <td className="px-6 py-3">{user.name}</td>
                                    <td className="px-6 py-3">{user.lastname}</td>
                                    <td className="px-6 py-3">{user.email}</td>
                                    <td className="px-6 py-3">{user.gender}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.rol?.namerol === "Administrador" ? "bg-blue-200 text-blue-800" : user.rol?.namerol === "Operaciones" ? "bg-orange-100 text-orange-700" : user.rol?.namerol === "Finanzas" ? "bg-green-100 text-green-700" : "bg-gray-100 text-black"}`}>
                                            {user.rol?.namerol}
                                        </span>
                                    </td>

                                    {
                                        user.rol?.namerol === 'Administrador' ? (
                                            <td className='px-6 py-3 flex gap-2'>
                                                <p className='uppercase font-bold'>No aplica</p>
                                            </td>
                                        ) : (
                                            <td className='px-6 py-3 flex gap-2'>
                                                <button onClick={() => ActivateUpdateUserModal(user.id)} className="bg-blue-600 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Actualizar">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square text-white" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                        <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                    </svg>
                                                </button>
                
                                                <button onClick={() => ActivateDeleteUserModal(user.id)} className="bg-red-500 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Eliminar">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill text-white" viewBox="0 0 16 16">
                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                                    </svg>
                                                </button>

                                                <button onClick={() => ActivateDetailUserModal(user.id)} className="bg-green-600 hover:bg-green-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Actualizar">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle text-white" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                                    </svg>
                                                </button>
                                            </td>
                                        )
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                addUserModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Nuevo Usuario</h3>
                            <p className='text-black dark:text-white mt-1'>Agregue un nuevo usuario al sistema completando estos campos</p>

                            <form onSubmit={addNewUser} className='mt-6'>
                                <div className="flex gap-2">
                                    <div className="relative w-full mb-6">
                                        <input name='name' onChange={handleChange} type="text" id="name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nombre</label>
                                    </div>
                                    <div className="relative w-full mb-6">
                                        <input name='lastname' onChange={handleChange} type="text" id="lastname" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Apellido</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='email' onChange={handleChange} type="text" id="email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Correo electrónico</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <input name='password' onChange={handleChange} type="text" id="password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Contraseña</label>
                                </div>
                                
                                <select name='gender' onChange={handleChange} id="gender" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Género</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Otro">Otro</option>
                                </select>

                                <select name='rol_id' onChange={handleChange} id="rol" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Rol</option>
                                    {
                                        listUsersRols.map((r, index) => (
                                            <option key={index} value={r.id}>{r.namerol}</option>
                                        ))
                                    }
                                </select>

                                <p className='mb-6 text-green-500 font-semibold'>{message}</p>
                                <p className='mb-6 text-red-500 font-semibold'>{errors}</p>

                                <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={ActivateAddUserModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                        Cancelar
                                    </button>
                                    <button  className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear usuario">
                                        Crear usuario
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                )
            }

            {
                updateUserModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Actualizar Usuario</h3>
                            <p className='text-black dark:text-white mt-1'>Actualice los datos del usuario en los siguientes estos campos</p>

                            <form onSubmit={ActualizarUsuario} className='mt-6'>
                                <div className="flex gap-2">
                                    <div className="relative w-full mb-6">
                                        <input name='name' onChange={handleChangeUpdate} value={formDataUpdate.name} type="text" id="name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nombre</label>
                                    </div>
                                    <div className="relative w-full mb-6">
                                        <input name='lastname' onChange={handleChangeUpdate} value={formDataUpdate.lastname} type="text" id="lastname" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Apellido</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-6">
                                    <input name='email' onChange={handleChangeUpdate} value={formDataUpdate.email} type="text" id="email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Correo electrónico</label>
                                </div>

                                {/* <div className="relative w-full mb-6">
                                    <input name='password' onChange={handleChange} value={formData.password} type="text" id="password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Contraseña</label>
                                </div> */}
                                
                                <select name='gender' onChange={handleChangeUpdate} value={formDataUpdate.gender} id="gender" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option value={''}>Género</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Otro">Otro</option>
                                </select>

                                <select name='rol_id' onChange={handleChangeUpdate} value={formDataUpdate.rol_id} id="rol" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Rol</option>
                                    {
                                        listUsersRols.map((r, index) => (
                                            <option key={index} value={r.id}>{r.namerol}</option>
                                        ))
                                    }
                                </select>

                                <p className='mb-6 text-green-500 font-semibold'>{message}</p>
                                <p className='mb-6 text-red-500 font-semibold'>{errors}</p>

                                <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={DesactivateUpdateUserModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                        Cancelar
                                    </button>
                                    <button className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear usuario">
                                        Actualizar usuario
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                )
            }

            {
                detailsUserModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Detalles del Usuario</h3>
                            <div className='mt-6'>
                                <div className="flex gap-2">
                                    <div className="relative w-full mb-6">
                                        <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.name}</p>
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nombre</label>
                                    </div>
                                    <div className="relative w-full mb-6">
                                        <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.lastname}</p>
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Apellido</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.email}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Correo electrónico</label>
                                </div>

                                {/* <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.password}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Contraseña</label>
                                </div> */}
                                
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formDataUpdate.gender}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Género</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{listUsersRols.find(r => r.id === formDataUpdate.rol_id)?.namerol || 'Sin rol'}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Rol</label>
                                </div>

                                <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={DesactivateDetailUserModal} className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                        Volver
                                    </button>
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }

            {
                deleteUserModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>¿Eliminar usuario?</h3>
                            <p className='text-black dark:text-white mt-1 mb-6'>Se eliminará el usuario seleccionado de manera permanente. ¿Seguro que quieres eliminarlo?</p>

                            <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                <button onClick={DesactivateDeleteUserModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                    Cancelar
                                </button>
                                <button onClick={() => EliminarUsuario(idUsuario)} className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Eliminar usuario">
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
export default UserListView;