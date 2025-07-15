import { z } from "zod";

export const passwordSchema = z
  .object({
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: "Minimum 6 characters",
      })
      .refine((val) => !val || /[a-z]/.test(val), {
        message: "At least 1 lowercase letter",
      })
      .refine((val) => !val || /[A-Z]/.test(val), {
        message: "At least 1 uppercase letter",
      })
      .refine((val) => !val || /[\W_]/.test(val), {
        message: "At least 1 symbol (!@#$)",
      }),

    confirm_password: z.string().optional(),
  })
  .refine(
    (data) =>
      (!data.password && !data.confirm_password) ||
      (data.password && data.password === data.confirm_password),
    {
      path: ["confirm_password"],
      message: "Passwords do not match",
    }
  );

export type PasswordForm = z.infer<typeof passwordSchema>;
