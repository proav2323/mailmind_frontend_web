"use client";

import {
  AirVent,
  Check,
  ChevronDown,
  File,
  Forward,
  icons,
  Mail,
  Reply,
  Star,
  User,
} from "lucide-react";
import { EMAIL } from "../dashboard/email/[id]/page";
import TextDisplay from "../components/TextDisplay";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useRef, useState } from "react";
import DropdownWidget from "../components/Dropdown";
import Attachment from "../components/Attachment";
import { complete, getEmailFromId, star } from "../actions";
import { useEmails } from "../states/emails";
import Loader from "../components/loader";

export default function Email({ emailD }: { emailD: EMAIL | null }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const parentDiv = useRef<HTMLDivElement>(null);
  const { isLoading, email, updateEmail, updateLoading } = useEmails();

  useEffect(() => {
    if (emailD) {
      updateEmail(emailD);
    } else {
      updateEmail(null);
    }
  }, []);

  function toggle() {
    setDropdownOpen(!dropdownOpen);
  }

  const completeMail = async () => {
    if (!email) {
      return;
    }
    if (email.requiresAction && email.isCompleted === false) {
      toggle();
      await complete(email.id);
      updateLoading(true);
      await star(email.id);
      const data = await getEmailFromId(email.id);
      updateEmail(data.error === null ? data.data : null);
      updateLoading(false);
    }
  };

  const toggleStar = async () => {
    if (!email) {
      return;
    }
    updateLoading(true);
    await star(email.id);
    const data = await getEmailFromId(email.id);
    updateEmail(data.error === null ? data.data : null);
    updateLoading(false);
  };

  const id = [{ id: "main" }];
  const items = [
    { name: "Mark As Complete", id: "main", click: completeMail, icon: Check },
  ];

  return email && isLoading === false ? (
    <div className='w-[97%] h-full mt-2 flex flex-col justify-start items-center'>
      <div className='w-full flex flex-row justify-between items-center pt-2 pb-2'>
        <span className='font-bold text-md lg:text-lg'>
          {email.GmailSubject}
        </span>
        {email.isStared ? (
          <Star fill='#111' className='cursor-pointer' onClick={toggleStar} />
        ) : (
          <Star className='cursor-pointer' onClick={toggleStar} />
        )}
      </div>
      <div className='flex flex-row justify-between items-center w-full'>
        <div className='flex flex-row gap-2 items-start justify-start flex-1 min-w-0'>
          <div className='border border-[var(--border)] rounded-full p-2 hidden lg:flex'>
            <User className='text-xl' size={50} />
          </div>
          <div className='flex flex-col justify-start items-center '>
            <span className='text-lg font-bold'>
              {email.sender.split("<")[0]}
            </span>
            <span className='text-sm text-[var(--text-secondary)]'>
              {email.sender.split("<")[1]
                ? email.sender.split("<")[1].split(">")[0]
                : email.sender.split("<")[0]}
            </span>
          </div>
        </div>
        <div
          className='flex flex-col lg:flex-row gap-2 justify-center items-center p-2 relative z-10'
          ref={parentDiv}
        >
          <span className='text-sm text-[var(--text-secondary)]'>
            {new Date(email.receivedAt).toLocaleString()}
          </span>
          <div className='w-full flex flex-row justify-center'>
            <Reply size={25} className='cursor-pointer' />
            <Forward size={25} className='cursor-pointer' />
            <ChevronDown
              size={25}
              className='cursor-pointer'
              onClick={toggle}
            />
            {dropdownOpen ? (
              <DropdownWidget
                closeDropdown={toggle}
                parentDiv={parentDiv}
                ids={id}
                item={items}
                open={dropdownOpen}
                top={20}
                bottom={0}
                right={0}
                left={0}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className='bg-[var(--bg-secondary)] rounded-md flex flex-col justify-start items-center w-full pt-2 pb-2 mt-2 gap-2 mb-2'>
        <div className='flex flex-row lg:border-b lg:border-[var(--border)] w-full items-start justify-start text-lg font-bold gap-2 p-2'>
          <AirVent /> Ai summary
        </div>
        <div className='flex flex-col lg:flex-row justify-between items-start w-full'>
          <div className='w-full  flex flex-col justify-center items-center lg:border-r lg:border-[var(--border)]  gap-2'>
            <TextDisplay
              nameC='Category'
              value={email.category}
              bgColor='#292A49'
              textColor='#8A77BA'
            />
            <TextDisplay
              nameC='Priority'
              value={email.priority}
              bgColor='#302E2D'
              textColor='#D5A426'
            />
            <TextDisplay
              nameC='Require Action'
              value={email.requiresAction ? "Yes" : "No"}
              bgColor={email.requiresAction ? "#29503E" : "#2D242C"}
              textColor={email.requiresAction ? "#2A5B43" : "#7B3C3C"}
            />
            <TextDisplay
              nameC='Deadline'
              value={
                email.deadline
                  ? new Date(email.deadline).toDateString()
                  : "no deadline"
              }
              bgColor='#22265D'
              textColor='#B3B6CE'
            />
          </div>
          <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-[95%] flex flex-col justify-start items-start'>
              <span className='text-lg font-bold'>Ai Summary</span>
              <span className='text-[var(--text-secondary)]'>
                {email.summary}
              </span>
              <span className='text-lg font-bold mt-3'>Ai Subject</span>
              <span className='text-[var(--text-secondary)]'>
                {email.subject}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[var(--bg-secondary)] rounded-md flex flex-col justify-start items-center w-full pt-2 pb-2 mt-2 gap-2 mb-2'>
        <div className='flex flex-row border-b border-[var(--border)] w-full items-start justify-start text-lg font-bold gap-2 p-2'>
          <Mail /> Original Email
        </div>
        <div className='flex flex-col gap-2 justify-start items-center w-full'>
          {email.bodyInOrder
            .sort((a, b) => b.i - a.i)
            .map((body, idx) => {
              const cleanHtml =
                body.type === "text/html" ? DOMPurify.sanitize(body.data) : "";
              return body.type === "text/plain" ? (
                <div
                  className='w-[95%] text-start text-wrap wrap-break-word'
                  key={idx}
                >
                  {body.data}
                </div>
              ) : (
                <div
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: cleanHtml }}
                  className='w-[95%] overflow-x-scroll scrollbar-none'
                />
              );
            })}
        </div>
      </div>
      {email.attachments.length >= 1 ? (
        <div className='bg-[var(--bg-secondary)] rounded-md flex flex-col justify-start items-center w-full pt-2 pb-2 mt-2 gap-2 mb-2'>
          <div className='flex flex-row border-b border-[var(--border)] w-full items-start justify-start text-lg font-bold gap-2 p-2'>
            <File /> Attachments
          </div>
          <div className='flex flex-col justify-start items-center w-[97%]'>
            {email.attachments.map((attachment) => {
              return (
                <Attachment
                  attachment={attachment}
                  messageId={email.gmailId}
                  key={attachment.attachmentId}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  ) : isLoading ? (
    <div className='w-full min-h-screen flex flex-row justify-center items-center'>
      <Loader />
    </div>
  ) : (
    <div className='w-full h-full text-center font-bold text-md md:text-lg mt-2'>
      Email NOT Found with this id
    </div>
  );
}
