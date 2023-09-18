import { getToken } from "../helpers/getToken";

export const appQuery = async (method: string, url: string) => {
  const token: string | null = getToken();
  if (token) {
    const response = await fetch(`http://localhost:9000/${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } else {
    return null;
  }
};
