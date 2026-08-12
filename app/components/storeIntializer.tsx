"use client";

import { useEffect, useState } from "react";
import { USERS } from "../models/user";
import { useUser } from "../states/user";
import { useGlobalSocket } from "./SocketContext";
import { useSidebar } from "../states/sidebar";

export default function StoreInitializer({
  user,
  token,
}: {
  user: USERS | { error: string };
  token: string | null;
}) {
  const { updateUser, updateToken } = useUser();
  const { connectSocket } = useGlobalSocket();
  const { updateOpen } = useSidebar();

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      updateOpen(
        localStorage.getItem("open")
          ? JSON.parse(localStorage.getItem("open")!)
          : true,
      );
    }
    if ("error" in user) {
      updateUser(null);
    } else {
      updateUser(user);
      updateToken(token);
      connectSocket(token!);
      console.log("socket connected");
    }
  }, []);

  return null;
}
