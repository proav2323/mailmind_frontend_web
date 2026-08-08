import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";
import { getInstallations, getId } from "firebase/installations";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Prevent duplicate initialization during hot reloads
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
let ID: string | null = null;
let msg: Messaging | null = null;

export const GetMessaging = () => {
  if (typeof window !== undefined && msg === null) {
    msg = getMessaging(app);
    return msg;
  }
  return msg;
};

export const GetInstalationsId = async () => {
  if (typeof window !== undefined && ID === null) {
    const installations = getInstallations(app);
    ID = await getId(installations);
    return ID;
  }
  return ID;
};

export default app;
