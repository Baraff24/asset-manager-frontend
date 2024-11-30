import React from "react";
import { FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
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
              <div className="bg-gray-100 rounded-lg p-6 text-center shadow hover:shadow-lg transition-shadow">
                <FaRocket className="text-blue-600 mx-auto mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-2">Velocità</h3>
                <p className="text-gray-700">
                  Ottimizza i tuoi processi con soluzioni rapide ed efficienti.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-gray-100 rounded-lg p-6 text-center shadow hover:shadow-lg transition-shadow">
                <FaShieldAlt className="text-blue-600 mx-auto mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-2">Sicurezza</h3>
                <p className="text-gray-700">
                  Proteggi le tue risorse con sistemi di sicurezza avanzati.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-gray-100 rounded-lg p-6 text-center shadow hover:shadow-lg transition-shadow">
                <FaUsers className="text-blue-600 mx-auto mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-2">Collaborazione</h3>
                <p className="text-gray-700">
                  Facilita la collaborazione tra i team con strumenti integrati.
                </p>
              </div>
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
              <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
                <p className="text-gray-700 mb-4">
                  "ITAM ha rivoluzionato il nostro modo di gestire le risorse. Siamo più efficienti che mai!"
                </p>
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="User 1"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">Marco Rossi</p>
                    <p className="text-sm text-gray-500">CEO, Azienda XYZ</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
                <p className="text-gray-700 mb-4">
                  "Le funzionalità di ITAM ci hanno permesso di migliorare la collaborazione interna."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="User 2"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">Laura Bianchi</p>
                    <p className="text-sm text-gray-500">Manager, Azienda ABC</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
                <p className="text-gray-700 mb-4">
                  "Grazie a ITAM, la nostra sicurezza delle risorse non è mai stata così solida."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="User 3"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">Giovanni Verdi</p>
                    <p className="text-sm text-gray-500">CTO, Azienda DEF</p>
                  </div>
                </div>
              </div>
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
  );
};

export default HomePage;