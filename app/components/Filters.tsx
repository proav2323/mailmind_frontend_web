"use client";

import { useCategories } from "../states/categories";
import CategorySelector from "./categorySelecter";
import PrioritySelector from "./PrioritySelector";

export default function Filter({
  categories,
  pririoties,
  catgeorySearch,
  prioritySearch,
}: {
  categories: { name: string }[];
  pririoties: { name: string; id: string }[];
  catgeorySearch: string | undefined;
  prioritySearch: string | undefined;
}) {
  const category = useCategories();

  const finalCategroies = [...category.categories, ...categories];
  return (
    <div className='w-full flex flex-row pt-2 pb-2 pl-0 pr-0 ml-0 mr-0 bg-[var(--bg-secondary)] gap-1 shrink-0 sticky md:top-[60] top-[100] z-2'>
      <div className='p-2 rounded-full flex flex-row justify-center items-center cursor-pointer text-lg font-bold'>
        <span className='text-lg'>+</span>
      </div>
      <div
        className='flex-1  min-w-0 flex flex-row overflow-x-scroll scrollbar-none justify-start
        items-center gap-1 ml-1'
      >
        {finalCategroies.map((category, idx) => {
          return (
            <CategorySelector
              category={category}
              key={idx}
              categorySearch={catgeorySearch}
              prioritySearch={prioritySearch}
            />
          );
        })}
      </div>
      <PrioritySelector
        prioritySearch={prioritySearch}
        catgeorySearch={catgeorySearch}
        pririoties={pririoties}
      />
    </div>
  );
}
