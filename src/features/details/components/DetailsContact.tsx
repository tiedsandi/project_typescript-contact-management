import { Link, useNavigate } from "react-router";

import type { Contact } from "../types";
import ContactDeleteModal from "@/components/ContactDeleteModal";
import { deleteContact } from "@/lib/api-contact";
import { toast } from "sonner";
import { useDeleteHandle } from "@/hooks/useDeleteHandle";

type DetailsContactProps = {
  contact: Contact;
  token: string;
};

export default function DetailsContact({
  contact,
  token,
}: DetailsContactProps) {
  const navigate = useNavigate();

  const { itemToDelete, setItemToDelete, isDeleting, confirmDelete } =
    useDeleteHandle<Contact>({
      onDelete: async (contact) => {
        await deleteContact(token, contact.id);
        toast.success("Contact deleted successfully");
      },
      onAfterDelete: () => {
        navigate("/dashboard");
      },
    });

  return (
    <>
      <div className="space-y-4">
        <div>
          <h3 className="text-gray-400 text-sm">Name</h3>
          <p className="text-white text-xl font-bold">
            {contact.first_name} {contact.last_name}
          </p>
        </div>
        <div>
          <h3 className="text-gray-400 text-sm">Email</h3>
          <p className="text-white">{contact.email}</p>
        </div>
        <div>
          <h3 className="text-gray-400 text-sm">Phone</h3>
          <p className="text-white">{contact.phone}</p>
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <Link
            to={`/dashboard/contacts/${contact.id}/edit`}
            className="px-5 py-2 bg-gradient text-white rounded-lg hover:opacity-90 transition"
          >
            <i className="fas fa-pen mr-2" /> Edit
          </Link>
          <button
            onClick={() => setItemToDelete(contact)}
            disabled={isDeleting}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition disabled:opacity-50"
          >
            <i className="fas fa-trash mr-2" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {itemToDelete && (
        <ContactDeleteModal
          contact={itemToDelete}
          isDeleting={isDeleting}
          onCancel={() => setItemToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
