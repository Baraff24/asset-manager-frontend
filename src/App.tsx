import React from 'react';
import AppRoutes from './routes/AppRoutes';
import {fetcher} from "./services";
import {SWRConfig} from "swr";
import { AuthProvider } from './providers/authProvider';

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