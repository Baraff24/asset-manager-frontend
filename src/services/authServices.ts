import { z } from "zod";

// Scheme for login and refresh responses
const loginResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string().email(),
    // Aggiungi altri campi utente se necessario
  }),
});

const refreshResponseSchema = z.object({
  access: z.string(),
});

type LoginResponse = z.infer<typeof loginResponseSchema>;
type RefreshResponse = z.infer<typeof refreshResponseSchema>;

// Keys for storing tokens in local storage
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// Function to set tokens
const setTokens = (access: string, refresh: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
};

// Function to clear tokens
const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Function to get the access token
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

// Funzione to get the refresh token
const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// Function of login
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch("/api/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Credenziali non valide");
  }

  const data = await response.json();
  const parsedData = loginResponseSchema.parse(data);
  setTokens(parsedData.access, parsedData.refresh);
  return parsedData;
};

// Function of logout
export const logout = () => {
  clearTokens();
  // Puoi aggiungere altre azioni di logout, come reindirizzare l'utente
};

// Funzione to refresh the access token
export const refreshToken = async (): Promise<string> => {
  const refresh = getRefreshToken();
  if (!refresh) {
    throw new Error("Refresh token mancante");
  }

  const response = await fetch("/api/auth/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    clearTokens();
    const errorData = await response.json();
    throw new Error(errorData.detail || "Token di refresh non valido");
  }

  const data = await response.json();
  const parsedData = refreshResponseSchema.parse(data);
  localStorage.setItem(ACCESS_TOKEN_KEY, parsedData.access);
  return parsedData.access;
};

// Function to get the current user
export const getCurrentUser = async (): Promise<LoginResponse["user"]> => {
  const access = getAccessToken();
  if (!access) {
    throw new Error("Access token mancante");
  }

  const response = await fetch("/api/auth/user/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    clearTokens();
    throw new Error("Non autenticato");
  }

  const data = await response.json();
  return loginResponseSchema.shape.user.parse(data);
};
