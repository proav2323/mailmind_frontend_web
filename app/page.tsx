import { redirect } from "next/navigation";
import StoreInitializer from "./components/storeIntializer";
import { USERS } from "./models/user";
import HOME from "./pages/home";
import { headers } from "next/headers";
import { auth } from "./actions";

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
  const res = await auth("token");
  const data = await res.json();

  if (!res.ok || res.status === 500) {
    return { status: "error", value: null, message: data.error };
  }

  return { status: "success", message: null, value: data };
}
