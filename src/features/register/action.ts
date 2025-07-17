import { redirect, type ActionFunctionArgs } from "react-router";
import { registerSchema } from "./validation";
import { registerUser } from "@/lib/api-user";

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

  try {
    await registerUser({
      username: data.username,
      password: data.password,
      name: data.name,
    });

    return redirect("/login?msg=register-success");
  } catch (error) {
    return {
      errors: {
        username: error instanceof Error ? error.message : "Unknown error",
      },
      values: data,
    };
  }
}
