import { USERS } from "./user";

export interface EMAILS {
  id: string;
  userId: string;
  gmailId: string;
  subject: string;
  sender: string;
  summary: string;
  body: string;
  receivedAt: Date;
  priority: string;
  category: string;
  deadline: Date;
  isRead: boolean;
  USER: USERS;
}
