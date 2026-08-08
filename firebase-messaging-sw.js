import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";
import app from "./app/fireabse";

const messaging = getMessaging(app);
onBackgroundMessage(messaging, (payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./app/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
