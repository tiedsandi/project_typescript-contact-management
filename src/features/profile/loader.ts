import { getUser } from "@/lib/api";
import { getValidToken } from "@/utils/valid-token";
import { redirect } from "react-router";

export async function loader() {
  const token = getValidToken();
  if (!token) throw redirect("/login");

  return await getUser(token);
}
