import type { Contact } from "./types";
import DetailsContact from "./components/DetailsContact";
import FormCard from "@/components/FormCard";
import PageHeader from "@/components/PageHeader";
import { useLoaderData } from "react-router";

export default function DetailsContactPage() {
  const { contact, token } = useLoaderData() as {
    contact: Contact;
    token: string;
  };

  return (
    <>
      <PageHeader
        backTo="/dashboard"
        backLabel="Back to Contacts"
        title="Details Contact"
        iconClass="fas fa-user"
      />
      <div className="max-w-3xl m-auto">
        <FormCard
          icon={<i className="fas fa-user text-white" />}
          title="Sandi"
          FormNode={<DetailsContact contact={contact} token={token} />}
        />
      </div>
    </>
  );
}
