export default function Card({
  number,
  text,
  border = true,
}: {
  number: number;
  text: string;
  border: boolean;
}) {
  return (
    <div
      className={`flex-1 bg-transparent text-lg p-4 flex flex-col gap-2 justify-start items-start p-2 ${border ? "border-r border-[var(--border)]" : ""}`}
    >
      <span className="font-extrabold text-lg">{number}</span>
      <span className="text-sm text-[var(--text-secondary)] font-bold">
        {text}
      </span>
    </div>
  );
}
