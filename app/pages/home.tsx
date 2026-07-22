"use client";

import Loader from "../components/loader";
import { useUser } from "../states/user";

export default function HOME() {
  const { user } = useUser();

  return user !== null ? (
    <div className='flex flex-col flex-1 items-center justify-center font-sans  w-full min-h-screen'>
      {user.name}
    </div>
  ) : (
    <div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans'>
      <Loader />
    </div>
  );
}
