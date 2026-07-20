"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function auth(name: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get(name);
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

  const user = await res.json();

  // return NextResponse.redirect(new URL(`/`, req.url));
  return NextResponse.json(user, { status: 200 });
}
