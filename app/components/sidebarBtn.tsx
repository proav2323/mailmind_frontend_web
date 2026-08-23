"use client";

import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useSidebar } from "../states/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEmails } from "../states/emails";

export default function SidebarBtn({
  value,
}: {
  value: {
    name: string;
    activeUrl: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  };
}) {
  const { open } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const { updateEmails, updateCursor } = useEmails();

  const click = () => {
    if (
      value.activeUrl === "/dashboard/inbox" &&
      pathname !== value.activeUrl
    ) {
      console.log("running no emails");
      updateEmails([], true, []);
      updateCursor(undefined);
    }
    router.push(value.activeUrl);
  };

  return (
    <div
      onClick={click}
      className={`flex flex-row w-full  pl-2 pr-2 pt-3 pb-3 ${pathname === value.activeUrl ? "font-bold active text-[var(--text-secondary)]" : "font-normal bg-transparent"} gap-2 cursor-pointer ${open ? "justify-start items-center" : "justify-center items-center"} transition-all ease-in-out duration-500 drop-shadow-blue-300 rounded-md hover:bg-[var(--bg-primary)] `}
    >
      <value.icon className='text-sm' />
      {open ? <span className='text-sm'>{value.name}</span> : null}
    </div>
  );
}
