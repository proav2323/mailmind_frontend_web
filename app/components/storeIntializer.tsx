"use client";

import { useEffect, useState } from "react";
import { USERS } from "../models/user";
import { useUser } from "../states/user";

export default function StoreInitializer({
  user,
  token,
}: {
  user: USERS | { error: string };
  token: string | null;
}) {
  const { updateUser, updateToken } = useUser();

  useEffect(() => {
    if ("error" in user) {
      updateUser(null);
    } else {
      updateUser(user);
      updateToken(token);
    }
  }, []);

  return null;
}
