import { API_BASE_URL, ENDPOINTS } from "./enpoints";

import type { Contact } from "@/features/dashboard/types";

type contactsForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type SearchContactsParams = {
  page: number;
  size?: number;
  name?: string;
  email?: string;
  phone?: string;
};

type ContactSearchResponse = {
  data: Contact[];
  paging: {
    page: number;
    total_item: number;
    total_page: number;
  };
};

function getAuthHeaders(token: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function createContact(token: string, params: contactsForm) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.register}`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create contact");

  return data;
}

export async function searchContacts(
  token: string,
  params: SearchContactsParams
): Promise<ContactSearchResponse> {
  const { page, size = 5, name, email, phone } = params;

  const query = new URLSearchParams();
  query.append("page", page.toString());
  query.append("size", size.toString());
  if (name) query.append("name", name);
  if (email) query.append("email", email);
  if (phone) query.append("phone", phone);

  const url = `${API_BASE_URL}${ENDPOINTS.contacts}?${query.toString()}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to search contacts");

  return data;
}

export async function getContactDetail(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.contacts}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok)
    throw new Error(data.message || "Failed to fetch contact detail");

  return data;
}

export async function updateContact(
  token: string,
  id: number,
  params: contactsForm
) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.contacts}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update contact");

  return data;
}

export async function deleteContact(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.contacts}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to delete contact");
  }

  return { success: true };
}
