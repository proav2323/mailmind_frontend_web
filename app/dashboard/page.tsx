"use server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import StoreInitializer from "../components/storeIntializer";
import HOME from "../pages/home";
import { getUser } from "../page";

export default async function HomePage() {
  return (
    <div className='w-full h-full'>
      <HOME />
    </div>
  );
}
