"use client";

import { Delete } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteCatgeory, getUserCategories } from "../actions";
import { useSnackBar } from "../states/snackbar";
import { useCategories } from "../states/categories";
import { useEmails } from "../states/emails";

export default function CategorySelector({
  category,
  categorySearch,
  prioritySearch,
  starred,
  dateEnd,
  dateStart,
}: {
  category: { name: string; id: undefined | string };
  categorySearch: string | undefined;
  prioritySearch: string | undefined;
  starred: string | undefined;
  dateStart: string | undefined;
  dateEnd: string | undefined;
}) {
  const router = useRouter();
  const [isLoaidng, setIsLoading] = useState(false);
  const { showSnackBar } = useSnackBar();
  const { updateCategories } = useCategories();
  const { updateCursor, updateMore, updateEmails } = useEmails();
  const filterCategory = () => {
    updateCursor(undefined);
    updateMore(true);
    updateEmails([], true, []);
    let url = `/dashboard/inbox?`;
    if (prioritySearch) {
      url = url + `priority=${prioritySearch}&`;
    }
    if (starred) {
      url = url + `starred=${starred}&`;
    }
    if (dateEnd && dateStart) {
      url = url + `dateEnd=${dateEnd}&dateStart=${dateStart}&`;
    }
    if (category.name === categorySearch) {
      url = `/dashboard/inbox?`;
      if (prioritySearch) {
        url = url + `priority=${prioritySearch}&`;
      }
      if (starred) {
        url = url + `starred=${starred}&`;
      }
      if (dateEnd && dateStart) {
        url = url + `dateEnd=${dateEnd}&dateStart=${dateStart}&`;
      }
    } else {
      url = url + `category=${category.name}`;
    }

    router.push(url);
  };

  function deleteCat() {
    if (!isLoaidng && category.id) {
      setIsLoading(true);
      deleteCatgeory(category.id).then((value) => {
        if (value.error === null) {
          getUserCategories().then((value) => {
            if (value.error === null) {
              updateCategories(value.data);
              setIsLoading(false);
              showSnackBar("category deleted", "error");
            } else {
              setIsLoading(false);
              showSnackBar(value.error, "error");
            }
          });
        } else {
          setIsLoading(false);
          showSnackBar(value.error, "error");
        }
      });
    }
  }
  return (
    <div
      className={`pt-2 pb-2 pl-3 pr-3 cursor-pointer rounded-full ${categorySearch && categorySearch === category.name ? "active font-bold" : "bg-[var(--bg-primary)] font-normal"} flex flex-row justify-center items-center gap-2`}
    >
      <span className='flex-1 min-w-0 text-start ' onClick={filterCategory}>
        {category.name}
      </span>
      {category.id ? (
        <span
          onClick={deleteCat}
          aria-label='Delete category'
          className='flex items-center justify-center text-sm'
        >
          <Delete />
        </span>
      ) : null}
    </div>
  );
}
