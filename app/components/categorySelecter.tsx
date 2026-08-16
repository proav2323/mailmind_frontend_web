"use client";

import { useRouter } from "next/navigation";

export default function CategorySelector({
  category,
  categorySearch,
  prioritySearch,
}: {
  category: { name: string };
  categorySearch: string | undefined;
  prioritySearch: string | undefined;
}) {
  const router = useRouter();
  const filterCategory = () => {
    let url = `/dashboard/inbox?`;
    if (prioritySearch) {
      url = url + `priority=${prioritySearch}&`;
    }
    if (category.name === categorySearch) {
      url = `/dashboard/inbox?`;
      if (prioritySearch) {
        url = url + `priority=${prioritySearch}&`;
      }
    } else {
      url = url + `category=${category.name}`;
    }

    router.push(url);
  };
  return (
    <div
      onClick={filterCategory}
      className={`pt-2 pb-2 pl-3 pr-3 cursor-pointer rounded-full ${categorySearch && categorySearch === category.name ? "active font-bold" : "bg-[var(--bg-primary)] font-normal"}`}
    >
      {category.name}
    </div>
  );
}
