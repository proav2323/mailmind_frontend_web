import { headers } from "next/headers";
import { getUser } from "../page";
import Login from "../pages/login";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const res = await getUser();
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  if (res.value !== null) {
    return redirect(`${protocol}://${host}/`);
  }
  return <Login></Login>;
}
