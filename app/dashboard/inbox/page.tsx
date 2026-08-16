import Inbox from "../../pages/inbox";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const queryParams = await searchParams;
  return (
    <div className='w-full p-0 pl-0 pr-0 pt-0 pb-0'>
      <Inbox query={queryParams} />
    </div>
  );
}
