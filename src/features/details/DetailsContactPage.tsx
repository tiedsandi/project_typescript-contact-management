import { useEffect, useRef } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";

import type { Contact } from "@/types";
import DetailsContact from "./components/DetailsContact";
import FormCard from "@/components/FormCard";
import PageHeader from "@/components/PageHeader";
import { toast } from "sonner";

export default function DetailsContactPage() {
  const { contact, token } = useLoaderData() as {
    contact: Contact;
    token: string;
  };

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toastRef = useRef(false);

  useEffect(() => {
    const msg = searchParams.get("msg");

    if (msg === "contact-update-success" && !toastRef.current) {
      toastRef.current = true;
      toast.success("Update contact success!");
      navigate(`/dashboard/contacts/${contact.id}`, { replace: true });
    }
  }, [searchParams, contact.id, navigate]);
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
