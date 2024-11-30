// src/pages/HomePage.tsx

import React from "react";
import { FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {FeatureCard, TestimonialCard} from "../../components";

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>ITAM - Gestione Risorse Aziendali</title>
        <meta name="description" content="Gestisci le tue risorse aziendali in modo efficiente e sicuro con ITAM." />
      </Helmet>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 py-12">
            {/* Text Content */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Benvenuto in ITAM
              </h1>
              <p className="text-lg mb-6">
                Gestisci le tue risorse in modo efficiente e sicuro con le nostre soluzioni all'avanguardia.
              </p>
              <Link
                to="/register"
                className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow hover:bg-gray-100 transition"
              >
                Inizia Ora
              </Link>
            </div>
            {/* Image */}
            <div className="flex-1 mb-6 md:mb-0">
              <img
                src="https://via.placeholder.com/500x300"
                alt="ITAM Solutions"
                className="w-full rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-8">Le Nostre Caratteristiche</h2>
            <div className="flex flex-wrap -mx-4">
              {/* Feature 1 */}
              <div className="w-full md:w-1/3 px-4 mb-8">
                <FeatureCard
                  icon={<FaRocket size={40} />}
                  title="Velocità"
                  description="Ottimizza i tuoi processi con soluzioni rapide ed efficienti."
                />
              </div>
              {/* Feature 2 */}
              <div className="w-full md:w-1/3 px-4 mb-8">
                <FeatureCard
                  icon={<FaShieldAlt size={40} />}
                  title="Sicurezza"
                  description="Proteggi le tue risorse con sistemi di sicurezza avanzati."
                />
              </div>
              {/* Feature 3 */}
              <div className="w-full md:w-1/3 px-4 mb-8">
                <FeatureCard
                  icon={<FaUsers size={40} />}
                  title="Collaborazione"
                  description="Facilita la collaborazione tra i team con strumenti integrati."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-8">Cosa Dicono di Noi</h2>
            <div className="flex flex-wrap -mx-4">
              {/* Testimonial 1 */}
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <TestimonialCard
                  testimonial="ITAM ha rivoluzionato il nostro modo di gestire le risorse. Siamo più efficienti che mai!"
                  name="Marco Rossi"
                  role="CEO, Azienda XYZ"
                  image="https://via.placeholder.com/50"
                />
              </div>
              {/* Testimonial 2 */}
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <TestimonialCard
                  testimonial="Le funzionalità di ITAM ci hanno permesso di migliorare la collaborazione interna."
                  name="Laura Bianchi"
                  role="Manager, Azienda ABC"
                  image="https://via.placeholder.com/50"
                />
              </div>
              {/* Testimonial 3 */}
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <TestimonialCard
                  testimonial="Grazie a ITAM, la nostra sicurezza delle risorse non è mai stata così solida."
                  name="Giovanni Verdi"
                  role="CTO, Azienda DEF"
                  image="https://via.placeholder.com/50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-12 bg-blue-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold mb-4">Pronto a Migliorare la Tua Gestione delle Risorse?</h2>
            <p className="text-lg mb-6">
              Unisciti a migliaia di aziende che già utilizzano ITAM per ottimizzare le loro operazioni.
            </p>
            <Link
              to="/register"
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow hover:bg-gray-100 transition"
            >
              Inizia Ora
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;