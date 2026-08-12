"use client";

import { useEffect, useState } from "react";
import NotificationWidget from "./notficationWidget";
import {
  getMessaging as gm,
  MessagePayload,
  onMessage,
} from "firebase/messaging";
import app, { GetMessaging } from "../fireabse";

export default function NotificationListner() {
  const [show, setShow] = useState(true);
  const [payload, setPayload] = useState<MessagePayload | null>(null);

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
