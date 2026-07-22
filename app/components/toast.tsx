"user client";

import { useSnackBar } from "../states/snackbar";

export default function Toast() {
  const { snackbar, hideSnackBar } = useSnackBar();
  return (
    <div
      className={`p-4 rounded-md bg-[var(--bg-secondary)] absolute top-2 right-2 flex flex-row justify-between items-center animate-bounce transition ease-in-out ${snackbar.show ? "opacity-100" : "opacity-0"}`}
    >
      <span
        className={`w-full ${snackbar.type === "error" ? "text-red-800" : snackbar.type === "success" ? "text-green-800" : "text-amber-800"} font-bold`}
      >
        {snackbar.msg}
      </span>
      <button
        onClick={hideSnackBar}
        className='bg-transparent p-2 outline-none border-none text-[var(--text-primary)] text-sm hover:cursor-pointer hover:bg-[var(--bg-primary)] m-2 rounded-md transition ease-in-out flex items-center justify-center'
      >
        X
      </button>
    </div>
  );
}
