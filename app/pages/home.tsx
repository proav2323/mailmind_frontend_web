"use client";

import { useRouter } from "next/navigation";
import Loader from "../components/loader";
import { useUser } from "../states/user";

export default function HOME() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  return isLoading === true || user === null ? (
    <div className='flex flex-col flex-1 items-center justify-center  font-sans min-h-screen'>
      <Loader />
    </div>
  ) : user !== null && isLoading === false ? (
    <div className='flex flex-col flex-1 items-center justify-center font-sans  w-full min-h-screen'>
      hello {user.name} 👋
    </div>
  ) : (
    <div>something went wrong</div>
  );
}
