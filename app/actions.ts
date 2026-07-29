"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function auth(name: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get(name);
  if (token === undefined || token === null) {
    return JSON.stringify({
      error: "token not found",
      user: null,
      isYear: false,
    });
  }
  const res = await fetch(`${process.env.BACKEND_URL}/auth`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token.value}` },
  });
  if (!res.ok || res.status === 500) {
    const error = await res.text();
    console.log(error);
    return JSON.stringify({ error: error, user: null, isYear: false });
  }

  const user = await res.json();
  const isYear = cookieStore.get("year");
  return JSON.stringify({
    user: user,
    isYear: isYear === undefined ? false : true,
    error: null,
  });
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
  return redirect(`${protocol}://${host}/`);
}

export async function getNewEmails(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return JSON.stringify({ error: "token not found", status: 500 });
  }
  const year = cookieStore.get("year");

  // const emailRes = await fetch(`${process.env.BACKEND_URL}/emails`, {
  //   method: "GET",
  //   signal: AbortSignal.timeout(480000),
  //   headers: {
  //     Authorization: `Bearer ${token!.value}`,
  //     year: year ? year.value : new Date().getFullYear().toString(),
  //   },
  // });

  // if (!emailRes.ok || emailRes.status === 500) {
  //   const error = await emailRes.text();
  //   return JSON.stringify({ error: "error occured" + error, status: 500 });
  // }
  console.log("heelo email action");
  return JSON.stringify({ status: 200, error: "null" });
}
