import React from "react";
import {Helmet} from "react-helmet";


const CheckYourEmailPage: React.FC = () => {
    // const navigate = useNavigate();

    /**
     * Reindirizza l'utente alla pagina di login.
     */
    // const handleLoginRedirect = () => {
    //   navigate("/login");
    // };

    return (
        <>
            <Helmet>
                <title>ITAM - Controlla la tua email</title>
                <meta name="description"
                      content="Gestisci le tue risorse aziendali in modo efficiente e sicuro con ITAM."/>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                    <h2 className="text-3xl font-semibold mb-6 text-green-600">Manca poco!</h2>
                    <p className="text-gray-700 mb-6">
                        Grazie per esserti registrato. Controlla la tua email per completare la registrazione
                    </p>
                    {/*<button*/}
                    {/*  onClick={handleLoginRedirect}*/}
                    {/*  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"*/}
                    {/*>*/}
                    {/*  Go to Login*/}
                    {/*</button>*/}
                </div>
            </div>
        </>
    );
};

export default CheckYourEmailPage;
