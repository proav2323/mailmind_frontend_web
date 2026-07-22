"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
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
  const isYear = cookieStore.get("year");
  return NextResponse.json(
    {
      user: user,
      isYear: isYear === undefined ? false : true,
    },
    { status: 200 },
  );
}

export async function setYear(year: string) {
  const cookieStore = await cookies();
  cookieStore.set("year", year, {
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  return redirect(`${protocol}://${host}/api/emails`);
}
