"use client";

import { useUser } from "../states/user";

export default function HOME() {
  const { user } = useUser();

  // return user !== null ? (
  //   <div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
  //     {user.name}
  //   </div>
  // ) : (
  //   <div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans'>
  //     loading
  //   </div>
  // );

  return <div>home page</div>;
}
