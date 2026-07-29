"use client";

import { useEffect } from "react";
import { useUser } from "../states/user";
import { auth, getNewEmails } from "../actions";

export default function EmailInitializer() {
  const { updateUser } = useUser();
  useEffect(() => {
    getNewEmails().then((value) => {
      const check = JSON.parse(value);
      if (check.error === null) {
        auth("token").then(async (value) => {
          const data = JSON.parse(value);
          if (data.error === null) {
            updateUser(data.user);
          }
        });
      }
    });
  }, []);

  return null;
}
