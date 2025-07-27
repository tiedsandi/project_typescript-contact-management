import Button from "@/components/UI/Button.component";
import type { Contact } from "@/types";
import ContactCardWrapper from "./ContactCardWrapper";
import ContactInfoItem from "./ContactInfoItem";
import { Link } from "react-router";

type ContactListType = {
  contact: Contact;
  onDelete: (contact: Contact) => void;
};

export default function ContactListItem({
  contact,
  onDelete,
}: ContactListType) {
  return (
    <ContactCardWrapper key={contact.id}>
      <div className="p-6">
        <Link
          to={`/dashboard/contacts/${contact.id}`}
          className="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3"
        >
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
              <i className="fas fa-user text-white"></i>
            </div>
            <h2 className="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-200">
              {contact.first_name} {contact.last_name}
            </h2>
          </div>
          <div className="space-y-3 text-gray-300 ml-2">
            <ContactInfoItem
              icon="fas fa-user-tag"
              label="First Name"
              value={contact.first_name}
            />
            {contact.last_name && (
              <ContactInfoItem
                icon="fas fa-user-tag"
                label="Last Name"
                value={contact.last_name}
              />
            )}

            <ContactInfoItem
              icon="fas fa-envelope"
              label="Email"
              value={contact.email}
            />
            <ContactInfoItem
              icon="fas fa-phone"
              label="Phone"
              value={contact.phone}
            />
          </div>
        </Link>
        <div className="mt-4 flex justify-end space-x-3">
          <Button to={`/dashboard/contacts/${contact.id}/edit`}>
            <i className="fas fa-edit mr-2"></i> Edit
          </Button>

          <Button onClick={() => onDelete(contact)} variant="danger">
            <i className="fas fa-trash-alt mr-2"></i> Delete
          </Button>
        </div>
      </div>
    </ContactCardWrapper>
  );
}
