"use client";

import { useEffect, useState } from "react";
import { USERS } from "../models/user";
import { useUser } from "../states/user";
import { useGlobalSocket } from "./SocketContext";
import { useSidebar } from "../states/sidebar";
import { useTheme } from "../states/theme";
import { useNotifications } from "../states/notifications";
import { getUserCategories, getUserNotifications } from "../actions";
import { useCategories } from "../states/categories";

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
  const { updateTheme } = useTheme();
  const { updateLoading, updateNotifications, notifications, isLoading } =
    useNotifications();
  const categories = useCategories();

  function getNotifications() {
    updateLoading(true);
    getUserNotifications().then((value) => {
      if (value.error === null) {
        updateLoading(false);
        updateNotifications(value.data!);
      } else {
        updateLoading(false);
        updateNotifications([]);
      }
    });
  }

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      updateOpen(
        localStorage.getItem("open")
          ? JSON.parse(localStorage.getItem("open")!)
          : true,
      );
      updateTheme(
        localStorage.getItem("theme")
          ? (localStorage.getItem("theme")! as "dark" | "light")
          : "dark",
      );
    }
    if ("error" in user) {
      updateUser(null);
    } else {
      updateUser(user);
      updateToken(token);
      connectSocket(token!);
      getNotifications();
      categories.updateLoading(true);
      getUserCategories().then((value) => {
        if (value.error === null) {
          categories.updateCategories(value.data ?? []);
        }
        categories.updateLoading(false);
      });
      console.log("socket connected");
    }
  }, []);

  return null;
}
