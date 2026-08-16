"use client";

import { Bell, LogOut, Menu, Moon, Search, Settings, Sun } from "lucide-react";
import { useUser } from "../states/user";
import { useSidebar } from "../states/sidebar";
import { useRef, useState } from "react";
import { useTheme } from "../states/theme";
import NotificationShower from "./notificationui";
import { useNotifications } from "../states/notifications";

export default function Navbar() {
  const { user, isLoading, token } = useUser();
  const { open, updateOpen } = useSidebar();
  const notification = useNotifications();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { theme, updateTheme } = useTheme();
  const notParentDiv = useRef<HTMLDivElement>(null);

  function openNotifications() {
    setNotificationOpen(notificationOpen === true ? false : true);
  }

  const toggleSidebar = () => {
    updateOpen(!open);
  };
  return user ? (
    <div className='w-full sticky top-0 p-2 h-25 md:h-15 bg-[var(--bg-secondary)] shadow-md border-[var(--border-light)] flex flex-col md:flex-row justify-between items-center z-10'>
      <div className='w-full shadow-md border-none md:border-[var(--border-light)] h-15 flex flex-row justify-between items-center'>
        <Menu className='cursor-pointer' onClick={toggleSidebar} />
        <div className='w-full flex-row justify-center items-center md:flex hidden'>
          <div className='flex flex-row items-center justify-center gap-2 bg-transparent rounded-md pl-2 pr-2 w-[50%] border border-[var(--border)]'>
            <Search className='text-[var(--text-secondary)]' />
            <input
              className='transparent w-full p-2 focus:outline-none focues:border-none outline-none border-none text-[var(--text-primary)]'
              placeholder='search anything'
              type='search'
            />
          </div>
        </div>
        <div className='flex flex-row items-center justify-center gap-2 bg-transparent pl-2 pr-2 rounded-md w-fit'>
          <div className='relative  w-fit' ref={notParentDiv}>
            <Bell
              className='text-lg cursor-pointer'
              onClick={() => openNotifications()}
            />
            {notification.isLoading === false &&
            notification.notifications.filter((value) => value.seen !== true)
              .length > 0 ? (
              <div className='absolute top-[-15] right-[-4] bg-red-800 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-none'>
                <span>
                  {notification.notifications.filter(
                    (value) => value.seen !== true,
                  ).length > 9
                    ? "9+"
                    : notification.notifications.filter(
                        (value) => value.seen !== true,
                      ).length}
                </span>
              </div>
            ) : null}
            {notificationOpen ? (
              <NotificationShower
                open={notificationOpen}
                closeNot={openNotifications}
                parentDiv={notParentDiv}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className='w-full flex-row justify-center items-center flex md:hidden h-10'>
        <div className='flex flex-row items-center justify-center gap-2 bg-transparent rounded-md pl-2 pr-2 w-[90%] border border-[var(--border)]'>
          <Search className='text-[var(--text-secondary)]' />
          <input
            className='transparent w-full p-2 focus:outline-none focues:border-none outline-none border-none text-[var(--text-primary)]'
            placeholder='search anything'
            type='search'
          />
        </div>
      </div>
    </div>
  ) : null;
}
