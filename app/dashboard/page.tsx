"use server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import StoreInitializer from "../components/storeIntializer";
import HOME from "../pages/home";
import { getUser } from "../page";

export default async function HomePage() {
  const res = await getUser();
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  if (res.value === null) {
    return redirect(`${protocol}://${host}/login`);
  }
  if (res.value !== null && res.isYear === false) {
    return redirect(`${protocol}://${host}/`);
  }

  return (
    <div className='w-full h-full'>
      <StoreInitializer
        user={
          res.value === null
            ? JSON.parse(JSON.stringify({ error: "no-value" }))
            : JSON.parse(JSON.stringify(res.value))
        }
      />
      <HOME />
    </div>
  );
}
