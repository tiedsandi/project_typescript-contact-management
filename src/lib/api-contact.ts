import { API_BASE_URL, ENDPOINTS } from "./enpoints";

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

export async function createContact(params: contactsForm) {
  console.log(params);

  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.register}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create contact");

  return data;
}

export async function searchContacts(params: SearchContactsParams) {
  const { page, size = 5, name, email, phone } = params;

  const query = new URLSearchParams();

  if (name) query.append("name", name);
  if (email) query.append("email", email);
  if (phone) query.append("phone", phone);
  if (page !== undefined) query.append("page", page.toString());
  if (size !== undefined) query.append("size", size.toString());

  const url = `${API_BASE_URL}${ENDPOINTS.contacts}?${query.toString()}`;
  const res = await fetch(url);

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to search contacts");

  return data;
}

export async function getContactDetail(id: number) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.contacts}/${id}`);

  const data = await res.json();
  if (!res.ok)
    throw new Error(data.message || "Failed to fetch contact detail");

  return data;
}

export async function updateContact(id: number, params: contactsForm) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.contacts}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update contact");

  return data;
}

export async function deleteContact(id: number) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.contacts}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to delete contact");
  }

  return { success: true };
}
