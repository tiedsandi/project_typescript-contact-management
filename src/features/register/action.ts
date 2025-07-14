import { redirect, type ActionFunctionArgs } from "react-router";
import { registerSchema } from "./validation";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as Record<string, string>;

  const parseResult = registerSchema.safeParse(data);

  if (!parseResult.success) {
    const zodErrors = parseResult.error.flatten().fieldErrors;

    const errors: Record<string, string> = {};
    Object.entries(zodErrors).forEach(([field, messages]) => {
      if (messages?.[0]) errors[field] = messages[0];
    });

    return { errors, values: data };
  }

  // Data valid
  return redirect("/");
}
