import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { useEmails } from "../states/emails";

export default function DateFilter({
  catgeorySearch,
  prioritySearch,
  starred,
}: {
  catgeorySearch: string | undefined;
  prioritySearch: string | undefined;
  starred: string | undefined;
}) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const dateStartInput = useRef<HTMLInputElement>(null);
  const dateEndInput = useRef<HTMLInputElement>(null);

  function pickStartDate() {
    if (dateStartInput.current) {
      dateStartInput.current.showPicker();
    }
  }

  function pickEndDate() {
    if (dateEndInput.current) {
      dateEndInput.current.showPicker();
    }
  }

  const changeVal = (
    e: ChangeEvent<HTMLInputElement>,
    val: "start" | "end",
  ) => {
    const value = e.target.value;
    if (val === "end") {
      setEndDate(value);
    } else {
      setStartDate(value);
    }
  };

  const router = useRouter();
  const { updateCursor, updateMore, updateEmails } = useEmails();

  const filter = (endValue: string) => {
    if (
      startDate &&
      endValue &&
      new Date(endValue).getTime() - new Date(startDate).getTime() > 0
    ) {
      updateCursor(undefined);
      updateMore(true);
      updateEmails([], true, []);
      let url = `/dashboard/inbox?`;

      if (catgeorySearch) {
        url = url + `category=${catgeorySearch}&`;
      }
      if (prioritySearch) {
        url = url + `priority=${prioritySearch}&`;
      }
      if (starred) {
        url = url + `starred=${starred}&`;
      }
      url = url + `dateStart=${startDate}&dateEnd=${endValue}`;
      router.push(url);
    }
  };

  return (
    <div className='w-full flex flex-row justify-center items-center'>
      <input
        className='flex-1 min-w-0 border-1 border-[var(--border)] rounded-l-md text-[var(--text-secondary)] p-2 cursor-pointer outline-none text-[var(--text-primary)'
        type='date'
        onClick={pickStartDate}
        ref={dateStartInput}
        value={startDate}
        onChange={(e) => changeVal(e, "start")}
        placeholder='📅 choose start date'
      />
      <input
        className='flex-1 min-w-0 border-1 border-[var(--border)] rounded-r-md text-[var(--text-secondary)] p-2 cursor-pointer outline-none text-[var(--text-primary)]'
        type='date'
        onClick={pickEndDate}
        onChange={(e) => {
          changeVal(e, "end");
          filter(e.target.value);
        }}
        ref={dateEndInput}
        value={endDate}
        placeholder='📅 choose end date'
      />
    </div>
  );
}
