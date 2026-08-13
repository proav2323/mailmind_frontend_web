"use client";

import { LucideProps } from "lucide-react";
import {
  ForwardRefExoticComponent,
  ReactNode,
  Ref,
  RefAttributes,
  useEffect,
  useRef,
} from "react";

import DropdownBtn from "./DropdownBtn";

export default function DropdownWidget({
  open,
  item,
  closeDropdown,
  ids,
  parentDiv,
}: {
  open: boolean;
  item: {
    name: string;
    id: string;
    click: () => void;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }[];
  ids: { id: string }[];
  closeDropdown: () => void;
  parentDiv: React.RefObject<HTMLDivElement | null>;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close menu if click is outside the wrapper div
      if (
        dropdownRef.current && // html div not null
        !dropdownRef.current.contains(event.target as Node) && // dectcts if click is inside
        parentDiv &&
        !parentDiv.current!.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside); // mouse lcick event listerner

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return open ? (
    <div
      ref={dropdownRef}
      className='absolute top-13.75 right-0 bg-[var(--bg-secondary)] pt-4 pb-4 pl-2 pr-2 gap-2 rounded-md transition-all ease-in-out slide w-[10vw]'
    >
      {ids.map((id, idIdx) => {
        const items = item.filter((value) => value.id === id.id);
        console.log(items);

        return items.map((value, idx) => {
          return (
            <div className='w-full' key={idx}>
              <DropdownBtn value={value} key={idx} />
              {idIdx <= ids.length - 2 && idx === items.length - 1 ? (
                <div className='h-[1] bg-[var(--border)] w-full mt-2 mb-2'></div>
              ) : null}
            </div>
          );
        });
      })}
    </div>
  ) : null;
}
