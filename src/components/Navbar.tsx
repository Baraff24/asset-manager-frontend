import { Link } from "react-router-dom";

function Navbar(){
    return(
        <>
        <nav className="bg-gray-700 fixed top-0 w-full">
            <div className="text-white sm:flex py-6 pl-10">
                <span className="inline">ITAM</span>
            </div>
            <button type="button" className="py-4 text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-4 w-4">
                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-4 w-4">
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
            </button>
        </nav>

        <div className="z-40">
            <nav className="fixed left-0 bottom-0 flex w-1/4 flex-col bg-gray-700 pt-6 pb-8">

                <div className="px-4 pb-6">
                    <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">Main</h3>
                    <ul className="mb-8 text-sm font-medium">
                        <li>
                            <Link to={'/'} className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600">Homepage</Link>
                        </li>
                    </ul>
                </div>

                <div className="px-4 pb-6">
                    <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">Anagrafiche</h3>
                    <ul className="mb-8 text-sm font-medium">
                        <li>
                            <Link to={'/dipartimenti'} className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600">Dipartimenti</Link>
                        </li>
                    </ul>
                </div>

                <div className="px-4 pb-6">
                    <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">Attività</h3>
                    <ul className="mb-8 text-sm font-medium">
                        <li>
                            <Link to={'/statoRisorse'} className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600">Stato risorse</Link>
                        </li>
                        <li>
                            <Link to={'/rapportiIntervento'} className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600">Rapporti di intervento</Link>
                        </li>
                    </ul>
                </div>

                <div className="px-4 pb-6">
                    <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">Articoli</h3>
                    <ul className="mb-8 text-sm font-medium">
                        <li>
                            <Link to={'/assegnazioneRisorse'} className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600">Assegnazione risorse</Link>
                        </li>
                        <li>
                            <Link to={'/magazzino'} className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600">Magazzino</Link>
                        </li>
                    </ul>
                </div>

                <div className="px-4 pb-6">
                    <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">Agenda</h3>
                    <ul className="mb-8 text-sm font-medium">
                        <li>
                            <Link to={'/agenda'} className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600">Agenda</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

        </>
        
        
    )
}
export default Navbar;