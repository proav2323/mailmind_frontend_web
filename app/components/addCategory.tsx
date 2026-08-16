import React, { useEffect, useRef, useState } from "react";
import Loader from "./loader";
import { addCatgeory, getUserCategories } from "../actions";
import { useSnackBar } from "../states/snackbar";
import { useCategories } from "../states/categories";

export default function AddCategory({
  parentDiv,
  closeAdd,
}: {
  parentDiv: React.RefObject<HTMLDivElement | null>;
  closeAdd: () => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIlaoding] = useState(false);
  const [category, setCategory] = useState("");
  const { showSnackBar } = useSnackBar();
  const { updateCategories } = useCategories();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close menu if click is outside the wrapper div
      if (
        divRef.current && // html div not null
        !divRef.current.contains(event.target as Node) && // dectcts if click is inside
        parentDiv &&
        !parentDiv.current!.contains(event.target as Node)
      ) {
        closeAdd();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside); // mouse lcick event listerner

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function add() {
    if (category && category !== "" && category !== " ") {
      setIlaoding(true);
      addCatgeory(category).then((value) => {
        if (value.error === null) {
          getUserCategories().then((value) => {
            if (value.error === null) {
              updateCategories(value.data);
              setIlaoding(false);
              closeAdd();
              showSnackBar("category added", "success");
            } else {
              setIlaoding(false);
              closeAdd();
              showSnackBar(value.error, "error");
            }
          });
        } else {
          setIlaoding(false);
          closeAdd();
          showSnackBar(value.error, "error");
        }
      });
    }
  }
  return (
    <div
      className='absolute top-[70] left-[20] slide z-100 p-2 bg-[var(--bg-secondary)] w-[80vw] md:w-[30vw] w-[18vw] rounded-md flex flex-row justify-center items-center gap-1'
      ref={divRef}
    >
      <input
        onChange={(e) => setCategory(e.target.value)}
        type='text'
        placeholder='Name'
        value={category}
        className='bg-transparent p-2 rounded-md border border-[var(--border)] flex-1 min-w-0 mr-2 focus:outline-none'
      />
      <button
        onClick={() => add()}
        className='ml-2 p-2 rounded-md bg-[var(--bg-primary)] rounded-md cursor-pointer text-sm'
      >
        {isLoading ? <Loader /> : "Add"}
      </button>
    </div>
  );
}
