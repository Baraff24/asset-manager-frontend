import React from 'react';
import AppRoutes from './routes/AppRoutes';
import {AuthProvider} from "./context/authContext.tsx";
import {fetcher} from "./services";
import {SWRConfig} from "swr";

const App: React.FC = () => {
    return (
        <SWRConfig
            value={{
                fetcher: fetcher,
                onError: (error) => {
                    console.error("SWR Error:", error);
                },
            }}
        >
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </SWRConfig>

    );
};

export default App;