import { getAccessToken, refreshToken, logout } from "./authServices";

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
    // Try to refresh the token
    try {
      const newAccessToken = await refreshToken();
      headers["Authorization"] = `Bearer ${newAccessToken}`;
      const retryResponse = await fetch(input, { ...init, headers });
      if (retryResponse.ok) {
        return retryResponse.json();
      } else {
        logout();
        throw new Error("Autenticazione fallita dopo il refresh token");
      }
    } catch (error) {
      logout();
      throw error;
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Errore nella richiesta");
  }

  return response.json();
};
