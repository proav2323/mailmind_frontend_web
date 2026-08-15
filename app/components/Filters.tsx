"use client";

import { useCategories } from "../states/categories";

export default function Filter({
  categories,
  pririoties,
}: {
  categories: { name: string }[];
  pririoties: { name: string; id: string }[];
}) {
  const category = useCategories();

  const finalCategroies = [...category.categories, ...categories];
  return (
    <div className='w-full flex flex-row pt-2 pb-2 pl-0 pr-0 ml-0 mr-0 bg-[var(--bg-secondary)] rounded-b-md gap-1 shrink-0'>
      <div
        className='flex-1  min-w-0 flex flex-row overflow-x-scroll scrollbar-none justify-start
        items-center'
      >
        {finalCategroies.map((category, idx) => {
          return (
            <div className='w-fit whitespace-nowrap' key={idx}>
              {category.name}
            </div>
          );
        })}
      </div>
      <div className='lg:w-[10%] md:w-[15%] w-[25%] pt-2 pb-2 pl-0 pr-0'></div>
    </div>
  );
}
