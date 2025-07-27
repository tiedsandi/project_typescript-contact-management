import { API_BASE_URL, ENDPOINTS } from "./enpoints";

import type { AddressForm } from "@/types";
import { getValidToken } from "@/utils/valid-token";

function getAuthHeaders(): HeadersInit {
  const token = getValidToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function createAddress(params: AddressForm) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.address}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create Address");

  return data;
}

export async function getAddressesByContact(contactId: number) {
  const res = await fetch(`${API_BASE_URL}/contact/${contactId}/addresses`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) throw new Error(data.message || "Failed to fetch addresses");

  return data.data;
}

export async function getAddressDetail(contactId: number, addressId: number) {
  const res = await fetch(
    `${API_BASE_URL}/contact/${contactId}/addresses/${addressId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  const data = await res.json();
  if (!res.ok)
    throw new Error(data.message || "Failed to fetch Address detail");

  return data;
}

export async function updateAddress(id: number, params: AddressForm) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.address}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update Address");

  return data;
}

export async function deleteAddress(id: number) {
  const res = await fetch(`${API_BASE_URL}${ENDPOINTS.address}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to delete Address");
  }

  return { success: true };
}
