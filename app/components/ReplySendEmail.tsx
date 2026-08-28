export default function ReplySendEmail({
  newE,
  closeR,
}: {
  newE: boolean;
  closeR: () => void;
}) {
  return (
    <div className='w-full absolute h-screen bg-black/70 t-*op-0 flex flex-row justify-center items-center z-30'>
      <div className='w-[95%] md:w-[75%] lg:w-[50%] bg-[var(--bg-primary)] p-2 rounded-md flex flex-col justify-start items-center text-[var(--text-primary)] '>
        <div className='w-[97%] p-2 flex flex-row justify-between items-center '>
          <span className='text-md'>
            {newE ? "send Email" : "Reply to Email"}
          </span>
          <button className='text-lg cursor-pointer' onClick={closeR}>
            X
          </button>
        </div>
      </div>
    </div>
  );
}
