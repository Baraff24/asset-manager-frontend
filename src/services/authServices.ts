import { fetcher } from "./fetcher";
import { z } from "zod";


// Define the schema for registration response
export const registerResponseSchema = z.object({
  key: z.string(),
});


// Define the schema for login response
const loginResponseSchema = z.object({
  key: z.string(),
});

// Token key in localStorage
const TOKEN_KEY = "auth_token";

// Token management functions
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Login function
export const login = async (username: string, password: string): Promise<void> => {
  const data = await fetcher("/api/v1/auth/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  const parsedData = loginResponseSchema.parse(data);
  setToken(parsedData.key);
};

// Register function
export const register = async (data: RegisterData): Promise<void> => {
  const response = await fetcher("/api/v1/auth/registration/", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Errore durante la registrazione.");
  }
};

// Logout function
export const logout = () => {
  clearToken();
  // Any additional logout logic
};

// Define the shape of registration data
export interface RegisterData {
  username: string;
  password1: string;
  password2: string;
  email: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  telephone?: string;
  department?: number | null;
}

// Function to get current user data (if needed outside of useAuth)
// export const getCurrentUser = async (): Promise<User> => {
//   const data = await fetcher("/api/auth/user/");
//   return userSchema.parse(data);
// };
