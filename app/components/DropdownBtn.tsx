import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default function DropdownBtn({
  value,
}: {
  value: {
    name: string;
    id: string;
    click: () => void;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  };
}) {
  return (
    <div
      className='w-full p-2 flex flex-row gap-2 justify-start items-center bg-transparent hover:bg-[var(--bg-primary)] transition-all duration-500 ease-in-out cursor-pointer rounded-md hover:text-[var(--text-secondary)] text-[var(--text-rpimary)]'
      onClick={value.click}
    >
      <value.icon />
      <span className='text-md font-bold'>{value.name}</span>
    </div>
  );
}
