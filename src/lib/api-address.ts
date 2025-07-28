import { API_BASE_URL } from "./enpoints";
import type { AddressForm } from "@/types";
import { getValidToken } from "@/utils/valid-token";

function getAuthHeaders(): HeadersInit {
  const token = getValidToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// ✅ Create Address
export async function createAddress(contactId: number, params: AddressForm) {
  const res = await fetch(`${API_BASE_URL}/contact/${contactId}/addresses`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create Address");

  return data;
}

// ✅ Get All Addresses by Contact
export async function getAddressesByContact(contactId: number) {
  const res = await fetch(`${API_BASE_URL}/contact/${contactId}/addresses`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch addresses");

  return data.data;
}

// ✅ Get Detail Address
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

// ✅ Update Address
export async function updateAddress(
  contactId: number,
  addressId: number,
  params: AddressForm
) {
  const res = await fetch(
    `${API_BASE_URL}/contact/${contactId}/addresses/${addressId}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(params),
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update Address");

  return data;
}

// ✅ Delete Address
export async function deleteAddress(contactId: number, addressId: number) {
  const res = await fetch(
    `${API_BASE_URL}/contact/${contactId}/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to delete Address");
  }

  return { success: true };
}
