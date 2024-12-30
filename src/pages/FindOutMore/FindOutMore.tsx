import React from "react";
import { FaRegCheckCircle, FaRegChartBar, FaShieldAlt } from "react-icons/fa";
import { IoFlashOutline } from "react-icons/io5";
import FeatureCard from "../../components/FeatureCard";

const FindOutMore: React.FC = () => {

    return(
        <>
            <div className='container mx-auto px-4 py-24'>
                <h1 className= 'text-4xl font-bold pb-8 text-center'>Scopri di più sul Nostro IT Asset Flow</h1>

                <section className='mb-12'>
                    <h2 className="text-2xl font-semibold mb-4">Cos'è IT Asset Flow?</h2>

                    <p className='text-lg mb-4'>IT Asset Flow è un insieme di pratiche aziendali che incorpora hardware, software e risorse informatiche 
                    nell'inventario di un'azienda. Il nostro sistema ITAF ti aiuta a tenere traccia, gestire e ottimizzare tutti i tuoi asset IT 
                    in modo sicuro efficiente ed efficace.</p>
                </section>

                <section className='grid md:grid-cols-2 gap-6 mb-12'>
                    <FeatureCard
                    icon={<FaRegCheckCircle size={30}/>}
                    title="Vantaggi Chiave"
                    description="Riduzione dei costi operativi, Miglioramento della produttività, Gestione del rischio ottimizzata, Massima sicurezza, Conformità alle normative"/>

                    <FeatureCard
                    icon={<FaRegChartBar size={30}/>}
                    title="Caratteristiche Principali"
                    description="Monitoraggio del ciclo di vita degli asset, Gestione delle licenze software, Gestione delle risorse hardware, Integrazione con altri sistemi aziendali, Servizio manutenzione risorse"/>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold pb-8">Come funziona il nostro sistema?</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <FeatureCard
                        icon={<></>}
                        title="1. Accesso e Inventario"
                        description="Accedi al sistema per identificare e catalogare tutti gli asset IT."/>

                        <FeatureCard
                        icon={<></>}
                        title="2. Monitoraggio e Gestione"
                        description="Tieni traccia dello stato, della posizione e dell'utilizzo di ogni asset in tempo reale"/>

                        <FeatureCard
                        icon={<></>}
                        title="3. Richiesta Manutenzione"
                        description="Richiedi manutenzione per dispositivi o software compromessi"/>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold pb-8">Perché scegliere il nostro sistema?</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                            <FaShieldAlt className="mr-4 text-purple-500 flex-shrink-0" size={30}/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Sicurezza Avanzata</h3>
                                <p>Il nostro sistema utilizza tecnologie di crittografia all'avanguardia per proteggere i tuoi dati sensibili.</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <IoFlashOutline className="mr-4 text-yellow-500 flex-shrink-0" size={30}/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Prestazioni Elevate</h3>
                                <p>Grazie all'architettura ottimizzata, il nostro sistema gestisce grandi volumi di dati senza compromettere le prestazioni.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center">
                    <button className="bg-black text-white px-4 py-4 rounded hover:bg-gray-800">Richiedi una Demo</button>
                </div>
            </div>
        </>
    );
};

export default FindOutMore;