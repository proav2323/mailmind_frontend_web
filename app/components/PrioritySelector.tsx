import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export default function PrioritySelector({
  pririoties,
  catgeorySearch,
  prioritySearch,
}: {
  pririoties: { name: string; id: string }[];
  catgeorySearch: string | undefined;
  prioritySearch: string | undefined;
}) {
  const router = useRouter();
  const filter = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    let url = `/dashboard/inbox?`;
    const value = e.target.value;

    if (catgeorySearch) {
      url = url + `category=${catgeorySearch}&`;
    }
    if (value && value !== "----") {
      url = url + `priority=${value}`;
    } else {
      url = `/dashboard/inbox?`;
      if (catgeorySearch) {
        url = url + `category=${catgeorySearch}&`;
      }
    }
    router.push(url);
  };
  return (
    <div className='lg:w-[10%] md:w-[15%] w-[25%] pt-2 pb-2 pl-0 pr-0'>
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
