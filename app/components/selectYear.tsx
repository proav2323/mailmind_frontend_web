"use client";
import React, { useState } from "react";
import YearSelector from "./yearSelector";
import Loader from "./loader";
import { useRouter } from "next/navigation";
import { useSnackBar } from "../states/snackbar";

export default function Selector({
  save,
}: {
  save: (year: string) => Promise<void>;
}) {
  const [year, setYear] = useState("");
  const { showSnackBar } = useSnackBar();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function change() {
    if (year === "") {
      showSnackBar("select year when you started college/work", "error");
      return;
    }
    setIsLoading(true);
    await save(year);
    router.push("/");
  }

  return (
    <div className='w-[50%] h-fit p-4 rounded-md bg-[var(--bg-secondary)] flex flex-col gap-2'>
      <YearSelector year={year} setYear={setYear} />
      <button
        onClick={change}
        className='w-full p-2 rounded-md bg-[var(--bg-primary)] hover:cursor-pointer'
      >
        {isLoading ? <Loader /> : <span>Set</span>}
      </button>
    </div>
  );
}
