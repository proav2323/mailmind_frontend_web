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
  const [show, setShow] = useState(false);
  const [payload, setPayload] = useState<MessagePayload | null>(null);

  const msg = GetMessaging();

  onMessage(msg ? msg : gm(app), (payload) => {
    setPayload(payload);
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 7000);
  });

  useEffect(() => {}, []);

  return show ? <NotificationWidget payload={payload} show={show} /> : null;
}
