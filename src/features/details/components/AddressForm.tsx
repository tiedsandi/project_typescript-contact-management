import {
  createAddress,
  getAddressesByContact,
  updateAddress,
} from "@/lib/api-address";

import type { Address } from "@/types";
import Button from "@/components/UI/Button.component";
import Input from "@/components/UI/Input.component";
import isEqual from "lodash.isequal";
import { toast } from "sonner";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  country: z.string().min(1, "Country is required"),
  postal_code: z.string().min(1, "Postal code is required"),
});

type AddressFormData = z.infer<typeof addressSchema>;

type Props = {
  contactId: number;
  initialData?: Address | null;
  onSuccess: (updated: Address[]) => void;
};

export default function AddressForm({
  contactId,
  initialData,
  onSuccess,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData ?? {
      street: "",
      city: "",
      province: "",
      country: "",
      postal_code: "",
    },
  });

  const currentValues = watch();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const isUnchanged = !!initialData && isEqual(initialData, currentValues);

  const onSubmit = async (data: AddressFormData) => {
    try {
      if (initialData) {
        await updateAddress(contactId, initialData.id, data);
        toast.success("Address updated");
      } else {
        await createAddress(contactId, data);
        toast.success("Address created");
      }

      const updatedList = await getAddressesByContact(contactId);
      onSuccess(updatedList);
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-white w-full max-w-md"
    >
      <h2 className="text-xl font-semibold">
        {initialData ? "Update Address" : "Create Address"}
      </h2>
      <Input
        label="Street"
        {...register("street")}
        error={errors.street?.message}
      />
      <Input label="City" {...register("city")} error={errors.city?.message} />
      <Input
        label="Province"
        {...register("province")}
        error={errors.province?.message}
      />
      <Input
        label="Country"
        {...register("country")}
        error={errors.country?.message}
      />
      <Input
        label="Postal Code"
        {...register("postal_code")}
        error={errors.postal_code?.message}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting || isUnchanged}
          className="min-w-[100px]"
        >
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
