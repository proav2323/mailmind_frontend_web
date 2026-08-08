import { MessagePayload } from "firebase/messaging";

export default function NotificationWidget({
  payload,
  show,
}: {
  payload: MessagePayload | null;
  show: boolean;
}) {
  return show && payload ? (
    <div className='z-50 absolute bottom-2 right-2 p-4 gap-2 flex flex-row w-fit h-fit bg-[var(--bg-secondary)] rounded-md shadow-md'>
      {payload.messageId}
    </div>
  ) : null;
}
