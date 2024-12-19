import React from "react";
import { FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FeatureCard, HeroSlider, TestimonialCard } from "../../components";

const HomePage: React.FC = () => {
  const slides = [
    {
      image: "https://via.placeholder.com/500x300/ff6363/ffffff?text=ITAM+Slide+1",
      title: "Benvenuto in ITAM",
      description: "Gestisci le tue risorse in modo efficiente e sicuro con le nostre soluzioni all'avanguardia.",
      cta: {
        label: "Inizia Ora",
        link: "/register",
      },
    },
    {
      image: "../../assets/styles/images/OttimizzaProcessi.jpg",
      title: "Ottimizza i tuoi processi",
      description: "Velocizza la gestione e riduci i costi grazie a strumenti innovativi.",
      cta: {
        label: "Scopri di più",
        link: "/features",
      },
    },
    {
      image: "../../assets/styles/images/security.png",
      title: "Massima Sicurezza",
      description: "Proteggi le tue risorse con soluzioni avanzate e conformi agli standard.",
      cta: {
        label: "Contattaci",
        link: "/contact",
      },
    },
  ];

  return (
      <>
        <Helmet>
          <title>ITAM - Gestione Risorse Aziendali</title>
          <meta
              name="description"
              content="Gestisci le tue risorse aziendali in modo efficiente e sicuro con ITAM."
          />
        </Helmet>
        <main>
          {/* Hero Section */}
          <section className="relative h-screen text-white">
            <HeroSlider slides={slides} interval={4000} />
          </section>

          {/* Features Section */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-semibold text-center mb-8">
                Le Nostre Caratteristiche
              </h2>
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
              <h2 className="text-3xl font-semibold text-center mb-8">
                Cosa Dicono di Noi
              </h2>
              <div className="flex flex-wrap -mx-4">
                {/* Testimonial 1 */}
                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                  <TestimonialCard
                      testimonial="ITAM ha rivoluzionato il nostro modo di gestire le risorse. Siamo più efficienti che mai!"
                      name="Marco Rossi"
                      role="CEO, Azienda XYZ"
                      image="../../assets/styles/images/MarcoRossi.jpg"
                  />
                </div>
                {/* Testimonial 2 */}
                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                  <TestimonialCard
                      testimonial="Le funzionalità di ITAM ci hanno permesso di migliorare la collaborazione interna."
                      name="Laura Bianchi"
                      role="Manager, Azienda ABC"
                      image="../../assets/styles/images/LauraBianchi.jpg"
                  />
                </div>
                {/* Testimonial 3 */}
                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                  <TestimonialCard
                      testimonial="Grazie a ITAM, la nostra sicurezza delle risorse non è mai stata così solida."
                      name="Giovanni Verdi"
                      role="CTO, Azienda DEF"
                      image="../../assets/styles/images/GiovanniVerdi.jpg"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-12 bg-blue-600 text-white">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-semibold mb-4">
                Pronto a Migliorare la Tua Gestione delle Risorse?
              </h2>
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