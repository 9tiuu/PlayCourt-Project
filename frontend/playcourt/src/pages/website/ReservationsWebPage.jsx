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
            const response = await api.get('canchasdeportivas/');
            setListCanchas(response.data);

        } catch(error){
            console.log(error.message);
        };
    };

    useEffect(() => {
        obtenerCanchas();
    }, []);
    
    return (
        <>
            <main>
                <NavWeb />
                <div className="flex items-center justify-center flex-col w-full h-full p-4 mt-28 mb-16 ">
                    <div className="flex flex-col items-center justify-center">
                        <p className='text-center bg-blue-200 text-blue-600 font-semibold px-10 py-2 rounded-full'>Reservas</p>
                        <h2 className='text-black text-2xl text-center font-bold uppercase mt-2'>¡Selecciona tu cancha deportiva para reservar!</h2>
                        <p className='text-center text-gray-600'>Las canchas en mantenimiento estarán disponibles dentro de muy poco</p>
                    </div>

                    <div className="grid items-center gap-4 justify-center md:grid-cols-3 grid-cols-1 mt-10 ">
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
                                        <p className='text-sm mt-1'>Precio: ${c.precio}</p> 
                                        <p className='text-sm mt-1'>Dimensión: {c.dimension}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <a href='...' target='_blank' className="fixed flex gap-2 bottom-0 ml-10 mb-8 z-10 w-full group">
                    <div className="flex items-center justify-center rounded-full bg-[#26d367] w-12 h-12">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-whatsapp text-white" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                        </svg>
                    </div>

                    <div className="bg-white border border-[#26d367] py-2 px-4 rounded-full flex items-center justify-center">
                        <p className='text-left font-semibold group-hover:underline'>¡Escríbenos por WhatsApp!</p>
                    </div>
                </a>
                
                <FooterWeb />
            </main>
        </>
    );
}

export default ReservationsWebPage;