"use client";

import { USERS } from "../models/user";
import { useUser } from "../states/user";

export default function StoreInitializer({
  user,
}: {
  user: USERS | { error: string };
}) {
  const { updateUser } = useUser();

  if ("error" in user) {
    updateUser(null);
  } else {
    updateUser(user);
  }

  return null;
}
