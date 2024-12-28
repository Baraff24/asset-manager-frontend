import React, { useState } from 'react';
import { z } from 'zod';
import { FaEnvelope, FaPhone, } from 'react-icons/fa';
import { FaMapLocationDot  } from 'react-icons/fa6';
import ContactForm from '../../components/ContactForm';
import { contactSchema, ContactFormData } from '../../schemas/contactSchema';

const ContactUs: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: ContactFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validazione dei dati del form utilizzando lo schema Zod
      const validatedData = contactSchema.parse(formData);

      const response = await fetch('/api/v1/accounts/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error('Si è verificato un errore durante l\'invio del messaggio.');
      }

      const data = await response.json();
      console.log('Risposta dal server:', data);
      setIsSubmitted(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Gestione degli errori di validazione Zod
        setError(err.errors.map(e => e.message).join(", "));
      } else {
        setError(err instanceof Error ? err.message : 'Si è verificato un errore sconosciuto.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Contattaci</h1>
          {isSubmitted ? (
            <div className="text-green-600 font-semibold">
              Grazie per averci contattato! Ti risponderemo al più presto.
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 text-red-600 font-semibold">
                  {error}
                </div>
              )}
              <ContactForm onSubmit={handleSubmit} isLoading={isLoading} />
            </>
          )}
        </div>
        <div className="px-4 py-4 sm:px-6 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Informazioni di contatto</h2>
          <p className="text-sm text-gray-600">
            <a href="tel: +39 02 1234567" className='flex items-center rounded-md hover:bg-gray-200 transition-colors'>
              <span className='inline-block px-2 py-1'><FaPhone/></span>
              <span className='inline-block px-2 py-1'>Telefono: +39 02 1234567</span>
            </a>

            <a href="mailto: info@itassetflow.com" className='flex items-center rounded-md hover:bg-gray-200 transition-colors'>
              <span className='inline-block px-2 py-1'><FaEnvelope/></span>
              <span className='inline-block px-2 py-1'>Email: info@itassetflow.com</span>
            </a>

            <a href="https://maps.app.goo.gl/s6c95A7y7QFro25P8" className='flex items-center rounded-md hover:bg-gray-200 transition-colors'>
              <span className='inline-block px-2 py-1'><FaMapLocationDot/></span>
              <span className='inline-block px-2 py-1'>Indirizzo: Via Amendola 123, 70126 Bari, Italia</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;