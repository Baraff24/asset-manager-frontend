import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Users } from "../schemas";
import { usersSchema } from "../schemas";
import { getToken } from "../services";
import {useFetch} from "../hooks/useFetch.ts";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Added isLoading
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const token = getToken();

  // Extract isLoading from useFetch
  const { data: usersArray, error, isLoading } = useFetch<Users>(
    token ? "/api/v1/accounts/users/" : null,
    usersSchema
  );

  useEffect(() => {
    if (usersArray && usersArray.length > 0) {
      const newUser = usersArray[0];
      if (!user || user.id !== newUser.id) {
        setUser(newUser);
      }
    } else if (error) {
      if (user !== null) {
        setUser(null);
      }
    }
  }, [usersArray, error, user]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
