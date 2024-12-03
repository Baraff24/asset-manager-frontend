import {getToken} from "./authServices.ts";
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

    // Check if response has content
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return res.json();
    } else {
        // Return null or an empty object if there's no content
        return null;
    }
};
