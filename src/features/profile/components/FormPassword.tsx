import Button from "@/components/UI/Button.component";
import Input from "@/components/UI/Input.component";
import { PasswordChecklist } from "@/features/register/components/PasswordChecklist";
import { passwordSchema, type PasswordForm } from "../schema/passwordSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidToken } from "@/utils/valid-token";
import { redirect } from "react-router";
import { updateUser } from "@/lib/api";
import { useEffect, useState } from "react";

export default function FormPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const password = watch("password") || "";

  const passwordStatus = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    symbol: /[\W_]/.test(password),
  };

  useEffect(() => {
    if (!password) {
      clearErrors("password");
      clearErrors("confirm_password");
    }
  }, [password, clearErrors]);

  const onSubmit = async (data: PasswordForm) => {
    const token = getValidToken();
    if (!token) {
      redirect("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      await updateUser({ token, password: data.password });
      reset();
    } catch (err) {
      console.error("❌ Failed to update user:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("password")}
        label="New Password"
        type="password"
        placeholder="Enter your new password"
        icon={<i className="fas fa-lock text-gray-500"></i>}
        error={errors.password?.message}
      />

      {password && <PasswordChecklist status={passwordStatus} />}

      <Input
        {...register("confirm_password")}
        label="Confirm New Password"
        type="password"
        placeholder="Confirm your new password"
        icon={<i className="fas fa-check-double text-gray-500"></i>}
        error={errors.confirm_password?.message}
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
              <i className="fas fa-key mr-2" /> Update Password
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
