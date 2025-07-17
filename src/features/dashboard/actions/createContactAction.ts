import { type ActionFunctionArgs, redirect } from "react-router";
import { createContact } from "@/lib/api-contact";
import { getValidToken } from "@/utils/valid-token";
import { contactSchema } from "../schema";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as Record<string, string>;

  const parseResult = await contactSchema.safeParseAsync(data);

  if (!parseResult.success) {
    const zodErrors = parseResult.error.flatten().fieldErrors;
    const errors: Record<string, string> = {};
    for (const [field, message] of Object.entries(zodErrors)) {
      if (message?.[0]) errors[field] = message[0];
    }
    return { errors, values: data };
  }

  try {
    const token = getValidToken();
    if (!token) throw new Error("Unauthorized");

    await createContact(token, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: String(data.phone),
    });

    return redirect("/dashboard?msg=contact-success");
  } catch (error) {
    return {
      formError:
        error instanceof Error ? error.message : "Something went wrong",
      values: data,
    };
  }
}
