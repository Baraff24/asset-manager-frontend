import React, { useEffect, useState } from "react";
import { User, Users, usersSchema } from "../schemas";
import { getToken } from "../services";
import { useFetch } from "../hooks/useFetch.ts";
import {AuthContext, AuthContextType} from "../context/authContext.tsx";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const token = getToken();

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
