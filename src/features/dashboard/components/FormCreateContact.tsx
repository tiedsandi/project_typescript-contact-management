import { Form, useActionData, useNavigation } from "react-router";

import Button from "@/components/UI/Button.component";
import Input from "@/components/UI/Input.component";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactForm } from "../schema";
import type z from "zod";

export default function FormCreateContact() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData = useActionData() as {
    errors?: Partial<Record<keyof ContactForm, string>>;
    values?: Partial<ContactForm>;
  };

  const {
    register,
    setError,
    formState: { errors },
  } = useForm<z.input<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: actionData?.values,
    mode: "all",
  });

  useEffect(() => {
    if (actionData?.errors) {
      for (const [field, message] of Object.entries(actionData.errors)) {
        setError(field as keyof ContactForm, { message });
      }
    }
  }, [actionData, setError]);

  return (
    <Form method="post">
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

      <div className="flex justify-end space-x-4">
        <Button to="/dashboard" variant="secondary">
          <i className="fas fa-times mr-2" /> Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2" />
              Creating...
            </>
          ) : (
            <>
              <i className="fas fa-plus-circle mr-2" /> Create Contact
            </>
          )}
        </Button>
      </div>
    </Form>
  );
}
