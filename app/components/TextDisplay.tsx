export default function TextDisplay({
  nameC,
  value,
  bgColor,
  textColor,
}: {
  nameC: string;
  value: string;
  bgColor: string;
  textColor: string;
}) {
  return (
    <div className='flex flex-row w-[95%] justify-between items-center'>
      <span className='font-bold text-lg'>{nameC}</span>
      <span
        className={`text-md p-2 rounded-md`}
        style={{ background: `${bgColor}`, color: `${textColor}` }}
      >
        {value}
      </span>
    </div>
  );
}
