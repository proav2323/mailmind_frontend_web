"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
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
  const {
    emails,
    isLoading,
    updateEmails,
    updateLoading,
    updateCursor,
    nextCursor,
    hasMore,
    updateMore,
  } = useEmails();
  const category = useCategories();

  const categorySearch = query.category;
  const prioritySearch = query.priority;

  const bottomDiv = useRef<HTMLDivElement>(null);
  const emailContainer = useRef<HTMLDivElement>(null);
  const dataRef = useRef<{ prevHeight: number; prevScrollTop: number }>(null);

  const filterSearch = () => {
    if (emailContainer.current) {
      dataRef.current = {
        prevHeight: emailContainer.current.scrollHeight,
        prevScrollTop: emailContainer.current.scrollTop,
      };
    }
    console.log(categorySearch, prioritySearch);
    if (categorySearch || prioritySearch) {
      console.log("working filter search");
      updateLoading(true);
      getFillterEmails(categorySearch, prioritySearch, nextCursor).then(
        (value) => {
          if (value.error === null) {
            updateEmails(value.data.emails, nextCursor ? true : false, emails);
            updateCursor(value.data.nextCursor);
            updateMore(value.data.hasMore);
          }
          updateLoading(false);
        },
      );
    } else {
      updateLoading(true);
      getUserEmails(nextCursor).then((value) => {
        if (value.error === null) {
          updateEmails(
            value.data.emails.length >= 1 ? value.data.emails : [],
            nextCursor ? true : false,
            emails,
          );
          updateCursor(value.data.nextCursor);
          updateMore(value.data.hasMore);
        }
        updateLoading(false);
      });
    }
  };

  useEffect(() => {
    filterSearch();
  }, [categorySearch, prioritySearch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading && hasMore) {
          filterSearch();
        }
      },
      { rootMargin: "300px", root: null, threshold: 0 },
    );
    const element = bottomDiv.current;

    if (element) {
      console.log("observe started");
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [bottomDiv.current, filterSearch]);

  return user !== null && category.isLoading !== true ? (
    <div className='flex flex-col mt-0 justify-start items-center w-full shrink-0'>
      <Filter
        categories={categroies}
        pririoties={priorites}
        catgeorySearch={categorySearch}
        prioritySearch={prioritySearch}
      />
      {emails.length === 0 && isLoading === false ? (
        <span className='mt-2 font-bold text-lg text-center w-full'>
          no emails found
        </span>
      ) : emails.length >= 1 ? (
        <div
          className='w-full mt-2 justify-center flex flex-col items-center z-1 gap-2 overflow-y-auto emails'
          ref={emailContainer}
        >
          {emails.map((email) => {
            return <EmailCard key={email.id} email={email} />;
          })}
          <div className='w-full h-10' ref={bottomDiv}></div>
          {isLoading ? (
            <div className='w-full pt-2 pb-2 mt-2 flex flex-row justify-center items-center spinner'>
              <Loader />
            </div>
          ) : null}
        </div>
      ) : (
        <div className='w-full min-h-screen flex flex-row justify-center items-center'>
          <Loader />
        </div>
      )}
    </div>
  ) : (
    <div className='w-full min-h-screen flex flex-row justify-center items-center'>
      <Loader />
    </div>
  );
}
