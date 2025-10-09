import { useEffect } from 'react';
import NavWeb from '../../components/NavWeb';

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

                    <svg className='absolute bottom-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,128L80,149.3C160,171,320,213,480,224C640,235,800,213,960,197.3C1120,181,1280,171,1360,165.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                </div>
            </main>
        </>
    );
}

export default HomeWebPage;