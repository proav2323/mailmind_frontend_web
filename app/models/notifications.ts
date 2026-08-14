export interface NOTIFICATONS {
  id: string;
  userId: string;
  title: string;
  body: string;
  isSent: boolean;
  seen: boolean;
  scheduledTime: Date;
  data: { id: string } | undefined;
}
