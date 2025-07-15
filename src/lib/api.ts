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

export async function updateUser({
  name,
  password,
  token,
}: {
  name?: string;
  password?: string;
  token: string;
}) {
  const payload: Record<string, string> = {};

  if (name) payload.name = name;
  if (password) payload.password = password;

  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.user}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update user");
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
}

export async function getUser(token: string) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.user}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("❌ Failed to fetch user profile");

  const data = await res.json();

  return {
    username: data.data.username,
    name: data.data.name,
  };
}
