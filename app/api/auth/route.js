import { NextResponse } from "next/server";
import { SetUser } from "../../services/auth/authState";
import { cookies } from "next/headers";

export async function GET(req) {
  const cookiesS = await cookies();
  const token = cookiesS.get("token");
  const res = await fetch(`${process.env.BACKEND_URL}/auth`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token.value}` },
  });
  if (!res.ok || res.status === 500) {
    const error = await res.text();
    console.log(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let user = await res.json();
  SetUser(user);

  return NextResponse.redirect(new URL("/", req.url));
}
