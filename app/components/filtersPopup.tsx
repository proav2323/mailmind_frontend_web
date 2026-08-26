import DateFilter from "./DateFilter";
import PrioritySelector from "./PrioritySelector";

export default function FiltersPopup({
  priorities,
  closeFilters,
  catgeorySearch,
  prioritySearch,
  starred,
  dateStart,
  dateEnd,
}: {
  priorities: { name: string; id: string }[];
  closeFilters: () => void;
  catgeorySearch: string | undefined;
  prioritySearch: string | undefined;
  starred: string | undefined;
  dateStart: string | undefined;
  dateEnd: string | undefined;
}) {
  return (
    <div className='w-full absolute h-screen bg-black/70 t-*op-0 flex flex-row justify-center items-center z-30'>
      <div className='w-[95%] md:w-[75%] lg:w-[50%] bg-[var(--bg-primary)] p-2 rounded-md flex flex-col justify-start items-center text-[var(--text-primary)] '>
        <div className='w-[97%] p-2 flex flex-row justify-between items-center '>
          <span className='text-md'>Filters</span>
          <button className='text-lg cursor-pointer' onClick={closeFilters}>
            X
          </button>
        </div>
        <div className='flex w-[97%] justify-center items-center'>
          <PrioritySelector
            pririoties={priorities}
            catgeorySearch={catgeorySearch}
            prioritySearch={prioritySearch}
            starred={starred}
            dateEnd={dateEnd}
            dateStart={dateStart}
          />
        </div>
        <div className='w-[97%] flex flex-row justify-center items-center gap-0'>
          <DateFilter
            catgeorySearch={catgeorySearch}
            prioritySearch={prioritySearch}
            starred={starred}
          />
        </div>
      </div>
    </div>
  );
}
