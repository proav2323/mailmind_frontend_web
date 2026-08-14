"use client";

import { MessagePayload } from "firebase/messaging";
import { useRouter } from "next/navigation";

export default function NotificationWidget({
  payload,
  show,
  setShow,
}: {
  payload: MessagePayload | null;
  show: boolean;
  setShow: () => void;
}) {
  const router = useRouter();
  const redirectUser = () => {
    if (payload && payload.data) {
      router.push(`dashboard/email/${payload.data.gmailId}`);
    }
  };
  return show && payload ? (
    <div className='z-50 absolute bottom-2 right-2 p-4 gap-2 flex flex-row w-fit h-fit bg-[var(--bg-secondary)] rounded-md shadow-md         slide justify-between items-center cursor-pointer'>
      <div
        className='flex flex-col w-full gap-2 p-2 cursor-pointer'
        onClick={redirectUser}
      >
        <span className='text-lg font-bold text-[var(--text-primary)]'>
          {payload.notification
            ? (payload.notification.title ?? "new email")
            : "new email"}
        </span>
        <span className='text-sm font-bold text-[var(--text-muted)]'>
          {payload.notification
            ? payload.notification.body
              ? payload.notification.body.length >= 25
                ? payload.notification.body.slice(0, 25) + "..."
                : payload.notification.body.length
              : "new email"
            : "you got new email processed by our ai"}
        </span>
      </div>
      <div className=''>
        <button
          onClick={() => setShow()}
          className='p-2 rounded-md bg-[var(--bg-card)] text-[var(--text-primary)] cursor-pointer flex justify-center items-center text-sm'
        >
          X
        </button>
      </div>
    </div>
  ) : null;
}
