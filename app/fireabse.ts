import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  isSupported,
  Messaging,
  onRegistered,
  register,
} from "firebase/messaging";
import { getInstallations, getId } from "firebase/installations";
import { saveFids } from "./actions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Prevent duplicate initialization during hot reloads
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
let ID: string | null = null;
let msg: Messaging | null = null;

export const GetMessaging = async () => {
  if (
    typeof window !== undefined &&
    typeof process !== undefined &&
    msg === null &&
    (await isSupported())
  ) {
    requestPermission();
    msg = getMessaging(app);
    onRegistered(msg, (token) => {
      console.log(token);
      const installations = getInstallations(app);
      getId(installations).then((value) => {
        console.log(value);
        saveFids(value, token);
        ID = value;
      });
    });
    await register(msg, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    });

    return msg;
  }
  return msg;
};

export const GetInstalationsId = () => {
  return ID;
};

function requestPermission() {
  if (Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    });
  }
}

export default app;
