import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "./useFetch";
import {User, userSchema} from "../schemas";
import {clearToken} from "../services";

type UseAuthResult = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: unknown;
};

export const useAuth = (): UseAuthResult => {
  const navigate = useNavigate();

  const { data: user, error, isLoading } = useFetch<User>("/api/v1/users/", userSchema);

  useEffect(() => {
    if (error) {
      // If there's an error fetching user data, assume not authenticated
      clearToken();
      navigate("/login");
    }
  }, [error, navigate]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
  };
};
