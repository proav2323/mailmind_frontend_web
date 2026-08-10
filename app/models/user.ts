export interface USERS {
  name: string;
  email: string;
  photoUrl: string;
  college: string | undefined;
  year: number | undefined;
  branch: string | undefined;
  oAuthProvider: string;
  id: string;
  created_at: Date;
  updated_at: Date;
}
