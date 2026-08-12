"use client";

import { Menu } from "lucide-react";
import { useUser } from "../states/user";
import { useSidebar } from "../states/sidebar";

export default function Navbar() {
  const { user, isLoading, token } = useUser();
  const { open, updateOpen } = useSidebar();

  const toggleSidebar = () => {
    updateOpen(!open);
  };
  return user ? (
    <div className='w-full sticky top-0 p-2 h-15 bg-[var(--bg-secondary)] shadow-md border-[var(--border-light)] flex flex-row justify-between items-center'>
      <Menu className='cursor-pointer' onClick={toggleSidebar} />
    </div>
  ) : null;
}
