import type { Contact } from "./types";
import DetailsContact from "./components/DetailsContact";
import FormCard from "@/components/FormCard";
import PageHeader from "@/components/PageHeader";
import { useLoaderData } from "react-router";

export default function DetailsContactPage() {
  const { contact } = useLoaderData() as { contact: Contact };

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
          FormNode={<DetailsContact Contact={contact} />}
        />
      </div>
    </>
  );
}
