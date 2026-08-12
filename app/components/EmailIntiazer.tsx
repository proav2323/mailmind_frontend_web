"use client";

import { useEffect } from "react";
import { useUser } from "../states/user";
import { auth, getNewEmails } from "../actions";
import { GetMessaging } from "../fireabse";
import { useSidebar } from "../states/sidebar";

export default function EmailInitializer() {
  const { updateUser, updateLoading } = useUser();
  const { updateOpen } = useSidebar();
  useEffect(() => {
    updateLoading(true);
    GetMessaging().then((value) => {});

    getNewEmails().then((value) => {
      const check = JSON.parse(value);
      if (check.error === null) {
        auth("token").then(async (value) => {
          const data = JSON.parse(value);
          if (data.error === null) {
            updateUser(data.user);
            updateLoading(false);
          } else {
            updateLoading(false);
          }
        });
      } else {
        updateLoading(false);
      }
    });
  }, []);

  return null;
}
