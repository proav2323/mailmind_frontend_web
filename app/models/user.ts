import { EMAILS } from "./emails";
import { NOTIFICATONS } from "./notifications";

export interface USERS {
  name: string;
  email: string;
  photoUrl: string;
  college: string | undefined;
  year: number | undefined;
  branch: string | undefined;
  refreshToken: string;
  oAuthProvider: string;
  id: string;
  created_at: Date;
  updated_at: Date;
  emails: EMAILS[];
  notifications: NOTIFICATONS[];
}
