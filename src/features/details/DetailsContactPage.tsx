import type { Address, Contact } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";

import AddressForm from "./components/AddressForm";
import AddressList from "./components/AddressList";
import Button from "@/components/UI/Button.component";
import DetailsContact from "./components/DetailsContact";
import FormCard from "@/components/FormCard";
import Modal from "@/components/UI/Modal.component";
import PageHeader from "@/components/PageHeader";
import { toast } from "sonner";

export default function DetailsContactPage() {
  const { contact, addresses, token } = useLoaderData() as {
    contact: Contact;
    addresses: Address[];
    token: string;
  };

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toastRef = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressList, setAddressList] = useState<Address[]>(addresses);

  useEffect(() => {
    const msg = searchParams.get("msg");

    if (msg === "contact-update-success" && !toastRef.current) {
      toastRef.current = true;
      toast.success("Update contact success!");
      navigate(`/dashboard/contacts/${contact.id}`, { replace: true });
    }
  }, [searchParams, contact.id, navigate]);

  const handleOpenCreate = () => {
    setSelectedAddress(null);
    setIsModalOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };

  return (
    <>
      <PageHeader
        backTo="/dashboard"
        backLabel="Back to Contacts"
        title="Details Contact"
        iconClass="fas fa-user"
      />
      <div className="max-w-3xl m-auto flex flex-col gap-12">
        <FormCard
          icon={<i className="fas fa-user text-white" />}
          title="Contact Info"
          FormNode={<DetailsContact contact={contact} token={token} />}
        />

        <div className="flex justify-end">
          <Button onClick={handleOpenCreate}>
            <i className="fas fa-plus mr-2" /> Create Address
          </Button>
        </div>

        <FormCard
          icon={<i className="fas fa-map-marker-alt text-white" />}
          title="Addresses"
          FormNode={
            <AddressList
              addresses={addressList}
              onEdit={handleEditAddress}
              contactId={contact.id}
              onUpdateList={setAddressList}
            />
          }
        />
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <AddressForm
            contactId={contact.id}
            initialData={selectedAddress}
            onSuccess={(newList: Address[]) => {
              setAddressList(newList);
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}
