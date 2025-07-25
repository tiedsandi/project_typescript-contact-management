import type { Contact, FilterValues } from "../types";
import { deleteContact, searchContacts } from "@/lib/api-contact";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";

import ContactDeleteModal from "../../../components/ContactDeleteModal";
import ContactListItem from "../components/ContactListItem";
import CreateContactCard from "../components/CreateContactCard";
import Filter from "../components/Filter";
import LoadingScreen from "@/components/LoadingScreen";
import Pagination from "../components/Pagination";
import { toast } from "sonner";
import { useDeleteHandle } from "@/hooks/useDeleteHandle";

export default function DashboardPage() {
  const { token } = useLoaderData() as { token: string };
  const [filters, setFilters] = useState<FilterValues>({
    name: "",
    email: "",
    phone: "",
  });

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toastRef = useRef(false);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await searchContacts(token, {
        page,
        ...filters,
      });
      setContacts(result.data || []);
      setTotalPage(result.paging.total_page || 1);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token, page, filters]);

  const {
    itemToDelete: contactToDelete,
    setItemToDelete: setContactToDelete,
    isDeleting,
    confirmDelete: handleDeleteConfirm,
  } = useDeleteHandle<Contact>({
    onDelete: async (contact) => {
      await deleteContact(token, contact.id);
      toast.success("Contact deleted successfully");
    },
    onAfterDelete: fetchContacts,
  });

  useEffect(() => {
    const msg = searchParams.get("msg");

    if (msg === "contact-success" && !toastRef.current) {
      toastRef.current = true;
      toast.success("Create contact success!");
      navigate("/dashboard", { replace: true });
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPages = () => {
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPage, page + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CreateContactCard />
            {contacts.map((contact) => (
              <ContactListItem
                key={contact.id}
                contact={contact}
                onDelete={setContactToDelete}
              />
            ))}
          </div>

          <Pagination
            page={page}
            totalPage={totalPage}
            handlePageChange={handlePageChange}
            getPages={getPages}
          />
        </>
      )}

      {contactToDelete && (
        <ContactDeleteModal
          contact={contactToDelete}
          isDeleting={isDeleting}
          onCancel={() => setContactToDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
}
