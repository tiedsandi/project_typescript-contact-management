import type { Contact } from "../types";

type DetailsContact = {
  Contact: Contact;
};

export default function DetailsContact({ Contact }: DetailsContact) {
  return <h1>{Contact.email}</h1>;
}
