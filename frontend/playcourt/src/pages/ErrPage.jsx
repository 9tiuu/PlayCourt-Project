

const ErrPage = () => {
    return (
            <header className="relative">
                <div className="absolute h-screen inset-0 bg-[url('https://w.wallhaven.cc/full/g7/wallhaven-g7w6v3.jpg')] bg-cover bg-top">
                    <div className="absolute inset-0  backdrop-blur-lg"></div>
                </div>
                
                <section className="home-hero-content items-center grid h-screen">
                    <div className="relative container mx-auto px-6 text-center">
                        <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-black md:text-5xl lg:text-6xl">
                            Error <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-blue-700">404</span>
                        </h1>
                        <p className=" text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-60 dark:text-gray-400">
                            Página no encontrada...
                        </p>
                    </div>
                </section>
            </header>
    );
}

export default ErrPage;