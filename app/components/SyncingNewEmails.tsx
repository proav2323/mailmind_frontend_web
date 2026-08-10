"use client";

import { useUser } from "../states/user";
import Loader from "./loader";

export default function SyncToast() {
  const { user } = useUser();
  return (
    <div
      className={`p-4 h-fit w-[20vw] rounded-md bg-[var(--bg-secondary)] absolute top-2 right-2 gap-2 flex flex-row justify-center items-center animate-bounce transition ease-in-out ${user !== null ? "opacity-100" : "opacity-0"}`}
    >
      <div className='h-full'>
        <Loader />
      </div>
      <span className={`font-bold`}>Syncing new Emails</span>
    </div>
  );
}
