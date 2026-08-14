"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function auth(name: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get(name);
  if (token === undefined || token === null) {
    return JSON.stringify({
      error: "token not found",
      user: null,
      isYear: false,
      token: null,
    });
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, {
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
    token: token.value,
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

  // const Res = await fetch(`${process.env.NEXT_PUBLIC_AI_URL}/`, {
  //   method: "GET",
  //   signal: AbortSignal.timeout(480000),
  // });

  const emailRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/emails`,
    {
      method: "GET",
      signal: AbortSignal.timeout(480000),
      headers: {
        Authorization: `Bearer ${token!.value}`,
        year: year ? year.value : new Date().getFullYear().toString(),
      },
    },
  );

  if (!emailRes.ok || emailRes.status === 500) {
    const error = await emailRes.text();
    console.log(error);
    return JSON.stringify({ error: "error occured" + error, status: 500 });
  }
  return JSON.stringify({ status: 200, error: null });
}

export async function saveFids(fid: string, tokenS: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return JSON.stringify({ error: "token not found", status: 500 });
  }
  const emailRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/save`,
    {
      method: "GET",
      signal: AbortSignal.timeout(480000),
      headers: {
        Authorization: `Bearer ${token!.value}`,
        fid: fid,
        token: tokenS,
        platform: "web",
      },
    },
  );

  if (!emailRes.ok || emailRes.status === 500) {
    const error = await emailRes.text();
    console.log(error);
    return JSON.stringify({ error: "error occured" + error, status: 500 });
  }
  return JSON.stringify({ status: 200, error: null });
}

export async function getUserNotifications() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return { error: "token not found", status: 500 };
  }

  const emailRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/user`,
    {
      method: "GET",
      signal: AbortSignal.timeout(480000),
      headers: {
        Authorization: `Bearer ${token!.value}`,
      },
    },
  );

  if (!emailRes.ok || emailRes.status === 500) {
    const error = await emailRes.text();
    console.log(error);
    return { error: "error occured" + error, status: 500 };
  }
  const data = await emailRes.json();
  return { status: 200, error: null, data: data };
}

export async function seenNotifications() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return { error: "token not found", status: 500 };
  }

  const emailRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/seen`,
    {
      method: "PUT",
      signal: AbortSignal.timeout(480000),
      headers: {
        Authorization: `Bearer ${token!.value}`,
      },
    },
  );

  if (!emailRes.ok || emailRes.status === 500) {
    const error = await emailRes.text();
    console.log(error);
    return { error: "error occured" + error, status: 500 };
  }
  const data = await emailRes.json();
  return { status: 200, error: null, data: data };
}
