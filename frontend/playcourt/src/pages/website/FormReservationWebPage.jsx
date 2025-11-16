import { useEffect, useState } from 'react';
import NavWeb from '../../components/NavWeb';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../../api/apis';
import FooterWeb from '../../components/FooterWeb';

const FormReservationWebPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { cancha_nombre, cancha_numero } = useParams();
    const [listCanchas, setListCanchas] = useState([]);
    const [listHorariosReserva, setListHorariosReserva] = useState([]);
    const [listEstadosReserva, setListEstadosReserva] = useState([]);
    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    // const [reservas, setReservas] = useState([]);

    const obtenerCanchas = async () => {
        try {
            const response = await api.get('canchasdeportivas/');
            setListCanchas(response.data);

        } catch(error){
            console.log(error.message);
        };
    };

    // const obtenerReservas = async () => {
    //     const res = await api.get("reservascanchas/");
    //     setReservas(res.data);
    // };

    const obtenerHorariosReserva = async () => {
        try {
            const response = await api.get('horariosreserva/');
            setListHorariosReserva(response.data);

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

    const canchaSeleccionada = listCanchas.find((r) => r.cancha_nombre === cancha_nombre && r.cancha_numero === Number(cancha_numero));
    const estadoPorPagar = listEstadosReserva.find((e) => e.estado_reserva_nombre === 'Por Pagar');
    

    useEffect(() => {
        obtenerCanchas();
        obtenerHorariosReserva();
        obtenerEstadosReserva();
        // obtenerReservas();
    }, []);

    const [formData, setFormData] = useState({
        nombre_cliente: '',
        apellido_cliente: '',
        correo_cliente: '',
        cancha_deportiva_id: '',
        reserva_precio: '',
        reserva_fecha: '',
        horario_reserva_id: '',
        estado_reserva_id: '',
        usuario_id: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            cancha_deportiva_id: canchaSeleccionada?.id,
            reserva_precio: canchaSeleccionada?.cancha_precio,
            estado_reserva_id: estadoPorPagar?.id,
            usuario_id: null,
        });
    };

    const ReservarCancha = async (e) => {
        e.preventDefault();

        if (formData.nombre_cliente.trim() === '' || formData.apellido_cliente.trim() === '' || formData.correo_cliente.trim() === '' || formData.reserva_fecha.trim() === '' || !formData.horario_reserva_id ) {
            setErrors('No pueden haber campos vacíos');
            setTimeout(() => setErrors(''), 3000);
            return
        };
            
        try {
            await api.post('reservascanchas/', formData);
            setMessage('¡Se ha registrado su reserva con exito!');
            setTimeout(() => setMessage(''), 3000);

            obtenerCanchas();

            setFormData({
                nombre_cliente: '',
                apellido_cliente: '',
                correo_cliente: '',
                cancha_deportiva_id: '',
                reserva_precio: '',
                reserva_fecha: '',
                horario_reserva_id: '',
                estado_reserva_id: '',
                usuario_id: null,
            });

        } catch(error) {
            console.log(error.message);

            setErrors(error.response.data.detail);
            setTimeout(() => setErrors(''), 3000);
        };

    };
    
    return (
        <>
            <main>
                <NavWeb />
                <div className={`w-full h-[45vh] ${canchaSeleccionada?.categoria_cancha.categoria_cancha_nombre === 'Futbol' ? 'bg-futbol' : canchaSeleccionada?.categoria_cancha.categoria_cancha_nombre === 'Baloncesto' ? 'bg-basquet' : canchaSeleccionada?.categoria_cancha.categoria_cancha_nombre === 'Tenis' ? 'bg-tenis' : canchaSeleccionada?.categoria_cancha.categoria_cancha_nombre === 'Padel' ? 'bg-padel' : 'bg-padel'} flex flex-col items-center justify-center text-center gap-2`}>
                    <span className={`px-4 py-1 mt-4 rounded-full text-xs font-medium ${canchaSeleccionada?.estado_cancha.estado_cancha_nombre === "Disponible" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
                        {canchaSeleccionada?.estado_cancha.estado_cancha_nombre}
                    </span>
                    <h2 className='text-4xl uppercase text-white font-bold'>{canchaSeleccionada?.cancha_nombre} Nº{canchaSeleccionada?.cancha_numero}</h2>
                    <Link to={'/reservas'} className="text-white cursor-pointer hover:underline">
                        ↩︎ Volver a ver canchas deportivas disponibles
                    </Link>
                </div>

                <div className="h-full w-full flex justity-center items-center px-4 py-10 bg-form">
                    <div className='w-full flex md:flex-row flex-col justify-center gap-4'>

                        {
                            canchaSeleccionada?.estado_cancha.estado_cancha_nombre === "Disponible" ? (
                                <>
                                <div className="md:w-[30rem] p-6 rounded-lg bg-white shadow-xl">
                                    <h2 className='text-2xl uppercase font-bold mb-1 text-black'>¡Importante!</h2>
                                    <ul className="mt-2 list-disc ml-5 space-y-1">
                                        <li><b>Cancha seleccionada:</b> {canchaSeleccionada?.cancha_nombre} Nº{canchaSeleccionada?.cancha_numero}</li>
                                        <li><b>Precio total:</b> ${canchaSeleccionada?.cancha_precio}</li>
                                    </ul>

                                    <p className='h-0.5 w-full bg-gray-300 my-4 rounded-full'></p>

                                    <p className='text-black'>Por favor, antes de retirarse del lugar, recuerde depositar su basura en los contenedores correspondientes.</p>
                                    
                                    <p className='h-0.5 w-full bg-gray-300 my-4 rounded-full'></p>

                                    <p className='text-black font-semibold'>Información de contacto</p>

                                    <div className="flex items-center mb-3 p-4 gap-2 border rounded-lg mt-4 border-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope text-blue-600" viewBox="0 0 16 16">
                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                                        </svg>
                                        <span className="text-black">plc.contacto@playcourt.cl</span>
                                    </div>

                                    <div className="flex items-center mb-3 p-4 gap-2 border rounded-lg mt-4 border-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-whatsapp text-blue-600" viewBox="0 0 16 16">
                                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                        </svg>
                                        <span className="text-black">+56900000000</span>
                                    </div>
                                </div>

                                <div className="md:w-[50rem] p-6 rounded-lg bg-white shadow-xl">
                                    <h2 className="text-2xl font-bold mb-1 text-blue-600">Formulario de Reserva</h2>
                                    <p className='text-black mb-8'>Ingrese los siguientes datos para reservar la cancha deportiva seleccionada</p>

                                    <form onSubmit={ReservarCancha} className="space-y-5">
                                        <div className="flex md:flex-row flex-col gap-5 w-full">
                                            <div className='w-full'>
                                                <label className="block font-semibold mb-1">Nombre</label>
                                                <input name='nombre_cliente' value={formData.nombre_cliente} onChange={handleChange} id='nombre_cliente' type="text" className="w-full border p-2 rounded" placeholder='...' />
                                            </div>

                                            <div className='w-full'>
                                                <label className="block font-semibold mb-1">Apellido</label>
                                                <input name='apellido_cliente' value={formData.apellido_cliente} onChange={handleChange} id='apellido_cliente' type="text" className="w-full border p-2 rounded" placeholder='...' />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-1">Correo</label>
                                            <input name='correo_cliente' value={formData.correo_cliente} onChange={handleChange} id='correo_cliente' type="email" className="w-full border p-2 rounded" placeholder='ejemplo@gmail.com' />
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-1">Fecha a reservar</label>
                                            <input name='reserva_fecha' value={formData.reserva_fecha} onChange={handleChange} id='reserva_fecha' type="date" className="w-full border p-2 rounded" />
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-1">Horario a reservar</label>
                                            <select className="w-full border p-2 rounded" value={formData.horario_reserva_id} onChange={handleChange} name='horario_reserva_id' id='reserva_horario'> 
                                                <option value=''>Seleccione un horario disponible</option>
                                                {
                                                    listHorariosReserva.map((h) => (
                                                        <option value={h.id}>{h.horario_reserva_hora} - {h.horario_reserva_termino}</option>
                                                    ))
                                                }

                                                
                                            </select>
                                        </div>

                                        <p className='mb-1 text-green-500 font-semibold'>{message}</p>
                                        <p className='mb-1 text-red-500 font-semibold'>{errors}</p>

                                        <div className="text-right">
                                            <button className="bg-blue-600 mt-4 text-white px-6 py-2 rounded hover:bg-blue-700 md:w-auto w-full mb-4">
                                                Reservar
                                            </button>
                                        </div>

                                    </form>
                                </div>
                                </>
                            ) : (
                                <div className="relative container mx-auto px-4 py-16 text-center flex flex-col items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-20 mb-4 text-red-700">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>

                                    <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-black md:text-5xl lg:text-6xl">
                                        En Mantenimiento 
                                    </h1>
                                    <p className=" text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-60 dark:text-gray-400">
                                        Lo sentimos, la cancha deportiva que ha seleccionado se encuentra en mantención.
                                    </p>
                                </div>
                            )
                        }

                        
                    </div>
                </div>
                <FooterWeb />
                
            </main>
        </>
    );
}

export default FormReservationWebPage;