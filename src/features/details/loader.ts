import { getAddressesByContact } from "@/lib/api-address";
import { getContactDetail } from "@/lib/api-contact";
import { getValidToken } from "@/utils/valid-token";
import { redirect, type LoaderFunctionArgs } from "react-router";

export async function loader({ params }: LoaderFunctionArgs) {
  const token = getValidToken();
  if (!token) throw redirect("/login");

  const id = params.idContact;
  if (!id) throw new Error("Invalid contact ID");

  const resContact = await getContactDetail(token, Number(id));
  const contact = resContact.data;

  const resAddress = await getAddressesByContact(Number(id));
  const addresses = resAddress;

  return { contact, addresses, token };
}
