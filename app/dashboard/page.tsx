"use server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import StoreInitializer from "../components/storeIntializer";
import HOME from "../pages/home";
import { getUser } from "../page";
import { getUserDashboard } from "../actions";
import { EMAILS } from "../models/emails";

export default async function HomePage() {
  const data = await getUserDashboard();
  if (data.error != null) {
    return (
      <div className="w-full min-h-screen text-center">
        Error occurred while fetching dashboard data.
      </div>
    );
  }
  return (
    <div className="w-full h-full">
      <HOME
        data={
          data.data as {
            todaysEmail: EMAILS[];
            emailsDueThisWeek: {
              id: string;
              subject: string;
              deadline: Date;
              priority: string;
            }[];
            highPriorityEmails: {
              id: string;
              subject: string;
              deadline: Date;
              priority: string;
            }[];
          }
        }
      />
    </div>
  );
}
