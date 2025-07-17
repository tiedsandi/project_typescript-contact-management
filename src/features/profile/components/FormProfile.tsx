import Button from "@/components/UI/Button.component";
import Input from "@/components/UI/Input.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema, type ProfileForm } from "../schema/profileSchema";
import { getValidToken } from "@/utils/valid-token";
import { updateUser } from "@/lib/api-user";
import { redirect } from "react-router";
import { useState } from "react";
import { toast } from "sonner";

type value = {
  name?: string;
  username?: string;
};

export default function FormProfile(value: value) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const handleSubmitProfile = async (data: ProfileForm) => {
    const token = getValidToken();
    if (!token) {
      redirect("/login");
      return;
    }
    setIsSubmitting(true);
    try {
      await updateUser({ token, name: data.full_name });
      toast.success("Update profile successfully!");
    } catch {
      toast.error("Update profile failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitProfile)}>
      <Input
        label="UserName"
        placeholder="Enter your full name"
        disabled
        defaultValue={value.username}
        icon={<i className="fas fa-user text-gray-500"></i>}
      />

      <Input
        {...register("full_name")}
        label="Full Name"
        placeholder="Enter your full name"
        icon={<i className="fas fa-user text-gray-500"></i>}
        error={errors.full_name?.message}
        defaultValue={value.name}
      />

      <div className="mt-6">
        <Button
          variant="primary"
          type="submit"
          className="w-full h-12"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2" /> Updating...
            </>
          ) : (
            <>
              <i className="fas fa-save mr-2"></i> Update Profile
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
