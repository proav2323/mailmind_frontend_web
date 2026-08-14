"use client";

import { useRouter } from "next/navigation";
import { NOTIFICATONS } from "../models/notifications";

export default function NotificationUi({
  notifications,
  closeNot,
}: {
  notifications: NOTIFICATONS[];
  closeNot: () => void;
}) {
  const router = useRouter();
  function clickNot(not: NOTIFICATONS) {
    closeNot();
    if (not.data) {
      router.push(`/dashboard/email/${not.data.gmailId}`);
    } else {
    }
  }
  return notifications
    .sort(
      (a, b) =>
        new Date(b.scheduledTime).getTime() -
        new Date(a.scheduledTime).getTime(),
    )
    .map((notification, idx) => {
      return (
        <div
          key={idx}
          onClick={() => clickNot(notification)}
          className='p-2 w-full h-fit flex flex-col cursor-pointer'
        >
          <span
            className={`text-md ${notification.seen ? "font-normal" : "font-bold"}`}
          >
            {notification.title}
          </span>
          <span
            className={`text-sm text-[var(--text-secondary)] ${notification.seen ? "font-normal" : "ont-bold"}`}
          >
            {notification.body.length > 25
              ? notification.body.slice(0, 25) + "..."
              : notification.body}
          </span>
          <div className='h-[1] w-full bg-[var(--border)]'></div>
        </div>
      );
    });
}
