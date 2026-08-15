"use client";

import { useEffect } from "react";
import { useUser } from "../states/user";
import { getNewEmails, getUserEmails } from "../actions";
import { GetMessaging } from "../fireabse";
import { useEmails } from "../states/emails";

export default function EmailInitializer() {
  const { updateLoading } = useUser();
  const emails = useEmails();
  useEffect(() => {
    updateLoading(true);
    emails.updateLoading(true);
    GetMessaging().then((value) => {});

    getNewEmails().then((value) => {
      const check = JSON.parse(value);
      if (check.error === null) {
        updateLoading(false);
      } else {
        updateLoading(false);
      }
    });

    getUserEmails().then((value) => {
      if (value.error === null) {
        emails.updateEmails(value.data ?? []);
      }
      emails.updateLoading(false);
    });
  }, []);

  return null;
}
