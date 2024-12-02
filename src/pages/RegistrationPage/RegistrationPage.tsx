import React from "react";
import { Register } from "../../components";
import {Helmet} from "react-helmet";

const RegistrationPage: React.FC = () => {

    return (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600">
            <Helmet>
                <title>ITAM - Registrazione</title>
                <meta name="description"
                      content="Gestisci le tue risorse aziendali in modo efficiente e sicuro con ITAM."/>
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                <Register />
            </div>
        </div>
    )
}

export default RegistrationPage;