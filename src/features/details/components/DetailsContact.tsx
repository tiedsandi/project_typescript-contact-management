import { Form, useActionData, useNavigate, useNavigation } from "react-router";

import type { Contact } from "@/types";
import ContactDeleteModal from "@/components/ContactDeleteModal";
import Input from "@/components/UI/Input.component";
import {
  contactSchemaFactory,
  type ContactForm,
} from "@/features/dashboard/schema";
import { deleteContact } from "@/lib/api-contact";
import { toast } from "sonner";
import { useDeleteHandle } from "@/hooks/useDeleteHandle";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import Button from "@/components/UI/Button.component";

import { useState } from "react";
import isEqual from "lodash.isequal";

type DetailsContactProps = {
  contact: Contact;
  token: string;
};

export default function DetailsContact({
  contact,
  token,
}: DetailsContactProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isChanged, setIsChanged] = useState(false);

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

  const actionData = useActionData() as {
    errors?: Partial<Record<keyof ContactForm, string>>;
    values?: Partial<ContactForm>;
    formError?: string;
  };

  const schema = useMemo(() => {
    const email = actionData?.values?.email || contact?.email || "";
    return contactSchemaFactory(email);
  }, [actionData?.values?.email, contact?.email]);

  const {
    register,
    setError,
    watch,
    formState: { errors },
  } = useForm<z.input<ReturnType<typeof contactSchemaFactory>>>({
    resolver: zodResolver(schema),
    defaultValues: actionData?.values || contact,
    mode: "all",
  });

  const watchedValues = watch();

  useEffect(() => {
    const currentValues = {
      first_name: watchedValues.first_name,
      last_name: watchedValues.last_name,
      email: watchedValues.email,
      phone: watchedValues.phone,
    };

    const initialValues = {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    };

    setIsChanged(!isEqual(currentValues, initialValues));
  }, [watchedValues, contact]);

  useEffect(() => {
    if (actionData?.formError) {
      toast.error(actionData.formError);
    }
    if (actionData?.errors) {
      for (const [field, message] of Object.entries(actionData.errors)) {
        setError(field as keyof ContactForm, { message });
      }
    }
  }, [actionData, setError]);

  return (
    <>
      <div className="space-y-4">
        <Form method="post">
          <input type="hidden" name="original_email" value={contact?.email} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              {...register("first_name")}
              name="first_name"
              label="First Name"
              placeholder="Enter first name"
              icon={<i className="fas fa-user-tag text-gray-500"></i>}
              error={errors.first_name?.message}
            />
            <Input
              {...register("last_name")}
              name="last_name"
              label="Last Name"
              placeholder="Enter last name"
              icon={<i className="fas fa-user-tag text-gray-500"></i>}
              error={errors.last_name?.message}
            />
          </div>

          <Input
            {...register("email")}
            name="email"
            label="Email"
            placeholder="Enter email"
            icon={<i className="fas fa-envelope text-gray-500"></i>}
            error={errors.email?.message}
          />

          <Input
            {...register("phone")}
            name="phone"
            label="Phone"
            placeholder="Enter phone number"
            icon={<i className="fas fa-phone text-gray-500"></i>}
            error={errors.phone?.message}
            type="number"
          />

          <div className="flex justify-end space-x-4 mt-6">
            <Button type="submit" disabled={isSubmitting || !isChanged}>
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <i className={`fas fa-edit mr-2`} />
                  Update
                </>
              )}
            </Button>
            <Button
              type="button"
              onClick={() => setItemToDelete(contact)}
              disabled={isDeleting}
              variant="danger"
            >
              <i className="fas fa-trash mr-2" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </Form>
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
