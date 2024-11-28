// src/services/authServices.ts
import { fetcher } from "./fetcher";
import { z } from "zod";

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

// Logout function
export const logout = () => {
  clearToken();
  // Additional logout actions like redirecting the user can be added here
};

// Function to get current user data (if needed outside of useAuth)
// export const getCurrentUser = async (): Promise<User> => {
//   const data = await fetcher("/api/auth/user/");
//   return userSchema.parse(data);
// };
