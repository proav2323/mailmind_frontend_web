"use client";

import { useEffect } from "react";
import { useUser } from "../states/user";
import { getNewEmails, getUserEmails } from "../actions";
import { GetMessaging } from "../fireabse";
import { useEmails } from "../states/emails";
import { usePathname, useRouter } from "next/navigation";

export default function EmailInitializer() {
  const { updateLoading } = useUser();
  const emails = useEmails();
  const router = useRouter();
  const pathname = usePathname();
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

    if (!pathname.startsWith("/dashboard/inbox")) {
      console.log("email getting working", pathname);
      emails.updateLoading(true);
      getUserEmails(undefined).then((value) => {
        if (value.error === null) {
          emails.updateEmails(
            value.data.emails.length >= 1 ? value.data.emails : [],
            false,
          );
        }
        emails.updateLoading(false);
      });
    }
  }, []);

  return null;
}
