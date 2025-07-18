import FormCard from "@/components/FormCard";
import FormContact from "../components/FormContact";
import PageHeader from "../components/PageHeader";

export default function CreateContactPage() {
  return (
    <>
      <PageHeader
        backTo="/dashboard"
        backLabel="Back to Contacts"
        title="Create New Contact"
        iconClass="fas fa-user-plus"
      />

      <div className="max-w-2xl mx-auto">
        <FormCard
          bgIcon="bg-blue-500"
          icon={<i className="fas fa-user-plus text-white" />}
          title="New Contact Information"
          FormNode={<FormContact />}
        />
      </div>
    </>
  );
}
