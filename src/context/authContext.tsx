import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Users } from "../schemas";
import { useFetch } from "../hooks/useFetch";
import { usersSchema } from "../schemas";
import { getToken } from "../services";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const token = getToken();
  const { data: usersArray, error } = useFetch<Users>(
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
  }, [usersArray, error]);

  const value = {
    user,
    isAuthenticated: !!user,
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
