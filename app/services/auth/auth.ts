import { useUser } from "../../states/user";
import { USERS } from "../../models/user";
import { cookies } from "next/headers";

export async function auth() {
  const cookiesS = await cookies();
  const token = cookiesS.get("token");
  const res = await fetch(`${process.env.BACKEND_URL}/auth`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
}

export function SetUser(user: USERS) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userState = useUser((state: any) => state.updateUser(user));
}
