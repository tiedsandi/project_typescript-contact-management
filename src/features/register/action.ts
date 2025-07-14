import { redirect, type ActionFunctionArgs } from "react-router";
import { fields, type RegisterForm } from "./types";
import { validateRegister } from "./validation";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(
    fields.map((f) => [f, formData.get(f)?.toString().trim() ?? ""])
  ) as RegisterForm;

  const errors = validateRegister(data);

  if (Object.keys(errors).length > 0) {
    return { errors, values: data };
  }

  return redirect("/");
}
