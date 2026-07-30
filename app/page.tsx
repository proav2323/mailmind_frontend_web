"use server";
import { redirect } from "next/navigation";
import { USERS } from "./models/user";
import { headers } from "next/headers";
import { auth, getNewEmails, setYear } from "./actions";
import Selector from "./components/selectYear";

export default async function HomePage() {
  const res = await getUser();
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  if (res.value === null) {
    return redirect(`${protocol}://${host}/login`);
  }
  if (res.value !== null && res.isYear === true) {
    return redirect(`${protocol}://${host}/dashboard`);
  }

  return (
    <div className='w-full min-h-screen flex flex-row justify-center items-center'>
      <Selector save={setYear} />
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
  const data = JSON.parse(res);
  if (data.error !== null) {
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
