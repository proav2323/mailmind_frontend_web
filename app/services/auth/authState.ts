import { useUser } from "../../states/user";
import { USERS } from "../../models/user";

export function SetUser(user: USERS) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userState = useUser((state: any) => state.updateUser(user));
}
