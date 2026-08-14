"use client";

import { useUser } from "../states/user";
import logo from "../icon.png";
import Image from "next/image";
import { useSidebar } from "../states/sidebar";
import SidebarBtn from "./sidebarBtn";
import {
  Calendar,
  LayoutDashboard,
  LogOut,
  Mail,
  Moon,
  Phone,
  Settings,
  Sun,
  User,
} from "lucide-react";
import DropdownWidget from "./Dropdown";
import { useRef, useState } from "react";
import { useTheme } from "../states/theme";

export default function Sidebar() {
  const { user, isLoading, token } = useUser();
  const { theme, updateTheme } = useTheme();
  const { open } = useSidebar();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownParentDiv = useRef<HTMLDivElement | null>(null);

  const items = [
    {
      name: theme === "dark" ? "light" : "dark",
      icon: theme === "dark" ? Sun : Moon,
      id: "main",
      click: () => {
        toggleTheme();
      },
    },
    { name: "Settings", icon: Settings, id: "user", click: () => {} },
    { name: "profile", icon: User, id: "user", click: () => {} },
    { name: "Logout", icon: LogOut, id: "user", click: () => {} },
  ];
  const ids = [{ id: "main" }, { id: "user" }];

  function toggleTheme() {
    updateTheme(theme === "dark" ? "light" : "dark");
  }

  function closeDroddown() {
    setDropdownOpen(dropdownOpen === true ? false : true);
  }
  return user ? (
    <div
      className={`${open ? "w-[18vw]" : "w-[5vw]"}  sticky top-0 left-0 h-screen bg-[var(--bg-sidebar)] transition-all ease-in-out duration-300 flex flex-col items-center`}
    >
      <div className='h-15 p-2 bg-[var(--bg-secondary)] shadow-md border-[var(--border-light)] flex flex-row justify-center items-center cursor-pointer w-full'>
        <Image src={logo} alt='logo' width={50} />
        {open ? (
          <span className='text-lg font-bold text-[#1077F9]'>
            Mail<span className='text-[#2E2E8F] font-bold text-lg'>Mind</span>
          </span>
        ) : null}
      </div>
      <div className='w-full flex flex-col justify-center items-center mt-2 h-[95%]'>
        <div className='w-[95%] flex flex-col justify-start items-center pt-2 pb-2 h-full overflow-y-scroll scrollbar-none gap-2'>
          <SidebarBtn
            value={{
              activeUrl: "/dashboard",
              icon: LayoutDashboard,
              name: "Dashboard",
            }}
          />
          <SidebarBtn
            value={{
              activeUrl: "/dashboard/inbox",
              icon: Mail,
              name: "Inbox",
            }}
          />
          <SidebarBtn
            value={{
              activeUrl: "/dashboard/reminders",
              icon: Phone,
              name: "Reminders(comming soon)",
            }}
          />
          <SidebarBtn
            value={{
              activeUrl: "/dashboard/calender",
              icon: Calendar,
              name: "Calender (comming soon)",
            }}
          />
        </div>
        <div
          className='relative h-[150] w-full transition-all ease-in-out duration-300 flex flex-row justify-center items-end'
          ref={dropdownParentDiv}
          onClick={() => closeDroddown()}
        >
          <div className='w-[95%] h-fit cursor-pointer relative flex flex-row justify-center items-center gap-2 mb-2'>
            <Image
              src={user.photoUrl}
              width={30}
              height={30}
              alt='profile photo'
              className='rounded-full'
            />
            {open ? (
              <div className='w-full flex flex-col justify-center items-start'>
                <span className='text-sm'>{user.name}</span>
                <span className='text-sm'>{user.email}</span>
              </div>
            ) : null}
          </div>

          {dropdownOpen ? (
            <DropdownWidget
              open={dropdownOpen}
              item={items}
              ids={ids}
              closeDropdown={closeDroddown}
              parentDiv={dropdownParentDiv}
            />
          ) : null}
        </div>
      </div>
    </div>
  ) : null;
}
