"use client";

import { useEffect } from "react";
import { useUser } from "../states/user";
import { auth, getNewEmails, saveFids } from "../actions";
import { GetInstalationsId, GetMessaging } from "../fireabse";

export default function EmailInitializer() {
  const { updateUser, updateLoading } = useUser();
  useEffect(() => {
    updateLoading(true);
    const data = GetInstalationsId();
    GetMessaging();
    if (data !== null) {
      data
        .then((value) => {
          saveFids(value!).then((val) => {
            const data = JSON.parse(val);
            if (data.error === null) {
              console.log("fid saved");
            } else {
              console.log(data.error);
            }
          });
        })
        .catch((err) => {
          console.log("error in getting fid: " + err);
        });
    }

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
