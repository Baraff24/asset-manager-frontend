import React from 'react';
import AppRoutes from './routes/AppRoutes';
import {AuthProvider} from "./context/authContext.tsx";

const App: React.FC = () => {
  return (
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
  );
};

export default App;