"use client";

import { useRouter } from "next/navigation";
import Loader from "../components/loader";
import { useUser } from "../states/user";
import { useGlobalSocket } from "../components/SocketContext";
import { useEffect, useState } from "react";
import { EMAILS } from "../models/emails";
import Card from "../components/card";
import EmailCard from "../components/EmailCard";
import DashboardEmailCard from "../components/DashboardEmailCard";

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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const emails = emailsDueThisWeek;
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
        <div className="mt-2 w-full flex flex-col lg:flex-row justify-start items-start">
          {todaysEmail.length > 0 ? (
            <div className="flex flex-col gap-2 flex-2 w-full">
              {todaysEmail.map((email) => {
                return (
                  <EmailCard
                    click={() => setSelectedId(email.gmailId)}
                    email={email}
                    key={email.id}
                    borderColor={
                      selectedId === email.gmailId
                        ? "border-[var(--primary)]"
                        : undefined
                    }
                  />
                );
              })}
            </div>
          ) : null}
          <div className="flex-1 w-full flex-col gap-2  rounded-lg p-2">
            {selectedId !== null ? (
              <DashboardEmailCard id={selectedId} />
            ) : null}
            {emails.length > 0 ? (
              <div className="flex-1 w-full flex flex-col gap-2 active border-1 border-[var(--border)] rounded-lg p-2">
                <span>Coming</span>
                {emails.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {emails.map((email) => {
                      const date = new Date(email.deadline);
                      return (
                        <div
                          key={email.id}
                          className="flex flex-row gap-2 justify-start items-center"
                        >
                          <span className="p-2 font-extrabold rounded-md bg-amber-500 text-white">
                            {date.toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                          <span className="font-bold flex-1 w-full">
                            {email.subject.length >= 30
                              ? `${email.subject.substring(0, 30)}...`
                              : email.subject}
                          </span>
                          <span
                            className={`${email.priority === "Critical" ? "bg-red-700" : email.priority === "High" ? "bg-orange-700" : email.priority === "Meduim" || email.priority === "Medium" ? "bg-yellow-500" : email.priority === "Low" ? "bg-green-700" : "bg-green-500"}  rounded-md p-2 text-white font-bold`}
                          >
                            {email.priority}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex-1 w-full flex flex-col gap-2 active border-1 border-[var(--border)] rounded-lg p-2">
                <span>no coming due dates</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>something went wrong</div>
  );
}
