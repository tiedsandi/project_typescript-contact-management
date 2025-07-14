import { Form, useActionData, useNavigation } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/UI/Button.component";
import Input from "@/components/UI/Input.component";
import { registerSchema, type RegisterForm } from "../validation";
import { PasswordChecklist } from "./PasswordChecklist";

export default function RegisterForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData = useActionData() as {
    errors?: Partial<Record<keyof RegisterForm, string>>;
    values?: Partial<RegisterForm>;
  };

  const {
    register,
    watch,
    setError,
    trigger,
    formState: { errors, touchedFields },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: actionData?.values || {},
    mode: "onChange",
  });

  const password = watch("password") || "";
  const passwordTouched = touchedFields.password;
  const confirmTouched = touchedFields.confirm_password;

  const passwordStatus = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    symbol: /[\W_]/.test(password),
  };

  useEffect(() => {
    if (actionData?.errors) {
      Object.entries(actionData.errors).forEach(([field, message]) => {
        setError(field as keyof RegisterForm, { message });
      });
    }
  }, [actionData, setError]);

  useEffect(() => {
    if (confirmTouched) trigger("confirm_password");
  }, [password, confirmTouched, trigger]);

  useEffect(() => {
    if (passwordTouched) trigger("password");
  }, [password, passwordTouched, trigger]);

  return (
    <Form method="post">
      <Input
        {...register("username")}
        name="username"
        label="Username"
        placeholder="Choose a username"
        icon={<i className="fas fa-user text-gray-500" />}
        error={errors.username?.message}
      />
      <Input
        {...register("name")}
        name="name"
        label="Full Name"
        placeholder="Enter your full name"
        icon={<i className="fas fa-id-card text-gray-500" />}
        error={errors.name?.message}
      />
      <Input
        {...register("password")}
        name="password"
        label="Password"
        placeholder="Create a password"
        type="password"
        icon={<i className="fas fa-lock text-gray-500" />}
        error={errors.password?.message}
      />
      {password && <PasswordChecklist status={passwordStatus} />}
      <Input
        {...register("confirm_password")}
        name="confirm_password"
        label="Confirm Password"
        placeholder="Confirm your password"
        type="password"
        icon={<i className="fas fa-check-double text-gray-500" />}
        error={errors.confirm_password?.message}
      />

      <div className="mb-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2" /> Registering...
            </>
          ) : (
            <>
              <i className="fas fa-user-plus mr-2" /> Register
            </>
          )}
        </Button>
      </div>
    </Form>
  );
}
