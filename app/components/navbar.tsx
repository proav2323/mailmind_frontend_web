"use client";

import { Bell, Menu, Search } from "lucide-react";
import { useUser } from "../states/user";
import { useSidebar } from "../states/sidebar";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const { user, isLoading, token } = useUser();
  const { open, updateOpen } = useSidebar();
  const [dropdownOpen, steDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    updateOpen(!open);
  };
  return user ? (
    <div className='w-full sticky top-0 p-2 h-15 bg-[var(--bg-secondary)] shadow-md border-[var(--border-light)] flex flex-row justify-between items-center'>
      <Menu className='cursor-pointer' onClick={toggleSidebar} />
      <div className='w-full flex flex-row justify-center items-center'>
        <div className='flex flex-row items-center justify-center gap-2 bg-transparent rounded-md pl-2 pr-2 w-[50%] border border-[var(--border)]'>
          <Search className='text-[var(--text-secondary)]' />
          <input
            className='transparent w-full p-2 focus:outline-none focues:border-none outline-none border-none text-[var(--text-primary)]'
            placeholder='search anything'
            type='search'
          />
        </div>
      </div>
      <div className='flex flex-row items-center justify-center gap-2 bg-transparent rounded-md'>
        <div className='relative cursor-pointer w-fit'>
          <Bell className='text-lg' />
          <div className='absolute top-[-10] right-[-4] bg-red-800 text-white rounded-full w-5 h-5 flex items-center justify-center'>
            <span>2</span>
          </div>
        </div>
        <div className='relative'>
          <Image
            src={user.photoUrl}
            width={50}
            height={50}
            alt='profile photo'
            className='rounded-full cursor-pointer'
          />
        </div>
      </div>
    </div>
  ) : null;
}
