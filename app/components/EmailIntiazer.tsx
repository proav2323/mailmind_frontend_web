"use client";

import { useEffect } from "react";
import { useUser } from "../states/user";
import { getNewEmails } from "../actions";
import { GetMessaging } from "../fireabse";

export default function EmailInitializer() {
  const { updateLoading } = useUser();
  useEffect(() => {
    updateLoading(true);
    GetMessaging().then((value) => {});

    getNewEmails().then((value) => {
      const check = JSON.parse(value);
      if (check.error === null) {
        updateLoading(false);
      } else {
        updateLoading(false);
      }
    });
  }, []);

  return null;
}
