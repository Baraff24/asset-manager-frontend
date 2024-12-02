import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";

const Footer: React.FC = () => {
    return (
        <footer className="bottom-0 left-0 right-0 bg-gray-800 text-white py-6 z-50">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                {/* Sezione Sinistra: Informazioni Aziendali */}
                <div className="mb-4 md:mb-0">
                    <p className="text-sm">&copy; {new Date().getFullYear()} ITAM. Tutti i diritti riservati.</p>
                </div>
                
                {/* Sezione Destra: Link Utili e Icone */}
                <div className="flex items-center space-x-4">
                    {/* Link Utili */}
                    <a href="/privacy" className="text-sm hover:text-gray-400 transition-colors">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="text-sm hover:text-gray-400 transition-colors">
                        Termini di Servizio
                    </a>
                    
                    {/* Icone */}
                    <a href="/settings" className="hover:text-gray-400 transition-colors" aria-label="Impostazioni">
                        <IoSettingsOutline size={24} />
                    </a>
                    <a href="/help" className="hover:text-gray-400 transition-colors" aria-label="Aiuto">
                        <IoIosHelpCircleOutline size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
