import React from "react";
import { Login } from "../../components";
import {Helmet} from "react-helmet";

const LoginPage: React.FC = () => {

    return (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600">
            <Helmet>
                <title>ITAM - Login</title>
                <meta name="description"
                      content="Gestisci le tue risorse aziendali in modo efficiente e sicuro con ITAM."/>
            </Helmet>
            <div className="container mx-auto px-4 py-8">
                <Login/>
            </div>
        </div>
    )
}

export default LoginPage;