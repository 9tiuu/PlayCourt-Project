import { useEffect, useState } from 'react';
import api from '../../api/apis';
import GetIdUserLogged from '../../utils/GetIdUserLogged';
import UserAuth from '../../utils/UserAuth';

const GastosListView = () =>{
    const [listGastos, setListGastos] = useState([]);
    const [listGastosEstado, setlistGastosEstado] = useState([]);
    const [listGastosCategoria, setListCategoriaGastos] = useState([]);
    const [listUsers, setlistUsers] = useState([]);
    const [deleteGastoModal, setDeleteGastoModal] = useState(false); 
    const [addGastoModal, setAddGastoModal] = useState(false);
    const [editGastoModal, setEditGastoModal] = useState(false);
    const [detailGastoModal, setDetailGastoModal] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const idUser = GetIdUserLogged();
    const [newGasto, setNewGasto] = useState([null]);
    const [idGasto, setIdGasto] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const user = UserAuth();

    useEffect(() => {
        setNewGasto(idUser);
    }, [idUser]);

    const [formData, setFormData] = useState({
        categoria_gastos_id: '',
        gastos_fecha: '',
        gastos_descripcion: '',
        gastos_proveedor: '',
        gastos_factura: '',
        gastos_neto: '',
        gastos_iva: '',
        gastos_total: '',
        gastos_mediodepago: '',
        estados_gastos_id: '',
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
    
    const obtenerGastos = async () => {
        try {
            const DatosMantenciones = await api.get('gastos/');
            setListGastos(DatosMantenciones.data);

        } catch(error){
            console.log(error.message);
        };
    };

    const obtenerCategoriaGastos = async () => {
        try {
            const DatosCanchas = await api.get('categoriasgastos/');
            setListCategoriaGastos(DatosCanchas.data);

        } catch(error){
            console.log(error.message);
        };
    };

    const getGastosEstados = async () => {
        try {
            const response = await api.get('estadosgastos/');
            setlistGastosEstado(response.data);

        } catch(error) {
            console.log(error.message);
        };
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            usuario_id: newGasto,
            gastos_total: Number(formData.gastos_neto) + Number(formData.gastos_iva),
        });
    };

    const AgregarNuevoGasto = async (e) => {
        e.preventDefault();

        if (!formData.categoria_gastos_id || formData.gastos_fecha.trim() === '' || formData.gastos_descripcion.trim() === '' || formData.gastos_proveedor.trim() === '' || !formData.gastos_factura || formData.gastos_neto.trim() === '' || formData.gastos_iva.trim() === '' || formData.gastos_mediodepago.trim() === '' || !formData.estados_gastos_id) {
            setErrors('No pueden haber campos vacíos');
            setTimeout(() => setErrors(''), 3000);
            return
        };
            
        try {
            await api.post('gastos/', formData);
            setMessage('Gasto creado con exito!');
            setTimeout(() => setMessage(''), 3000);
            setErrors('');
            setFormData({ categoria_gastos_id: '', gastos_fecha: '', gastos_descripcion: '', gastos_proveedor: '', gastos_factura: '', gastos_neto: '', gastos_iva: '', gastos_total: '', gastos_mediodepago: '', estados_gastos_id: '', usuario_id: ''});
            obtenerGastos();

        } catch(error) {
            console.log(error.message);  
                        
            if (error.response?.data?.non_field_errors) {
                setErrors(error.response.data.non_field_errors[0]);
            } 
            else { setErrors('Error al crear el gasto') };

            setTimeout(() => setErrors(''), 3000);
        };

    };

    const EditarGasto = async (e) => {
        e.preventDefault();

        if (!formData.categoria_gastos_id || formData.gastos_fecha.trim() === '' || formData.gastos_descripcion.trim() === '' || formData.gastos_proveedor.trim() === '' || !formData.gastos_factura || formData.gastos_neto.trim() === '' || formData.gastos_iva.trim() === '' || formData.gastos_mediodepago.trim() === '' || !formData.estados_gastos_id) {
            setErrors('No pueden haber campos vacíos');
            setTimeout(() => setErrors(''), 3000);

        } else {
            try {
                await api.put(`gastos/${idGasto}/`, formData);
                setMessage('Gasto actualizado con exito!');
                setTimeout(() => setMessage(''), 3000);
                
                obtenerGastos();

            } catch(error) {
                console.log(error.message);
                
                if (error.response?.data?.non_field_errors) {
                    setErrors(error.response.data.non_field_errors[0]);
                } 
                else { setErrors('Error al crear el gasto') };

                setTimeout(() => setErrors(''), 3000);
            };
        };  

    };

    const EliminarGasto = async (id) => {
        try {
            await api.delete(`gastos/${id}/`);
            setMessage('¡Gasto eliminado con exito!');
            setDeleteGastoModal(!deleteGastoModal);
            obtenerGastos();
            
        } catch(error) {
            console.log(error.message);
            console.log(formData);
        };
    };

    useEffect(()=>{
        obtenerGastos();
        obtenerCategoriaGastos();
        getGastosEstados();
        getUsers();
    }, []);

    const ActivateAddModal = () => {
        setAddGastoModal(!addGastoModal);
        setMessage('');
        setErrors('');
    };

    const ActivateEditModal = (id) => {
        setIdGasto(id);
        const gastoSeleccionado = listGastos.find(c => c.id === id);
        if (gastoSeleccionado) {
            setFormData({
                categoria_gastos_id: gastoSeleccionado.categoria_gastos?.id || '',
                gastos_fecha: gastoSeleccionado.gastos_fecha || '',
                gastos_descripcion: gastoSeleccionado.gastos_descripcion || '',
                gastos_proveedor: gastoSeleccionado.gastos_proveedor || '',
                gastos_factura: gastoSeleccionado.gastos_factura || '',
                gastos_neto: gastoSeleccionado.gastos_neto || '',
                gastos_iva: gastoSeleccionado.gastos_iva || '',
                gastos_total: gastoSeleccionado.gastos_total || '',
                gastos_mediodepago: gastoSeleccionado.gastos_mediodepago || '',
                estados_gastos_id: gastoSeleccionado.estados_gastos?.id || '',
                usuario_id: gastoSeleccionado.usuario?.id || '',
            });
        }
        setEditGastoModal(!editGastoModal);
        setMessage('');
        setErrors('');
    };

    const DesactivateEditModal = () => {
        setEditGastoModal(!editGastoModal);
    };

    const ActivateDetailModal = (id) => {
        setIdGasto(id);
        const gastoSeleccionado = listGastos.find(c => c.id === id);
        if (gastoSeleccionado) {
            setFormData({
                categoria_gastos_id: gastoSeleccionado.categoria_gastos?.id || '',
                gastos_fecha: gastoSeleccionado.gastos_fecha || '',
                gastos_descripcion: gastoSeleccionado.gastos_descripcion || '',
                gastos_proveedor: gastoSeleccionado.gastos_proveedor || '',
                gastos_factura: gastoSeleccionado.gastos_factura || '',
                gastos_neto: gastoSeleccionado.gastos_neto || '',
                gastos_iva: gastoSeleccionado.gastos_iva || '',
                gastos_total: gastoSeleccionado.gastos_total || '',
                gastos_mediodepago: gastoSeleccionado.gastos_mediodepago || '',
                estados_gastos_id: gastoSeleccionado.estados_gastos?.id || '',
                usuario_id: gastoSeleccionado.usuario?.id || '',
            });
        }
        setDetailGastoModal(!detailGastoModal);
        setMessage('');
        setErrors('');
    };

    const DesactivateDetailModal = () => {
        setDetailGastoModal(!detailGastoModal);
    };

    const ActivateDeleteModal = (id) => {
        setIdGasto(id);
        setDeleteGastoModal(!deleteGastoModal);
    };

    const DesactivateDeleteModal = () => {
        setDeleteGastoModal(!deleteGastoModal);
    };

    const filteredGastos = listGastos.filter((res) => {
        const fecha = res.gastos_fecha?.toLowerCase() || "";
        const estado = res.estados_gastos?.estado_gastos_nombre.toLowerCase() || "";
        const categoria = res.categoria_gastos?.categoria_gastos_nombre.toLowerCase() || "";

        const texto = searchTerm.toLowerCase();

        return (
            fecha.includes(texto) ||
            estado.includes(texto) ||
            categoria.includes(texto)
        );
    });

    return(
        <div className="">
            <h2 className="text-2xl font-bold mb-8 text-black dark:text-white uppercase">Listado de Gastos</h2>

            <div className="flex md:justify-between md:items-center md:flex-row flex-col md:gap-0 gap-4 mb-6">
                
                <div className="md:w-96 h-auto">   
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-600 focus:border-blue-600 dark:bg-color4 dark:border-color5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600" placeholder="Categoría / Fecha o Estado" />
                    </div>
                </div>

                <button onClick={ActivateAddModal} className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3.5 px-6 rounded" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
                        <path d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Nuevo Gasto
                </button>

            </div>

            <div className="overflow-x-auto rounded-lg dark:bg-color4">
                <table className="min-w-full border border-gray-200 dark:border-color5">
                    <thead className="bg-gray-100 dark:bg-color2 dark:text-white text-gray-700 text-sm">
                        <tr>
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">ID</th>
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Categoría</th>
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Fecha</th>
                            {/* <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Nº Factura</th> */}
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Proveedor</th>
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Valor Neto</th>
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">IVA</th>
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Total</th>
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Medio de Pago</th>
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Estado</th>
                            <th className="px-6 py-3 text-left font-bold whitespace-nowrap md:whitespace-normal">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-color5 text-gray-800 dark:text-white">
                        {
                            filteredGastos.map((c, index) => (
                                <tr key={index} className="transition-colors duration-150 text-sm">
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.id}</td>
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.categoria_gastos?.categoria_gastos_nombre}</td>
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.gastos_fecha}</td>
                                    {/* <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.gastos_descripcion}</td> */}
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.gastos_proveedor}</td>
                                    {/* <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.gastos_factura}</td> */}
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.gastos_neto}</td>
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.gastos_iva}</td>
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.gastos_total}</td>
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.gastos_mediodepago}</td>
                                    <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.estados_gastos?.estado_gastos_nombre === "Pagado" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                            {c.estados_gastos?.estado_gastos_nombre}
                                        </span>
                                    </td>
                                    {/* <td className="px-6 py-3 whitespace-nowrap md:whitespace-normal">{c.usuario?.name} {c.usuario?.lastname}</td> */}
                                    

                                    <td className='px-6 py-3 flex gap-2'>
                                        <button onClick={()=>ActivateEditModal(c.id)} className="bg-blue-600 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white p-2 rounded" title="Actualizar">
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
                addGastoModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Nuevo Gasto</h3>
                            <p className='text-black dark:text-white mt-1'>Agregue un nuevo gasto al sistema completando estos campos</p>

                            <form onSubmit={AgregarNuevoGasto} className='mt-6 overflow-y-auto h-[31rem]'>
                                <div className="relative w-full mt-2 mb-6">
                                    <input name='gastos_fecha' onChange={handleChange} type="date" id="gastos_fecha" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Fecha</label>
                                </div>
                                <select name='categoria_gastos_id' onChange={handleChange} id="categoria_gastos_id" className="bg-white mb-6 border border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Seleccionar categoría</option>
                                    {
                                        listGastosCategoria.map((c, index) => (
                                            <option key={index} value={c.id}>{c.categoria_gastos_nombre}</option>
                                        ))
                                    }
                                </select>
                                
                                
                                <div className="relative w-full mb-6">
                                    <input name='gastos_proveedor' onChange={handleChange} type="text" id="gastos_proveedor" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Proveedor</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <input name='gastos_factura' onChange={handleChange} type="number" id="gastos_factura" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nº Factura</label>
                                </div>

                                <div className="flex gap-3 mb-6">
                                    <div className="relative w-full">
                                        <input name='gastos_neto' onChange={handleChange} type="number" id="gastos_neto" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Gastos Neto</label>
                                    </div>

                                    <div className="relative w-full">
                                        <input name='gastos_iva' onChange={handleChange} type="number" id="gastos_iva" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Gastos IVA</label>
                                    </div>
                                </div>

                                <div className="relative w-full mb-6">
                                    <input name='gastos_mediodepago' onChange={handleChange} type="text" id="gastos_mediodepago" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Medio de Pago</label>
                                </div>

                                <select name='estados_gastos_id' onChange={handleChange} id="estados_gastos_id" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Estado</option>
                                    {
                                        listGastosEstado.map((r, index) => (
                                            <option key={index} value={r.id}>{r.estado_gastos_nombre}</option>
                                        ))
                                    }
                                </select>

                                <div className="relative w-full mb-6">
                                    <input name='gastos_descripcion' onChange={handleChange} type="text" id="gastos_descripcion" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Descripción</label>
                                </div>

                                <p className='mb-6 text-green-500 font-semibold'>{message}</p>
                                <p className='mb-6 text-red-500 font-semibold'>{errors}</p>

                                <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={ActivateAddModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                        Cancelar
                                    </button>
                                    <button  className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear gasto">
                                        Crear Gasto
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            
            {
                editGastoModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Actualizar Gasto</h3>
                            <p className='text-black dark:text-white mt-1'>Edite una nuevo gasto al sistema completando estos campos</p>

                            <form onSubmit={EditarGasto} className='mt-6 overflow-y-auto h-[31rem]'>
                                <div className="relative w-full mt-2 mb-6">
                                    <input name='gastos_fecha' value={formData.gastos_fecha} onChange={handleChange} type="date" id="gastos_fecha" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Fecha</label>
                                </div>

                                <select name='categoria_gastos_id' value={formData.categoria_gastos_id} onChange={handleChange} id="categoria_gastos_id" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Seleccionar categoría</option>
                                    {
                                        listGastosCategoria.map((c, index) => (
                                            <option key={index} value={c.id}>{c.categoria_gastos_nombre}</option>
                                        ))
                                    }
                                </select>

                                
                                
                                <div className="relative w-full mb-6">
                                    <input name='gastos_proveedor' value={formData.gastos_proveedor} onChange={handleChange} type="text" id="gastos_proveedor" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Proveedor</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <input name='gastos_factura' value={formData.gastos_factura} onChange={handleChange} type="text" id="gastos_factura" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nº Factura</label>
                                </div>

                                <div className="flex gap-3 mb-6">
                                    <div className="relative w-full">
                                        <input name='gastos_neto' value={formData.gastos_neto} onChange={handleChange} type="number" id="gastos_neto" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Gastos Neto</label>
                                    </div>

                                    <div className="relative w-full">
                                        <input name='gastos_iva' value={formData.gastos_iva} onChange={handleChange} type="number" id="gastos_iva" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Gastos IVA</label>
                                    </div>
                                </div>

                                {/* <div className="relative w-full mb-6">
                                    <input name='gastos_total' value={formData.gastos_total} onChange={handleChange} type="number" id="gastos_total" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Gastos Totales</label>
                                </div> */}

                                <div className="relative w-full mb-6">
                                    <input name='gastos_mediodepago' value={formData.gastos_mediodepago} onChange={handleChange} type="text" id="gastos_mediodepago" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Medio de Pago</label>
                                </div>

                                <select name='estados_gastos_id' value={formData.estados_gastos_id} onChange={handleChange} id="estados_gastos_id" className="bg-white border mb-6 border-[#7776A8] text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-color2 dark:border-[#7776A8] dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600">
                                    <option selected value={''}>Estado</option>
                                    {
                                        listGastosEstado.map((r, index) => (
                                            <option key={index} value={r.id}>{r.estado_gastos_nombre}</option>
                                        ))
                                    }
                                </select>

                                <div className="relative w-full mb-6">
                                    <input name='gastos_descripcion' value={formData.gastos_descripcion} onChange={handleChange} type="text" id="gastos_descripcion" className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-1 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={''} />
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Descripción</label>
                                </div>

                                <p className='mb-6 text-green-500 font-semibold'>{message}</p>
                                <p className='mb-6 text-red-500 font-semibold'>{errors}</p>

                                <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                    <button onClick={DesactivateEditModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Editar gasto">
                                        Editar gasto
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {
                detailGastoModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>Detalles de gasto</h3>
                            <div className='mt-6 overflow-y-auto h-[31rem]'>
                                <div className="relative w-full mb-6 mt-2">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{listGastosCategoria.find(r => r.id === formData.categoria_gastos_id)?.categoria_gastos_nombre || 'No hay categoría'}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Categoría</label>
                                </div>
                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.gastos_fecha}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Fecha</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.gastos_proveedor}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Proveedor</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.gastos_factura}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nº Factura</label>
                                </div>

                                <div className="flex gap-3 mb-6">
                                    <div className="relative w-full">
                                        <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.gastos_neto}</p>
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Gasto Neto</label>
                                    </div>

                                    <div className="relative w-full">
                                        <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.gastos_iva}</p>
                                        <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Gasto IVA</label>
                                    </div>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.gastos_total}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Gastos Totales</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.gastos_mediodepago}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Medio de Pago</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{listGastosEstado.find(r => r.id === formData.estados_gastos_id)?.estado_gastos_nombre || 'No hay estados'}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Estado</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{listUsers.find(r => r.id === formData.usuario_id)?.name || ''} {listUsers.find(r => r.id === formData.usuario_id)?.lastname || 'Cliente Web'}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Usuario</label>
                                </div>

                                <div className="relative w-full mb-6">
                                    <p className="block px-2.5 pb-2.5 pt-4 w-full text-sm dark:text-white bg-transparent rounded-lg border-2 border-[#7776A8] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">{formData.gastos_descripcion}</p>
                                    <label className="absolute text-sm text-[#7776A8] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-color2 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Descripción</label>
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
                deleteGastoModal && (
                    <div className="absolute flex items-center justify-center top-0 left-0 bottom-0 right-0 w-full h-full bg-black bg-opacity-45 p-4">
                        <div className="bg-white dark:bg-color2 md:w-[40rem] w-full h-auto rounded-lg p-6">
                            <h3 className='uppercase text-black dark:text-white font-bold text-xl'>¿Eliminar gasto?</h3>
                            <p className='text-black dark:text-white mt-1 mb-6'>Se eliminará el gasto seleccionado de manera permanente. ¿Seguro que quieres eliminarla?</p>

                            <div className="flex gap-4 md:items-center justify-end mb-6 md:flex-row flex-col">
                                <button onClick={DesactivateDeleteModal} className="bg-red-500 flex items-center justify-center gap-2 hover:bg-red-600 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Cancelar">
                                    Cancelar
                                </button>
                                <button onClick={()=>EliminarGasto(idGasto)} className="bg-blue-600 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Eliminar Gasto">
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
export default GastosListView;