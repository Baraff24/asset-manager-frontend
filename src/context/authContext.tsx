import React, { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

interface AuthContextType {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: unknown;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve essere usato all'interno di AuthProvider");
  }
  return context;
};
