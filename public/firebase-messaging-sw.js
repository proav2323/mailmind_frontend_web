// import { getMessaging } from "firebase/messaging/sw";
// import { onBackgroundMessage } from "firebase/messaging/sw";
// import app from "../app/fireabse";
// import { initializeApp, getApps, getApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// };

// // Prevent duplicate initialization during hot reloads
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// export default app;

// const messaging = getMessaging(app);

// onBackgroundMessage(messaging, (payload) => {
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "./app/icon.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener("notificationclick", (event) => {
//   event.notification.close(); // Close the notification popup

//   // Define where the user should go when clicking the notification
//   const targetUrl = event.notification.data?.click_action || "/";

//   event.waitUntil(
//     clients
//       .matchAll({ type: "window", includeUncontrolled: true })
//       .then((windowClients) => {
//         // Check if the app tab is already open, if so focus it
//         for (let i = 0; i < windowClients.length; i++) {
//           const client = windowClients[i];
//           if (client.url === targetUrl && "focus" in client) {
//             return client.focus();
//           }
//         }
//         // If the tab isn't open, open a new window
//         if (clients.openWindow) {
//           return clients.openWindow(targetUrl);
//         }
//       }),
//   );
// });

// public/firebase-messaging-sw.js

// Import Firebase apps and messaging libraries using importScripts
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyB8U7EL3F0-ihhxVsCGm6sUm0iWEWjZyTQ",
  authDomain: "massive-vector-501914-a5.firebaseapp.com",
  projectId: "massive-vector-501914-a5",
  storageBucket: "massive-vector-501914-a5.firebasestorage.app",
  messagingSenderId: "954214301039",
  appId: "1:954214301039:web:49af42e5d81c15f5ecbc9a",
  measurementId: "G-KX6679E6EX"
});

// Retrieve an instance of Firebase Cloud Messaging
const messaging = firebase.messaging();
