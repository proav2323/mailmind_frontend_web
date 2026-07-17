"use client";

import { SessionProvider } from "next-auth/react";
import Login from "../pages/login";

export default function LoginPage() {
  return (
    <SessionProvider>
      <Login></Login>
    </SessionProvider>
  );
}
