function HomePage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <h1 className="text-3xl font-bold my-3 text-center">Sistema de Productos</h1>
                <h2 className="text-3xl font-bold my-3 text-center">Seguridad en Aplicaciones Web</h2>
                <div>
                    <p className="gap-x-2 text-justify pt-5 mt-5 text-sm">
                        Este sistema ha sido creado en la materia Seguridad en Aplicaciones Web
                        Para la carrera de Ingenieria en Sistemas Computacionales
                    </p>
                    <hr className="my-5 h-px border-t-0 bg-transparent bg-linear-to-r
                    from-transparent via-neutral-500 to-transparent
                    opacity-25"/>
                    <p className="text-center text-xs">
                        Derechos Reservados JILV &copy; 2025
                    </p>
                </div>
            </div>

        </div>
    )
}

export default HomePage