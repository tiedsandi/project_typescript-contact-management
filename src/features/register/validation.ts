import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    // .refine((val) => val !== "admin", {
    //   message: "Username is already used",
    // }),
    name: z.string().min(1, "Full name is required"),
    password: z
      .string()
      .min(6, "Minimum 6 characters")
      .regex(/[a-z]/, "At least 1 lowercase letter")
      .regex(/[A-Z]/, "At least 1 uppercase letter")
      .regex(/[\W_]/, "At least 1 symbol (!@#$)"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export type RegisterForm = z.infer<typeof registerSchema>;
