import { getAccessToken, logout } from "./authServices";

// Define the fetcher function with the authorization header
export const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  const accessToken = getAccessToken();

  const headers = {
    ...init?.headers,
    "Content-Type": "application/json",
    ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
  };

  const response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    logout();
    window.location.reload();
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Errore nella richiesta");
  }

  return response.json();
};
