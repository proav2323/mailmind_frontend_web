"use client";

import { useEffect, useRef } from "react";
import { useNotifications } from "../states/notifications";
import { getUserNotifications, seenNotifications } from "../actions";
import Loader from "./loader";
import NotificationUi from "./notificationShower";

export default function NotificationShower({
  open,
  closeNot,
  parentDiv,
}: {
  open: boolean;
  closeNot: () => void;
  parentDiv: React.RefObject<HTMLDivElement | null>;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const { notifications, isLoading, updateLoading, updateNotifications } =
    useNotifications();

  useEffect(() => {
    if (notifications.filter((value) => value.seen !== true).length >= 1) {
      seenNotifications().then((value) => {
        if (value.error === null) {
          getUserNotifications().then((value) => {
            if (value.error === null) {
              updateNotifications(value.data!);
            } else {
              updateNotifications([]);
            }
          });
        }
      });
    }

    function handleClickOutside(event: MouseEvent) {
      // Close menu if click is outside the wrapper div
      if (
        divRef.current && // html div not null
        !divRef.current.contains(event.target as Node) && // dectcts if click is inside
        parentDiv &&
        !parentDiv.current!.contains(event.target as Node)
      ) {
        closeNot();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside); // mouse lcick event listerner

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className='w-[90vw] md:[50vw] lg:w-[30vw] h-[50vh] overflow-y-scroll bg-[var(--bg-secondary)] flex flex-col justify-start items-center absolute top-[55] right-[5] scrollbar-none rounded-md slide'
    >
      {isLoading ? (
        <Loader />
      ) : (
        <NotificationUi notifications={notifications} closeNot={closeNot} />
      )}
    </div>
  );
}
