import Button from "@/components/UI/Button.component";
import type { Contact } from "@/types";
import Modal from "@/components/UI/Modal.component";

type ContactDeleteModalProps = {
  contact: Contact;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ContactDeleteModal({
  contact,
  isDeleting,
  onCancel,
  onConfirm,
}: ContactDeleteModalProps) {
  return (
    <Modal onClose={onCancel}>
      <div className="text-center">
        <i className="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4" />
        <h2 className="text-xl font-bold mb-2 text-white">Delete Contact?</h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete{" "}
          <strong>
            {contact.first_name} {contact.last_name}
          </strong>
          ? This action cannot be undone.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="secondary" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i> Deleting...
              </>
            ) : (
              <>
                <i className="fas fa-trash-alt mr-2"></i> Yes, Delete
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
