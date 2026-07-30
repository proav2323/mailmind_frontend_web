"use client";

import { useRouter } from "next/navigation";
import Loader from "../components/loader";
import { useUser } from "../states/user";

export default function HOME() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  return user !== null && isLoading === false ? (
    <div className='flex flex-col flex-1 items-center justify-center font-sans  w-full min-h-screen'>
      hello {user.name} 👋
    </div>
  ) : isLoading === true ? (
    <div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans'>
      <Loader />
    </div>
  ) : (
    <div>something went wrong</div>
  );
}
