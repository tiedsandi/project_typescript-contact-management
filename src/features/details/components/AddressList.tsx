import { deleteAddress, getAddressesByContact } from "@/lib/api-address";

import type { Address } from "@/types";
import Button from "@/components/UI/Button.component";
import ConfirmModal from "@/components/UI/ConfrimModal";
import Modal from "@/components/UI/Modal.component";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  addresses: Address[];
  onEdit: (address: Address) => void;
  contactId: number;
  onUpdateList: (data: Address[]) => void;
}

export default function AddressList({
  addresses,
  onEdit,
  contactId,
  onUpdateList,
}: Props) {
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await deleteAddress(contactId, id);
      const updated = await getAddressesByContact(contactId);
      onUpdateList(updated ?? []);
      toast.success("Address deleted successfully");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setConfirmId(null);
    }
  };

  if (!addresses || addresses.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        <i className="fas fa-map-marker-alt text-3xl mb-2" />
        <p>No addresses found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4  text-white">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="bg-gray-800 border border-gray-600 rounded-xl p-4 shadow flex flex-col justify-between gap-4"
        >
          <div className="space-y-1">
            <p className="text-lg font-medium">{address.street}</p>
            <p>
              {address.city}, {address.province}
            </p>
            <p>
              {address.country} - {address.postal_code}
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <Button className="w-full" onClick={() => onEdit(address)}>
              <i className="fas fa-edit mr-1" /> Edit
            </Button>
            <Button
              variant="danger"
              className="w-full"
              onClick={() => setConfirmId(address.id)}
            >
              <i className="fas fa-trash mr-1" /> Delete
            </Button>
          </div>
        </div>
      ))}

      {confirmId !== null && (
        <Modal onClose={() => setConfirmId(null)}>
          <ConfirmModal
            title="Delete Address?"
            description="This action cannot be undone."
            onCancel={() => setConfirmId(null)}
            onConfirm={() => handleDelete(confirmId!)}
          />
        </Modal>
      )}
    </div>
  );
}
