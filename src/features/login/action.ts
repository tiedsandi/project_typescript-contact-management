import { redirect, type ActionFunctionArgs } from "react-router";
import { loginUser } from "@/lib/api-user";
import z from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const raw = Object.fromEntries(formData);

  const result = loginSchema.safeParse(raw);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    return {
      errors: fieldErrors,
      values: raw,
    };
  }

  const { username, password } = result.data;

  try {
    const res = await loginUser({
      username,
      password,
    });

    const expiresIn = 24 * 60 * 60 * 1000; // 24 jam dalam ms
    const expiryTime = Date.now() + expiresIn;

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("token_expiry", expiryTime.toString());

    return redirect(`/dashboard`);
  } catch (error) {
    return {
      errors: {
        username: error instanceof Error ? error.message : "Unknown error",
      },
      values: { username },
    };
  }
}
