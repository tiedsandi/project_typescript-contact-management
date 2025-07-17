import type { Contact, FilterValues } from "../types";
import { Link, useLoaderData } from "react-router";
import { useEffect, useState } from "react";

import Button from "@/components/UI/Button.component";
import ContactCardWrapper from "../components/ContactCardWrapper";
import ContactInfoItem from "../components/ContactInfoItem";
import Filter from "../components/Filter";
import LoadingScreen from "@/components/LoadingScreen";
import { searchContacts } from "@/lib/api-contact";

export default function DashboardPage() {
  const { token } = useLoaderData() as { token: string };
  const [filters, setFilters] = useState<FilterValues>({
    name: "",
    email: "",
    phone: "",
  });
  const [page, setPage] = useState(1);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContacts = async () => {
      // setIsLoading(true);
      try {
        const result = await searchContacts(token, {
          page,
          ...filters,
        });
        setContacts(result.data || []);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [filters, page, token]);

  return (
    <>
      <div className="flex items-center mb-6">
        <i className="fas fa-users text-blue-400 text-2xl mr-3"></i>
        <h1 className="text-2xl font-bold text-white">My Contacts</h1>
      </div>

      <Filter filters={filters} setFilters={setFilters} />
      {isLoading ? (
        <LoadingScreen height="400px" size={48}>
          Loading contacts...
        </LoadingScreen>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ContactCardWrapper className="border-2 border-dashed">
            <Link to="/dashboard/contacts/create" className="block p-6 h-full">
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                  <i className="fas fa-user-plus text-3xl text-white"></i>
                </div>
                <h2 className="text-xl font-semibold text-white mb-3">
                  Create New Contact
                </h2>
                <p className="text-gray-300">Add a new contact to your list</p>
              </div>
            </Link>
          </ContactCardWrapper>

          {Array.isArray(contacts) &&
            contacts.length > 0 &&
            contacts.map((contact) => (
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
                      <ContactInfoItem
                        icon="fas fa-user-tag"
                        label="Last Name"
                        value={contact.last_name}
                      />
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

                    <Button
                      // onClick={() => handleContactDelete(contact.id)}
                      variant="danger"
                    >
                      <i className="fas fa-trash-alt mr-2"></i> Delete
                    </Button>
                  </div>
                </div>
              </ContactCardWrapper>
            ))}
        </div>
      )}

      {/* <Pagination
        getPages={getPages}
        handlePageChange={handlePageChange}
        page={page}
        totalPage={totalPage}
      /> */}
    </>
  );
}
