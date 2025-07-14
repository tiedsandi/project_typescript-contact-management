import { ENDPOINTS } from "./enpoints";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function registerUser({
  username,
  password,
  name,
}: {
  username: string;
  password: string;
  name: string;
}) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.register}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, name }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to register");

  return data;
}

export async function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.errors || "Failed to login");

  return data;
}
