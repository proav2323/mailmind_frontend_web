import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req) {
  const cookieStore = await cookies();
  cookieStore.delete("first");
  cookieStore.set("first", "false", {
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return redirect(new URL("/", req.url));
}
