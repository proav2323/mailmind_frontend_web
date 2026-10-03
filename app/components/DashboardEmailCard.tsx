import { useEffect, useState } from "react";
import { getEmailFromId } from "../actions";
import { EMAIL } from "../dashboard/email/[id]/page";
import Loader from "./loader";
import { useRouter } from "next/navigation";

export default function DashboardEmailCard({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<EMAIL | null>(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getEmailFromId(id).then((value) => {
      if (value.error === null) {
        setEmail(value.data);
        setLoading(false);
      } else {
        setEmail(null);
        setLoading(false);
      }
    });
  }, [id]);

  return loading === true ? (
    <div className="w-full">
      <Loader />
    </div>
  ) : email ? (
    <div className="active border-1 border-[var(--border)] rounded-lg p-2 flex-col gap-2 hidden lg:flex">
      <div className="flex flex-row justify-start items-center gap-2">
        <span
          className={`${email.priority === "Critical" ? "bg-red-700" : email.priority === "High" ? "bg-orange-700" : email.priority === "Meduim" || email.priority === "Medium" ? "bg-yellow-500" : email.priority === "Low" ? "bg-green-700" : "bg-green-500"}  rounded-full p-1 text-white font-bold`}
        >
          {email.priority}
        </span>
        {email.deadline != null ? (
          <span className="p-1 font-extrabold rounded-full bg-amber-500 text-white">
            {new Date(email.deadline).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })}
          </span>
        ) : null}
        <span
          className={`${email.priority === "Critical" ? "bg-red-700" : email.priority === "High" ? "bg-orange-700" : email.priority === "Meduim" || email.priority === "Medium" ? "bg-yellow-500" : email.priority === "Low" ? "bg-green-700" : "bg-green-500"}  rounded-full p-1 text-white font-bold`}
        >
          {email.category}
        </span>
      </div>
      <span className="p-1 text-sm text-[var(--text-secondary)]">
        {email.summary}
      </span>
      <div className="flex flex-row justify-start items-center gap-2">
        <button
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer transform transition duration-300 ease-in-out"
          onClick={() => router.push(`/dashboard/email/${id}`)}
        >
          more info
        </button>
        <button
          className="p-2   cursor-pointer transform transition duration-300 ease-in-out border border-[var(--border)] rounded-md hover:bg-[var(--primary)] hover:text-white"
          onClick={() => {}}
        >
          Add To calender
        </button>
        <button
          className="p-2   cursor-pointer transform transition duration-300 ease-in-out border border-[var(--border)] rounded-md hover:bg-[var(--primary)] hover:text-white"
          onClick={() => {}}
        >
          mark Done
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-2 active border-1 border-[var(--border)] rounded-lg p-2">
      <span>something went wrong</span>
    </div>
  );
}
