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

type LoginResponse = z.infer<typeof loginResponseSchema>;

// Key for storing tokens in local storage
const ACCESS_TOKEN_KEY = "access_token";

// Function to set token
const setToken = (access: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
};

// Function to clear tokens
const clearToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

// Function to get the access token
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
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
  setToken(parsedData.access);
  return parsedData;
};

// Function of logout
export const logout = () => {
  clearToken();
  // Puoi aggiungere altre azioni di logout, come reindirizzare l'utente
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
    clearToken();
    throw new Error("Non autenticato");
  }

  const data = await response.json();
  return loginResponseSchema.shape.user.parse(data);
};
