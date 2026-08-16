"use client";
import { useRouter } from "next/navigation";
import { EMAILS } from "../models/emails";

export default function EmailCard({ email }: { email: EMAILS }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/dashboard/email/${email.gmailId}`)}
      className={`w-[97%] pt-3 pb-3 rounded-md border border-[var(--border)] flex flex-col gap-1 cursor-pointer ${email.isRead === true ? "font-normal" : "font-extrabold"}`}
    >
      <div className={`mr-2 flex flex-row gap-2 justify-end items-center`}>
        <span className={`bg-[var(--bg-card)] rounded-full p-2 font-bold`}>
          {email.category}
        </span>
        <span
          className={`${email.priority === "Critical" ? "bg-red-700" : email.priority === "High" ? "bg-orange-700" : email.priority === "Meduim" || email.priority === "Medium" ? "bg-yellow-500" : email.priority === "Low" ? "bg-green-700" : "bg-green-500"}  rounded-full p-2 text-white font-bold`}
        >
          {email.priority}
        </span>
      </div>
      <div className='flex-1 min-w-0 flex flex-col justify-start items-start ml-2'>
        <span className='text-sm text-[var(--text-secondary)]'>
          {email.sender.split("<")[0]}
        </span>
        <span className='text-sm md:text-md'>
          {window.window.innerWidth >= 1024
            ? email.subject.length >= 180
              ? email.subject.slice(0, 100) + "..."
              : email.subject
            : email.subject.length >= 20
              ? email.subject.slice(0, 20) + "..."
              : email.subject}
        </span>
        <span className='text-sm md:text-md'>
          {window.window.innerWidth >= 1024
            ? email.summary.length >= 180
              ? email.summary.slice(0, 100) + "..."
              : email.summary
            : email.summary.length >= 20
              ? email.summary.slice(0, 20) + "..."
              : email.summary}
        </span>
      </div>
      <span className='text-sm md:text-md text-end mr-2 text-[var(--text-secondary)]'>
        {new Date(email.receivedAt).toLocaleString("en-IN")}
      </span>
    </div>
  );
}
