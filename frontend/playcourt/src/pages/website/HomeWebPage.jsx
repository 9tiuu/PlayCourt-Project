import { useEffect } from 'react';
import NavWeb from '../../components/NavWeb';
import FooterWeb from '../../components/FooterWeb';
import { Link } from 'react-router-dom';

const HomeWebPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <>
            <main>
                <NavWeb />
                <div className="bg-web w-full h-[100vh] flex items-center justify-center p-4 relative">
                    <div className="flex flex-col md:w-5/12 w-full">
                        <h1 className='uppercase text-5xl font-bold text-white text-center'>Juega, conecta y disfruta del deporte en <b className='text-blue-500'>PlayCourt</b></h1>
                        <p className='text-center text-white mt-4 text-lg'>Encuentra canchas disponibles, organiza tus partidos y vive la pasión del deporte sin complicaciones.</p>
                    </div>

                    <svg className='absolute translate-y-1 bottom-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,128L80,149.3C160,171,320,213,480,224C640,235,800,213,960,197.3C1120,181,1280,171,1360,165.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                </div>
                
                <div className="autoShow px-4 py-16 bg-white w-full items-center justify-center flex flex-col ">
                    <div className="flex flex-col items-center justify-center">
                        <p className='text-center bg-blue-200 text-blue-600 font-semibold px-10 py-2 rounded-full'>Nuestras Variedades</p>
                        <h2 className='text-black md:w-7/12 text-3xl text-center font-bold uppercase mt-2'>Optamos con variedades tipos de canchas deportivas ideales para tu deporte preferido</h2>
                        {/* <p className='text-center text-gray-600'>Las canchas en mantenimiento estarán disponibles dentro de muy poco</p> */}
                    </div>

                    <div className="flex md:flex-row flex-col gap-4 mt-10 justify-center items-center w-full">
                        <div className="bg-white shadow-xl border border-gray-300 px-4 py-12 rounded-lg md:w-72 w-80 h-80 flex justify-center items-center flex-col">
                            <div className="w-32 h-32 bg-futbol2 rounded-full border-4 border-blue-200"></div>
                            <p className="mt-2 text-black font-semibold text-lg">Cancha de Futbol</p>
                            <Link to={'reservas'} className="bg-blue-600 mt-3 w-52 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear usuario">
                                Ver más
                            </Link>
                        </div>
                        <div className="bg-white shadow-xl border border-gray-300 px-4 py-12 rounded-lg md:w-72 w-80 h-80 flex justify-center items-center flex-col">
                            <div className="w-32 h-32 bg-basquet2 rounded-full border-4 border-blue-200"></div>
                            <p className="mt-2 text-black font-semibold text-lg">Cancha de Baloncesto</p>
                            <Link to={'reservas'} className="bg-blue-600 mt-3 w-52 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear usuario">
                                Ver más
                            </Link>
                        </div>
                        <div className="bg-white shadow-xl border border-gray-300 px-4 py-12 rounded-lg md:w-72 w-80 h-80 flex justify-center items-center flex-col">
                            <div className="w-32 h-32 bg-tenis2 rounded-full border-4 border-blue-200"></div>
                            <p className="mt-2 text-black font-semibold text-lg">Cancha de Tenis</p>
                            <Link to={'reservas'} className="bg-blue-600 mt-3 w-52 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear usuario">
                                Ver más
                            </Link>
                        </div>
                        <div className="bg-white shadow-xl border border-gray-300 px-4 py-12 rounded-lg md:w-72 w-80 h-80 flex justify-center items-center flex-col">
                            <div className="w-32 h-32 bg-padel2 rounded-full border-4 border-blue-200"></div>
                            <p className="mt-2 text-black font-semibold text-lg">Cancha de Padel</p>
                            <Link to={'reservas'} className="bg-blue-600 mt-3 w-52 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear usuario">
                                Ver más
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="autoShow px-4 bg-gray-100 py-16 w-full items-center justify-center flex flex-col">
                    <div className="flex md:flex-row flex-col-reverse justify-center items-center gap-10">
                        <div className="w-full h-full rounded-lg">
                            <img src="https://us.123rf.com/450wm/lightfieldstudios/lightfieldstudios1808/lightfieldstudios180805203/106486646-vista-parcial-de-amigos-ancianos-multiculturales-jugando-al-f%C3%BAtbol-juntos.jpg?ver=6" 
                                alt="homeimg"
                                className='object-cover w-full h-full rounded-lg'
                            />
                        </div>

                        <div className="flex flex-col">
                            <p className='text-center w-52 bg-blue-200 text-blue-600 font-semibold px-10 py-2 rounded-full'>sobre Nosotros</p>
                            <h2 className='text-black md:w-[35rem] md:text-3xl text-[1.8rem] text-left font-bold uppercase mt-2'>Encuentra y disfruta de tu espacio deportivo en PlayCourt</h2>
                            <p className='text-left mt-1 text-lg md:w-[35rem] text-gray-600'>En PlayCourt ofrecemos espacios deportivos de todo tipo, disponibles al instante, para que puedas encontrar y reservar la cancha perfecta sin complicaciones, selecciona tu cancha deportiva preferida para reservar, o puedes contactarnos directamente a travez de WhatsApp.</p>

                            <Link to={'reservas'} className="bg-blue-600 mt-3 md:w-52 flex items-center justify-center gap-2 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition text-white py-3 px-6 rounded" title="Crear usuario">
                                ¡Reserva ahora!
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="autoShow px-4 bg-white py-16 w-full items-center justify-center flex flex-col ">
                    <div className="flex flex-col items-center justify-center">
                        <p className='text-center bg-blue-200 text-blue-600 font-semibold px-10 py-2 rounded-full'>Contactanos</p>
                        <h2 className='text-black md:w-7/12 text-3xl text-center font-bold uppercase mt-2'>Puedes contactarnos directamente a través de nuestra información</h2>
                        {/* <p className='text-center text-gray-600'>Las canchas en mantenimiento estarán disponibles dentro de muy poco</p> */}
                    </div>

                    <div className="flex border border-gray-400 md:w-[80rem] rounded-lg md:flex-row flex-col gap-4 mt-8 justify-center items-center w-full">
                        <div className=" px-6 py-10 rounded-lg md:w-72 w-80 h-64 flex justify-center items-center flex-col">
                            <div className="p-4 flex items-center justify-center rounded-full border-4 border-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-envelope-at-fill text-blue-600" viewBox="0 0 16 16">
                                    <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671"/>
                                    <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791"/>
                                </svg>
                            </div>
                            <p className="mt-2 text-center text-blue-600 font-semibold text-lg">Correo electrónico</p>
                            <p className="mt-1 text-center text-gray-700 text-base">plc.contacto@playcourt.cl</p>
                        </div>
                        <div className=" px-6 py-10 rounded-lg md:w-72 w-80 h-64 flex justify-center items-center flex-col">
                            <div className="p-4 flex items-center justify-center rounded-full border-4 border-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-telephone-fill text-blue-600" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                </svg>
                            </div>
                            <p className="mt-2 text-center text-blue-600 font-semibold text-lg">Teléfono</p>
                            <p className="mt-1 text-center text-gray-700 text-base">+56 9 0000 0000</p>
                        </div>
                        <div className=" px-6 py-10 rounded-lg md:w-72 w-80 h-64 flex justify-center items-center flex-col">
                            <div className="p-4 flex items-center justify-center rounded-full border-4 border-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-geo-alt-fill text-blue-600" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                </svg>
                            </div>
                            <p className="mt-2 text-center text-blue-600 font-semibold text-lg">Ubicación</p>
                            <p className="mt-1 text-center text-gray-700 text-base">Pje. Sofia s/n, Arica, Arica y Parinacota</p>
                        </div>
                    </div>
                </div>
                <iframe className='autoShow w-full h-[30rem]' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.6049673493435!2d-70.27730212389055!3d-18.50154439542333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915aa82d85247121%3A0x381e9b96997417d2!2sPje.%20Sofia%2C%20Arica%2C%20Arica%20y%20Parinacota!5e0!3m2!1ses-419!2scl!4v1764322566418!5m2!1ses-419!2scl" title="Mapa de ubicación de PlayCourt ficticia" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                <a href='...' target='_blank' className="fixed flex gap-2 bottom-0 md:ml-10 ml-5 mb-8 z-10 w-full group">
                    <div className="flex items-center justify-center rounded-full bg-[#26d367] w-12 h-12">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-whatsapp text-white" viewBox="0 0 16 16">
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

export default HomeWebPage;