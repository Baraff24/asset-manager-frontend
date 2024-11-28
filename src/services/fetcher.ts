import {getToken} from "./authServices";
import {BASE_URL} from "../utils/constants.ts";

export const fetcher = async (url: string, options: RequestInit = {}) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Token ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "An error occurred");
  }

  return res.json();
};