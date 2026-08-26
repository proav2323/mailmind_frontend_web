import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useEmails } from "../states/emails";

export default function PrioritySelector({
  pririoties,
  catgeorySearch,
  prioritySearch,
  starred,
  dateEnd,
  dateStart,
}: {
  pririoties: { name: string; id: string }[];
  catgeorySearch: string | undefined;
  prioritySearch: string | undefined;
  starred: string | undefined;
  dateStart: string | undefined;
  dateEnd: string | undefined;
}) {
  const router = useRouter();
  const { updateCursor, updateMore, updateEmails } = useEmails();
  const filter = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    updateCursor(undefined);
    updateMore(true);
    updateEmails([], true, []);
    let url = `/dashboard/inbox?`;
    const value = e.target.value;

    if (catgeorySearch) {
      url = url + `category=${catgeorySearch}&`;
    }
    if (starred) {
      url = url + `starred=${starred}&`;
    }
    if (dateEnd && dateStart) {
      url = url + `dateEnd=${dateEnd}&dateStart=${dateStart}&`;
    }
    if (value && value !== "----") {
      url = url + `priority=${value}`;
    } else {
      url = `/dashboard/inbox?`;
      if (catgeorySearch) {
        url = url + `category=${catgeorySearch}&`;
      }
      if (starred) {
        url = url + `starred=${starred}&`;
      }
      if (dateEnd && dateStart) {
        url = url + `dateEnd=${dateEnd}&dateStart=${dateStart}&`;
      }
    }
    router.push(url);
  };
  return (
    <div className='w-[97%] pt-2 pb-2 pl-0 pr-0'>
      <select
        onChange={(e) => filter(e)}
        defaultValue={prioritySearch}
        className='w-[95%] p-2 rounded-md  border-[var(--border)] border-1 cursor-pointer bg-[var(--bg-primary)] outline-none'
      >
        <option>----</option>
        {pririoties.map((priority, idx) => {
          return (
            <option
              className='font-bold outlone-none border-none'
              value={priority.id}
              key={idx}
            >
              {priority.id}
            </option>
          );
        })}
      </select>
    </div>
  );
}
