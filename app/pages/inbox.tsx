"use client";

import Filter from "../components/Filters";
import Loader from "../components/loader";
import { useCategories } from "../states/categories";
import { useEmails } from "../states/emails";
import { useUser } from "../states/user";

export default function Inbox() {
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
  ];

  const { user } = useUser();
  const { emails, isLoading } = useEmails();
  const category = useCategories();

  return user !== null && isLoading !== true && category.isLoading !== true ? (
    <div className='flex flex-col mt-0 justify-start items-center w-full shrink-0'>
      <Filter categories={categroies} pririoties={priorites} />
    </div>
  ) : (
    <div className='w-full min-h-screen flex flex-row justify-center items-center'>
      <Loader />
    </div>
  );
}
