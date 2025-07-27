import { Form, useActionData, useNavigation } from "react-router";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";

import Input from "@/components/UI/Input.component";
import { contactSchemaFactory, type ContactForm } from "../schema";
import { toast } from "sonner";
import FormActions from "./FormActions";

type FormContactProps = {
  defaultValues?: Partial<ContactForm>;
  isEditMode?: boolean;
};

export default function FormContact({
  defaultValues,
  isEditMode = false,
}: FormContactProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData = useActionData() as {
    errors?: Partial<Record<keyof ContactForm, string>>;
    values?: Partial<ContactForm>;
    formError?: string;
  };

  /**
   * Membuat memo untuk skema validasi form kontak menggunakan nilai email saat ini.
   * Skema hanya akan dibuat ulang jika nilai email dari `actionData` atau `defaultValues` berubah.
   * Ini memastikan logika validasi selalu sesuai dengan input email terbaru,
   * sekaligus menghindari perhitungan ulang yang tidak perlu pada render yang tidak terkait.
   *
   * @remarks
   * Menggunakan `contactSchemaFactory` untuk menghasilkan skema, dengan parameter email yang sudah di-resolve.
   *
   * @returns Skema validasi form kontak yang sudah di-memo.
   */
  const schema = useMemo(() => {
    const email = actionData?.values?.email || defaultValues?.email || "";
    return contactSchemaFactory(email);
  }, [actionData?.values?.email, defaultValues?.email]);

  const {
    register,
    setError,
    formState: { errors },
  } = useForm<z.input<ReturnType<typeof contactSchemaFactory>>>({
    resolver: zodResolver(schema),
    defaultValues: actionData?.values || defaultValues,
    mode: "all",
  });

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
    <Form method="post">
      <input
        type="hidden"
        name="original_email"
        value={defaultValues?.email ?? ""}
      />
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

      <FormActions isEditMode={isEditMode} isSubmitting={isSubmitting} />
    </Form>
  );
}
