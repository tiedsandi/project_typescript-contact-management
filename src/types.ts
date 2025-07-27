export type Contact = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

export type Address = {
  id: number;
  street: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
};

export type ContactsForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

export type AddressForm = {
  street: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
};
