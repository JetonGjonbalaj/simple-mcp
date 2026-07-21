import { NWS_API_BASE } from "../consts/index.js";

export const makeNWSRequest = async <T>(url: string): Promise<T | null> => {
  const headers = {
    Accept: "application/geo+json",
  };

  try {
    const response = await fetch(`${NWS_API_BASE}/${url}`, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json());
  } catch (err) {
    console.error("Error making NWS request:", err);
    return null;
  }
};
