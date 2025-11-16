import { useEffect } from 'react';
import { useState } from 'react';
import NavWeb from '../../components/NavWeb';
import { Link } from 'react-router-dom';
import api from '../../api/apis';
import FooterWeb from '../../components/FooterWeb';

const ReservationsWebPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [listCanchas, setListCanchas] = useState([]);

    const obtenerCanchas = async () => {
        try {
            const DatosCanchas = await api.get('canchasdeportivas/');
            setListCanchas(DatosCanchas.data);

        } catch(error){
            console.log(error.message);
        };
    };

    useEffect(() => {
        obtenerCanchas();
    }, [listCanchas]);
    
    return (
        <>
            <main>
                <NavWeb />
                <div className="flex items-center justify-center flex-col w-full h-full p-4 mt-28 mb-16">
                    <div className="flex flex-col items-center justify-center">
                        <p className='text-center bg-blue-200 text-blue-600 font-semibold px-10 py-2 rounded-full'>Reservas</p>
                        <h2 className='text-black text-2xl text-center font-bold uppercase mt-2'>¡Selecciona tu cancha deportiva para reservar!</h2>
                        <p className='text-center text-gray-600'>Las canchas en mantenimiento estarán disponibles dentro de muy poco</p>
                    </div>

                    <div className="grid items-center gap-4 justify-center md:grid-cols-3 grid-cols-1 mt-10">
                        {/* aca hay que MAPEAR los datos obtenidos de las canchas que fueron guardados en el hook -> listCanchas */}
                        {/* de momento dejare listo el contenedor que contendra los datos de las canchas (PDT: la imagen se va a cambiar porsupuesto) */}

                        {
                            listCanchas.map((c) => (
                                <Link to={`/reservas/form/${c.cancha_nombre}/${c.cancha_numero}/`} className="bg-white rounded-lg w-72 h-96 shadow-xl border hover:duration-300 duration-300 hover:scale-[102%] transition hover:transition group">
                                    
                                    <div className={`relative w-full rounded-t-lg h-48 ${c.categoria_cancha?.categoria_cancha_nombre === 'Futbol' ? 'bg-futbol2' : c.categoria_cancha?.categoria_cancha_nombre === 'Baloncesto' ? 'bg-basquet2' : c.categoria_cancha?.categoria_cancha_nombre === 'Tenis' ? 'bg-tenis2' : c.categoria_cancha?.categoria_cancha_nombre === 'Padel' ? 'bg-padel2' : 'bg-padel2'}`}>
                                        
                                    </div>
                                    <div className="p-4">
                                        <div className="flex gap-2">

                                            {/* ESTADO AQUI */}
                                            <p className={`text-xs flex items-center justify-center px-4 py-1 rounded-full ${c.estado_cancha?.estado_cancha_nombre === "Disponible" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
                                                {c.estado_cancha?.estado_cancha_nombre}
                                            </p>

                                            {/* CATEGORIA AQUI */}
                                            <p className='text-xs flex items-center justify-center text-gray-700 px-4 py-1 rounded-full bg-gray-200 w-auto'>
                                                {c.categoria_cancha?.categoria_cancha_nombre}
                                            </p>
                                        </div>

                                        {/* NOMBRE Y NUMERO DE CANCHA AQUI */}
                                        <h3 className='font-bold mt-2 uppercase group-hover:text-blue-600 hover:duration-300 duration-300 transition hover:transition'>
                                            {c.cancha_nombre} | Nº{c.cancha_numero}
                                        </h3>
                                        {/* EL PRECIO NO SE OBTIENE DESDE LA API... De momento lo dejaremos fijo en el frontend */}
                                        <p className='text-sm mt-1'>Precio: ${c.cancha_precio}</p> 
                                        <p className='text-sm mt-1'>Dimensión: {c.cancha_dimension}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <FooterWeb />
            </main>
        </>
    );
}

export default ReservationsWebPage;