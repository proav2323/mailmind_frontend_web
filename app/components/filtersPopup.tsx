export default function FiltersPopup({
  priorities,
}: {
  priorities: { name: string; id: string }[];
}) {
  return (
    <div className='w-full absolute h-screen bg-black/70 top-0 flex flex-row justify-center items-center z-30'>
      <div className='w-[95%] md:w-[75%] lg:w-[50%] bg-[var(--bg-primary)] p-2 rounded-md flex flex-col justify-start items-center'>
        <div className='w-[97%] p-2 flex flex-row justify-between items-center text-[var(--text-primary)] '>
          <span className='text-md'>Filters</span>
          <button className='text-lg'>X</button>
        </div>
      </div>
    </div>
  );
}
