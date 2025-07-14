import type { RegisterForm } from "./types";

export function validateRegister(data: RegisterForm) {
  const errors: Partial<Record<keyof RegisterForm, string>> = {};

  if (!data.username) errors.username = "Username is required";
  else if (data.username === "admin")
    errors.username = "Username is already used";

  if (!data.name) errors.name = "Full name is required";

  if (!data.password) {
    errors.password = "Password is required";
  } else {
    if (data.password.length < 6) errors.password = "Minimum 6 characters";
    else if (!/[a-z]/.test(data.password))
      errors.password = "At least 1 lowercase letter";
    else if (!/[A-Z]/.test(data.password))
      errors.password = "At least 1 uppercase letter";
    else if (!/[\W_]/.test(data.password))
      errors.password = "At least 1 symbol (!@#$)";
  }

  if (!data.confirm_password) {
    errors.confirm_password = "Please confirm your password";
  } else if (data.password !== data.confirm_password) {
    errors.confirm_password = "Passwords do not match";
  }

  return errors;
}
