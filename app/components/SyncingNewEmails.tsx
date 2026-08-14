"use client";

import { useUser } from "../states/user";
import Loader from "./loader";

export default function SyncToast() {
  const { user } = useUser();
  return (
    <div
      className={`z-100 p-4 h-fit w-[80vw] md:w-[50vw] lg:w-[20vw] rounded-md bg-[var(--bg-secondary)] absolute top top-2 right-2 gap-2  transition-all ease-in-out flex flex-row justify-center items-center ${user !== null ? "flex" : "hidden"}`}
    >
      <div className='h-full'>
        <Loader />
      </div>
      <span className={`font-bold`}>Syncing new Emails</span>
    </div>
  );
}
