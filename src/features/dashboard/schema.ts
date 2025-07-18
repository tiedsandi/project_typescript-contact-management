import { checkEmailTaken } from "@/lib/api-contact";
import z from "zod";

export function contactSchemaFactory(originalEmail: string = "") {
  return z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().optional(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format")
      .refine(
        async (val) => {
          if (val === originalEmail) return true;
          const isTaken = await checkEmailTaken(val);
          return !isTaken;
        },
        {
          message: "Email already in use",
        }
      ),
    phone: z.preprocess(
      (val) => String(val ?? "").trim(),
      z
        .string()
        .min(1, "Phone number is required")
        .min(8, "Phone number too short")
        .max(15, "Phone number too long")
        .regex(/^\d+$/, "Phone must contain only numbers")
    ),
  });
}

export type ContactForm = z.infer<ReturnType<typeof contactSchemaFactory>>;

export type ContactFormRaw = {
  first_name: string;
  last_name?: string;
  email: string;
  phone: string;
};
