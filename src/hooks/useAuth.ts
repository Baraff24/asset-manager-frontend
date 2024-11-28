import { useEffect } from "react";
import { useFetch } from "./useFetch";
import {User, Users, usersSchema} from "../schemas";
import { clearToken } from "../services";

type UseAuthResult = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: unknown;
};

export const useAuth = (): UseAuthResult => {
  const { data: user, error, isLoading } = useFetch<Users>("/api/v1/accounts/users/", usersSchema);

  useEffect(() => {
    if (error) {
      // Handle authentication error
      clearToken();
      // Optionally, set an authentication state or trigger a callback
    }
  }, [error]);

  return {
    user: user ? user[0] : null,
    isLoading,
    isAuthenticated: !!user,
    error,
  };
};
