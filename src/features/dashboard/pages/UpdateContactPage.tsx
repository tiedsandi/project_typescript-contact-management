import type { ContactForm } from "../schema";
import FormCard from "@/components/FormCard";
import FormContact from "../components/FormContact";
import PageHeader from "../components/PageHeader";
import { useLoaderData } from "react-router";

export default function UpdateContactPage() {
  const { contact } = useLoaderData() as { contact: ContactForm };

  return (
    <>
      <PageHeader
        backTo="/dashboard"
        backLabel="Back to Contacts"
        title="Edit Contact"
        iconClass="fas fa-user-edit"
      />
      <div className="max-w-2xl mx-auto">
        <FormCard
          icon={<i className="fas fa-user-edit text-white" />}
          title="Edit Contact Information"
          FormNode={<FormContact defaultValues={contact} isEditMode />}
        />
      </div>
    </>
  );
}
