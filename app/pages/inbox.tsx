"use client";

import { useEffect } from "react";
import Filter from "../components/Filters";
import Loader from "../components/loader";
import { useCategories } from "../states/categories";
import { useEmails } from "../states/emails";
import { useUser } from "../states/user";
import { getFillterEmails, getUserEmails } from "../actions";
import EmailCard from "../components/EmailCard";

export default function Inbox({
  query,
}: {
  query: { [key: string]: string | undefined };
}) {
  const categroies = [
    { name: "assignment" },
    { name: "project" },
    { name: "syllabus" },
    { name: "task" },
    { name: "meeting" },
    { name: "review" },
    { name: "interview" },
    { name: "course" },
    { name: "exam" },
    { name: "submission" },
    { name: "invoice" },
    { name: "report" },
    { name: "schedule" },
    { name: "urgent" },
    { name: "education" },
    { name: "work" },
    { name: "school" },
    { name: "office" },
    { name: "OTP" },
    { name: "event" },
    { name: "hackathons" },
    { name: "class", desc: "" },
    { name: "annoucements" },
    { name: "finace" },
    { name: "billing" },
    { name: "placement" },
    { name: "reminder" },
    { name: "fees" },
    { name: "scholarship" },
    { name: "timetable" },
    { name: "academic" },
    { name: "holiday" },
    { name: "club" },
    { name: "intership" },
    { name: "research" },
    { name: "Finace" },
    { name: "personal" },
    { name: "spam" },
    { name: "social" },
  ];

  const priorites = [
    { name: "Critical", id: "Critical" },
    { name: "High", id: "High" },
    { name: "Medium", id: "Medium" },
    { name: "Low", id: "Low" },
    { name: "Expired", id: "Expired" },
  ];

  const { user } = useUser();
  const { emails, isLoading, updateEmails, updateLoading } = useEmails();
  const category = useCategories();

  const categorySearch = query.category;
  const prioritySearch = query.priority;

  useEffect(() => {
    if (categorySearch || prioritySearch) {
      console.log("working filter search");
      updateLoading(true);
      getFillterEmails(categorySearch, prioritySearch).then((value) => {
        if (value.error === null) {
          updateEmails(value.data!);
        }
        updateLoading(false);
      });
    } else {
      updateLoading(true);
      getUserEmails().then((value) => {
        if (value.error === null) {
          updateEmails(value.data ?? []);
        }
        updateLoading(false);
      });
    }
  }, [categorySearch, prioritySearch]);

  return user !== null && isLoading !== true && category.isLoading !== true ? (
    <div className='flex flex-col mt-0 justify-start items-center w-full shrink-0'>
      <Filter
        categories={categroies}
        pririoties={priorites}
        catgeorySearch={categorySearch}
        prioritySearch={prioritySearch}
      />
      {emails.length === 0 ? (
        <span className='mt-2 font-bold text-lg text-center w-full'>
          no emails found
        </span>
      ) : (
        <div className='w-full mt-2 justify-center flex flex-col items-center z-1 gap-2'>
          {emails.map((email) => {
            return <EmailCard key={email.id} email={email} />;
          })}
        </div>
      )}
    </div>
  ) : (
    <div className='w-full min-h-screen flex flex-row justify-center items-center'>
      <Loader />
    </div>
  );
}
