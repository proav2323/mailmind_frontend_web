import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req) {
  const cookieStore = await cookies();

  return redirect(new URL("/", req.url));
}
