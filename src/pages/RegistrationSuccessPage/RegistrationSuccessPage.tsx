import React from "react";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";


const RegistrationSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Handles the redirection to the login page.
   */
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
      <>
        <Helmet>
          <title>ITAM - Registrazione eseguita</title>
          <meta name="description"
                content="Gestisci le tue risorse aziendali in modo efficiente e sicuro con ITAM."/>
        </Helmet>


        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
            <h2 className="text-3xl font-semibold mb-4 text-green-600">Email Confermata!</h2>
            <p className="text-gray-700 mb-6">
              La tua email è stata confermata con successo. La registrazione è completata. Ora puoi effettuare il login.
            </p>
            <button
                onClick={handleLoginRedirect}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Vai alla pagina di login
            </button>
          </div>
        </div>
      </>
  );
};

export default RegistrationSuccessPage;
