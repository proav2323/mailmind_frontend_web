import { useUser } from "../../states/user";
import { USERS } from "../../models/user";

export async function auth() {
  const res = await fetch(`${process.env.BACKEND_URL}/auth`, {
    method: "GET",
  });

  return res;
}

export function SetUser(user: USERS) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userState = useUser((state: any) => state.updateUser(user));
}
