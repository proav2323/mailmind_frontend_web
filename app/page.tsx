import { redirect } from "next/navigation";
import StoreInitializer from "./components/storeIntializer";
import { USERS } from "./models/user";
import HOME from "./pages/home";
import { headers } from "next/headers";

export default async function HomePage() {
  const res = await getUser();
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  if (res.value === null) {
    return redirect(`${protocol}://${host}/login`);
  }

  return (
    <>
      <StoreInitializer
        user={
          res.value === null
            ? JSON.parse(JSON.stringify({ error: "no-value" }))
            : JSON.parse(JSON.stringify(res.value))
        }
      />
      <HOME />
    </>
  );
}

export async function getUser(): Promise<{
  status: string;
  message: string | null;
  value: USERS | null;
}> {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/auth`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok || res.status === 500) {
    const error = await res.json();
    console.log(error.error, "this si error");
    return { status: "error occured", message: error.error, value: null };
  }
  const user = await res.json();
  return { status: "success", message: null, value: user };
}
