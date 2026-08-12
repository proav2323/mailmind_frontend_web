"use client";

import { useUser } from "../states/user";
import logo from "../icon.png";
import Image from "next/image";
import { useSidebar } from "../states/sidebar";

export default function Sidebar() {
  const { user, isLoading, token } = useUser();
  const { open } = useSidebar();
  return user ? (
    <div
      className={`${open ? "w-[18vw]" : "w-[5vw]"}  sticky top-0 left-0 h-screen bg-[var(--bg-sidebar)] transition-all ease-in-out duration-300`}
    >
      <div className='h-15 p-2 bg-[var(--bg-secondary)] shadow-md border-[var(--border-light)] flex flex-row justify-center items-center cursor-pointer'>
        <Image src={logo} alt='logo' width={50} />
        {open ? (
          <span className='text-lg font-bold text-[#1077F9]'>
            Mail<span className='text-[#2E2E8F] font-bold text-lg'>Mind</span>
          </span>
        ) : null}
      </div>
      <div className='mt-2'></div>
    </div>
  ) : null;
}
