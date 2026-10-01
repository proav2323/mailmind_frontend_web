"use client";

import { useRouter } from "next/navigation";
import Loader from "../components/loader";
import { useUser } from "../states/user";
import { useGlobalSocket } from "../components/SocketContext";
import { useEffect } from "react";
import { EMAILS } from "../models/emails";
import Card from "../components/card";
import EmailCard from "../components/EmailCard";

export default function HOME({
  data,
}: {
  data: {
    todaysEmail: EMAILS[];
    emailsDueThisWeek: {
      id: string;
      subject: string;
      deadline: Date;
      priority: string;
    }[];
    highPriorityEmails: {
      id: string;
      subject: string;
      deadline: Date;
      priority: string;
    }[];
  };
}) {
  const { user, isLoading, token } = useUser();
  const router = useRouter();
  const { todaysEmail, emailsDueThisWeek, highPriorityEmails } = data;

  return isLoading === true || user === null ? (
    <div className="flex flex-col flex-1 items-center justify-center  font-sans min-h-screen">
      <Loader />
    </div>
  ) : user !== null && isLoading === false ? (
    <div className="flex flex-col flex-1 items-center justify-center w-full mt-2">
      <div className="flex flex-col flex-1 items-center justify-center font-sans w-[97%]">
        <div className="w-full active rounded-lg text-lg p-4 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 bg-[var(--card)] border border-[var(--border)]">
          <Card
            number={todaysEmail.length}
            text="Today's Emails"
            border={true}
          />
          <Card
            number={emailsDueThisWeek.length}
            text="Due This Week"
            border={true}
          />
          <Card
            number={highPriorityEmails.length}
            text="High Priority Emails"
            border={true}
          />
          <Card
            number={highPriorityEmails.length}
            text="High Priority Emails"
            border={false}
          />
        </div>
        <div className="mt-2 w-full flex flex-row gap-2 justify-start items-start">
          {todaysEmail.length > 0 ? (
            <div className="flex flex-col gap-2">
              {todaysEmail.map((email) => {
                return <EmailCard email={email} key={email.id} />;
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    <div>something went wrong</div>
  );
}
