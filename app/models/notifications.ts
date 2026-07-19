import { USERS } from "./user";

export interface NOTIFICATONS {
  id: string;
  userId: string;
  title: string;
  body: string;
  isSent: boolean;
  scheduledTime: Date;
  USER: USERS;
}
