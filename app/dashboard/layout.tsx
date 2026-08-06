"use client";
import { Geist, Geist_Mono } from "next/font/google";
import EmailInitializer from "../components/EmailIntiazer";
import { useGlobalSocket } from "../components/SocketContext";
import { useEffect, useState } from "react";
import SyncToast from "../components/SyncingNewEmails";

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
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        {isLoading ? <SyncToast /> : null}
        {children}
        <EmailInitializer />
      </body>
    </html>
  );
}
