import { Geist, Geist_Mono } from "next/font/google";
import EmailInitializer from "../components/EmailIntiazer";

import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import StoreInitializer from "../components/storeIntializer";
import { getUser } from "../page";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <div className='min-h-full flex flex-col'>
      <div className='flex flex-row justify-between w-full items-start h-full shrink-0'>
        <Sidebar />
        <div className='flex-1 min-w-0 p-0 m-0 pl-0 pr-0 pt-0 pb-0'>
          <Navbar />
          {children}
        </div>
      </div>
      <EmailInitializer />
      <StoreInitializer
        user={
          res.value === null
            ? JSON.parse(JSON.stringify({ error: "no-value" }))
            : JSON.parse(JSON.stringify(res.value))
        }
        token={res.token}
      />
    </div>
  );
}
