"use server";
import { redirect } from "next/navigation";
import StoreInitializer from "./components/storeIntializer";
import { USERS } from "./models/user";
import HOME from "./pages/home";
import { headers } from "next/headers";
import { auth, setYear } from "./actions";
import Selector from "./components/selectYear";

export default async function HomePage() {
  const res = await getUser();
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  if (res.value === null) {
    return redirect(`${protocol}://${host}/login`);
  }
  if (res.isYear === false && res.value !== null) {
    return (
      <div className='w-full min-h-screen flex flex-row justify-center items-center'>
        <Selector save={setYear} />
      </div>
    );
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

export async function getUser(): Promise<{
  status: string;
  message: string | null;
  value: USERS | null;
  isYear: boolean;
}> {
  const res = await auth("token");
  const data = await res.json();

  if (!res.ok || res.status === 500) {
    return {
      status: "error",
      value: null,
      message: data.error,
      isYear: false,
    };
  }

  const isYear = data.isYear;
  return {
    status: "success",
    message: null,
    value: data.user,
    isYear: isYear,
  };
}
