"use client";
import { Geist, Geist_Mono } from "next/font/google";
import EmailInitializer from "../components/EmailIntiazer";
import { useGlobalSocket } from "../components/SocketContext";
import { useEffect, useState } from "react";
import SyncToast from "../components/SyncingNewEmails";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const SOCKET = useGlobalSocket();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (SOCKET.isConnected && SOCKET.socket) {
      SOCKET.socket.on("emailLoading", () => {
        setIsLoading(true);
      });

      SOCKET.socket.on("newEmail", () => {
        setIsLoading(false);
      });
    }
  }, [SOCKET.isConnected, SOCKET.socket]);
  return (
    <div className='min-h-full flex flex-col'>
      {isLoading ? <SyncToast /> : null}
      <div className='flex flex-row justify-between w-full items-start h-full'>
        <Sidebar />
        <div className='w-full'>
          <Navbar />
          {children}
        </div>
      </div>
      <EmailInitializer />
    </div>
  );
}
