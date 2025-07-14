import { Form, Link, useActionData } from "react-router";

import Button from "@/components/UI/Button.component";
import Input from "@/components/UI/Input.component";
import type { RegisterForm } from "@/features/register/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function validatePassword(password: string) {
  return {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    symbol: /[\W_]/.test(password),
  };
}

export default function RegisterPage() {
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
    defaultValues: actionData?.values || {},
    mode: "onChange",
  });

  const password = watch("password") || "";
  // const confirmPassword = watch("confirm_password") || "";

  const passwordStatus = validatePassword(password);
  const passwordTouched = touchedFields.password;
  const confirmTouched = touchedFields.confirm_password;

  useEffect(() => {
    if (actionData?.errors) {
      Object.entries(actionData.errors).forEach(([field, message]) => {
        setError(field as keyof RegisterForm, { message });
      });
    }
  }, [actionData, setError]);

  useEffect(() => {
    if (confirmTouched) {
      trigger("confirm_password");
    }
  }, [password, confirmTouched, trigger]);

  useEffect(() => {
    if (passwordTouched) {
      trigger("password");
    }
  }, [password, passwordTouched, trigger]);

  return (
    <div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient rounded-full mb-4">
          <i className="fas fa-user-plus text-3xl text-white"></i>
        </div>
        <h1 className="text-3xl font-bold text-white">Contact Management</h1>
        <p className="text-gray-300 mt-2">Create a new account</p>
      </div>

      <Form method="post">
        <Input
          {...register("username", {
            required: "Username is required",
          })}
          name="username"
          label="Username"
          placeholder="Choose a username"
          icon={<i className="fas fa-user text-gray-500" />}
          error={errors.username?.message}
        />

        <Input
          {...register("name", {
            required: "Full name is required",
          })}
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          icon={<i className="fas fa-id-card text-gray-500" />}
          error={errors.name?.message}
        />

        <Input
          {...register("password", {
            required: "Password is required",
            validate: (value) => {
              const { length, lowercase, uppercase, symbol } =
                validatePassword(value);
              if (!length) return "Minimum 6 characters";
              if (!lowercase) return "At least 1 lowercase letter";
              if (!uppercase) return "At least 1 uppercase letter";
              if (!symbol) return "At least 1 symbol (!@#$)";
              return true;
            },
          })}
          name="password"
          label="Password"
          placeholder="Create a password"
          type="password"
          icon={<i className="fas fa-lock text-gray-500" />}
          error={errors.password?.message}
        />

        {password && (
          <ul className="text-xs text-gray-300 mb-2 ml-1 space-y-1">
            <li
              className={
                passwordStatus.length ? "text-green-400" : "text-red-400"
              }
            >
              {passwordStatus.length ? "✅" : "❌"} At least 6 characters
            </li>
            <li
              className={
                passwordStatus.uppercase ? "text-green-400" : "text-red-400"
              }
            >
              {passwordStatus.uppercase ? "✅" : "❌"} 1 uppercase letter
            </li>
            <li
              className={
                passwordStatus.lowercase ? "text-green-400" : "text-red-400"
              }
            >
              {passwordStatus.lowercase ? "✅" : "❌"} 1 lowercase letter
            </li>
            <li
              className={
                passwordStatus.symbol ? "text-green-400" : "text-red-400"
              }
            >
              {passwordStatus.symbol ? "✅" : "❌"} 1 symbol (!@#$...)
            </li>
          </ul>
        )}

        <Input
          {...register("confirm_password", {
            validate: (value) => {
              if (!value) return "Please confirm your password";
              if (value !== password) return "Passwords do not match";
              return true;
            },
          })}
          name="confirm_password"
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
          icon={<i className="fas fa-check-double text-gray-500" />}
          error={errors.confirm_password?.message}
        />

        <div className="mb-6">
          <Button type="submit" variant="primary" className="w-full">
            <i className="fas fa-user-plus mr-2"></i> Register
          </Button>
        </div>

        <div className="text-center text-sm text-gray-400">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 ml-1"
          >
            Sign in
          </Link>
        </div>
      </Form>
    </div>
  );
}
