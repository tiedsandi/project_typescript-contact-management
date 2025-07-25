import { redirect, type ActionFunctionArgs } from "react-router";
import { getValidToken } from "@/utils/valid-token";
import { updateContact } from "@/lib/api-contact";
import { contactSchemaFactory } from "../schema";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as Record<string, string>;

  const originalEmail = data.original_email ?? "";
  const schema = contactSchemaFactory(originalEmail);
  const parseResult = await schema.safeParseAsync(data);

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

    const id = params.idContact;
    if (!id) throw new Error("Invalid contact ID");

    await updateContact(token, Number(id), {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: String(data.phone),
    });

    const referer = request.headers.get("referer");
    const redirectTo =
      new URL(referer || "").pathname + "?msg=contact-update-success";

    return redirect(redirectTo);
  } catch (error) {
    return {
      formError:
        error instanceof Error ? error.message : "Something went wrong",
      values: data,
    };
  }
}
