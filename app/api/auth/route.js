import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req) {
  const cookiesS = await cookies();
  const token = cookiesS.get("token");

  if (token === undefined || token === null) {
    return NextResponse.json({ error: "token not found" }, { status: 500 });
  }
  const res = await fetch(`${process.env.BACKEND_URL}/auth`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token.value}` },
  });
  if (!res.ok || res.status === 500) {
    const error = await res.text();
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }

  let user = await res.json();

  // return NextResponse.redirect(new URL(`/`, req.url));
  return NextResponse.json(user, { status: 200 });
}
