"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useCategories } from "../states/categories";
import CategorySelector from "./categorySelecter";
import AddCategory from "./addCategory";
import { MoreHorizontalIcon } from "lucide-react";
import FiltersPopup from "./filtersPopup";

export default function Filter({
  categories,
  pririoties,
  catgeorySearch,
  prioritySearch,
  starred,
  dateEnd,
  dateStart,
}: {
  categories: { name: string }[];
  pririoties: { name: string; id: string }[];
  catgeorySearch: string | undefined;
  prioritySearch: string | undefined;
  starred: string | undefined;
  dateStart: string | undefined;
  dateEnd: string | undefined;
}) {
  const category = useCategories();
  const [addOpen, setOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const parentDiv = useRef<HTMLDivElement>(null);
  const [finalCategories, setFinalCategories] = useState<
    { name: string; id: undefined | string }[]
  >([]);

  useLayoutEffect(() => {
    const newArray: { name: string; id: undefined | string }[] = [
      ...category.categories,
    ];
    categories.forEach((category) => {
      newArray.push({ name: category.name, id: undefined });
    });
    setFinalCategories(newArray);
  }, [category.categories, categories]);

  function toggle() {
    setOpen(!addOpen);
    console.log(addOpen);
  }

  function togglePopup() {
    setPopupOpen(!popupOpen);
  }

  return (
    <div className='w-full flex flex-row pt-2 pb-2 pl-0 pr-0 ml-0 mr-0 bg-[var(--bg-secondary)] gap-1 shrink-0 sticky md:top-[60] top-[100] z-2 relative'>
      {popupOpen ? (
        <FiltersPopup
          priorities={pririoties}
          closeFilters={togglePopup}
          catgeorySearch={catgeorySearch}
          prioritySearch={prioritySearch}
          starred={starred}
          dateEnd={dateEnd}
          dateStart={dateStart}
        />
      ) : null}
      <div
        className='p-2 rounded-full flex flex-row justify-center items-center cursor-pointer text-lg font-bold relative z-20'
        ref={parentDiv}
      >
        <span className='text-lg' onClick={() => toggle()}>
          +
        </span>
        {addOpen ? (
          <AddCategory parentDiv={parentDiv} closeAdd={() => setOpen(false)} />
        ) : null}
      </div>
      <div
        className='flex-1  min-w-0 flex flex-row overflow-x-scroll scrollbar-none justify-start
        items-center gap-1 ml-1'
      >
        {finalCategories.map((category, idx) => {
          return (
            <CategorySelector
              category={category}
              key={idx}
              categorySearch={catgeorySearch}
              prioritySearch={prioritySearch}
              starred={starred}
              dateEnd={dateEnd}
              dateStart={dateStart}
            />
          );
        })}
      </div>
      <div className='w-fit pt-2 pb-2 pl-0 pr-0'>
        <button className='p-2 cursor-pointer' onClick={togglePopup}>
          <MoreHorizontalIcon />
        </button>
      </div>
    </div>
  );
}
