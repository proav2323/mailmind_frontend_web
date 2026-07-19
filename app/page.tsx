"use client";
import { useEffect, useState } from "react";
import { useUser } from "./states/user";
import { auth, SetUser } from "./services/auth/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useUser((state: any) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    auth()
      .then(async (value) => {
        if (!value.ok || value.status === 500) {
          const error = await value.text();
          console.log(error);
          setIsLoading(false);
          router.push("/login");
          return;
        }
        const user = await value.json();
        SetUser(user);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        router.push("/login");
      });
  }, [router]);

  return user !== null ? (
    <div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      {isLoading ? "loading" : user.name}
    </div>
  ) : (
    <div>loading</div>
  );
}
