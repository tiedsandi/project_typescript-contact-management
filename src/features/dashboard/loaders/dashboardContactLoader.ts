import { getValidToken } from "@/utils/valid-token";
import { redirect } from "react-router";

export async function loader() {
  const token = getValidToken();

  if (!token) {
    throw redirect("/login");
  }

  return { token };
}
