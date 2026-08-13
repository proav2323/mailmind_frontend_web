"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Toast from "./components/toast";
import { SocketProvider } from "./components/SocketContext";
import NotificationListner from "./components/notificationListener";
import { useTheme } from "./states/theme";
import { ThemeIntailzioer } from "./components/ThemeIntializer";

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
  const { theme } = useTheme();
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased ${theme === "dark" ? "dark" : "light"}`}
    >
      <body className='min-h-full flex flex-col'>
        <SocketProvider>
          {children}
          <Toast />
          <NotificationListner />
          <ThemeIntailzioer />
        </SocketProvider>
      </body>
    </html>
  );
}
