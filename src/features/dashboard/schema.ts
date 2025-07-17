import { checkEmailTaken } from "@/lib/api-contact";
import z from "zod";

export const contactSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .refine(
      async (val) => {
        if (!val) return true;
        const isTaken = await checkEmailTaken(val);
        return !isTaken;
      },
      {
        message: "Email already in use",
      }
    ),
  phone: z.preprocess((val) => {
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().int().min(10000000, "Phone number too short").max(999999999999999, "Phone number too long")),
});

export type ContactForm = z.infer<typeof contactSchema>;

export type ContactFormRaw = {
  first_name: string;
  last_name?: string;
  email: string;
  phone: string; // as input from form
};
