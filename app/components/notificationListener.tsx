"use client";

import { useEffect, useState } from "react";
import NotificationWidget from "./notficationWidget";
import {
  getMessaging as gm,
  MessagePayload,
  onMessage,
} from "firebase/messaging";
import app, { GetMessaging } from "../fireabse";
import { getUserNotifications } from "../actions";
import { useNotifications } from "../states/notifications";

export default function NotificationListner() {
  const [show, setShow] = useState(true);
  const [payload, setPayload] = useState<MessagePayload | null>(null);
  const { updateNotifications } = useNotifications();

  const close = () => {
    console.log("closing");
    setShow(false);
  };

  const msg = GetMessaging();
  msg.then((value) => {
    onMessage(value ? value : gm(app), (payload) => {
      console.log(payload);
      setPayload(payload);
      setShow(true);

      getUserNotifications().then((value) => {
        if (value.error === null) {
          updateNotifications(value.data!);
        } else {
          updateNotifications([]);
        }
      });

      setTimeout(() => {
        setShow(false);
      }, 7000);
    });
  });

  useEffect(() => {}, []);

  return show ? (
    <NotificationWidget
      payload={payload}
      show={show}
      setShow={() => setShow(false)}
    />
  ) : null;
}
