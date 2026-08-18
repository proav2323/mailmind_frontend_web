"use server";
import Email from "../../../pages/email";
import { getEmailFromId } from "../../../actions";

export interface EMAIL {
  id: string;
  subject: string;
  summary: string;
  gmailId: string;
  GmailSubject: string;
  priority: string;
  aiPriority: string;
  receivedAt: Date;
  category: string;
  deadline: Date | null;
  sender: string;
  lastOpenedAt: Date | null;
  isStared: boolean;
  isCompleted: boolean;
  isRead: boolean;
  attachments: {
    attachmentId: string;
    mimetype: string;
    file: string;
  }[];
  body: { text: string | null | undefined; html: string | null | undefined };
  requiresAction: boolean;
  bodyInOrder: { type: string; data: string; i: number }[];
}

export default async function emailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const emailData = await getEmailFromId(id);
  const email: EMAIL | null = emailData.error === null ? emailData.data! : null;
  // mark email as read
  // also save latOpenedAt

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <Email email={email} />
    </div>
  );
}
