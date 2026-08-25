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
  cookieStore.set("fid", fid);
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

export async function getUserCategories() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return { error: "token not found", status: 500 };
  }

  const emailRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/user`,
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

export async function getUserEmails(cursor?: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return { error: "token not found", status: 500 };
  }

  const emailRes = await fetch(
    cursor
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/emails/user?cursor=${cursor}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/emails/user`,
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

export async function getFillterEmails(
  category?: string,
  priority?: string,
  cursor?: string,
  starred?: string,
  dateStart?: string,
  dateEnd?: string,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/emails/filter?`;
  if (!token) {
    console.log("no token");
    return { error: "token not found", status: 500 };
  }

  if (category) {
    url = url + `category=${category}&`;
  }
  if (priority) {
    url = url + `priority=${priority}&`;
  }
  if (cursor) {
    url = url + `cursor=${cursor}&`;
  }
  if (starred) {
    url = url + `starred=${starred}&`;
  }
  if (dateStart && dateEnd) {
    url = url + `dateStart=${dateStart}&dateEnd=${dateEnd}`;
  }

  const emailRes = await fetch(url, {
    method: "GET",
    signal: AbortSignal.timeout(480000),
    headers: {
      Authorization: `Bearer ${token!.value}`,
    },
  });

  if (!emailRes.ok || emailRes.status === 500) {
    const error = await emailRes.text();
    console.log(error);
    return { error: "error occured" + error, status: 500 };
  }
  const data = await emailRes.json();
  return { status: 200, error: null, data: data };
}

export async function addCatgeory(nameCat: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    console.log("no token");
    return { error: "token not found", status: 500 };
  }

  if (!nameCat) {
    return { error: "no name", data: undefined, status: 404 };
  }

  const emailRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/add`,
    {
      method: "POST",
      body: JSON.stringify({ name: nameCat }),
      signal: AbortSignal.timeout(480000),
      headers: {
        Authorization: `Bearer ${token!.value}`,
        "Content-Type": "application/json", // Critical for NestJS to parse the body
        Accept: "application/json",
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

export async function deleteCatgeory(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    console.log("no token");
    return { error: "token not found", status: 500 };
  }

  if (!id) {
    return { error: "no id", data: undefined, status: 404 };
  }

  const emailRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/delete/${id}`,
    {
      method: "DELETE",
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

export async function getEmailFromId(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    console.log("no token");
    return { error: "token not found", status: 500 };
  }

  if (!id) {
    return { error: "no id", data: undefined, status: 404 };
  }

  const emailRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/emails/email/${id}`,
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

export async function getAttachmentFromId(id: string, messageId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    console.log("no token");
    return { error: "token not found", status: 500 };
  }

  if (!id) {
    return { error: "no id", data: undefined, status: 404 };
  }

  const emailRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/emails/attachment/${messageId}/${id}`,
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

export async function read(id: string, gmailId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    console.log("no token");
    return JSON.stringify({ error: "token not found", status: 500 });
  }

  if (!id) {
    return JSON.stringify({ error: "no id", data: undefined, status: 404 });
  }

  const emailRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/emails/read/${id}/${gmailId}`,
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
    return JSON.stringify({ error: "error occured" + error, status: 500 });
  }
  return JSON.stringify({ status: 200, error: null, data: "" });
}

export async function star(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    console.log("no token");
    return JSON.stringify({ error: "token not found", status: 500 });
  }

  if (!id) {
    return JSON.stringify({ error: "no id", data: undefined, status: 404 });
  }

  const emailRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/emails/star/${id}`,
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
    return JSON.stringify({ error: "error occured" + error, status: 500 });
  }
  return JSON.stringify({ status: 200, error: null, data: "" });
}

export async function complete(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    console.log("no token");
    return JSON.stringify({ error: "token not found", status: 500 });
  }

  if (!id) {
    return JSON.stringify({ error: "no id", data: undefined, status: 404 });
  }

  const emailRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/emails/complete/${id}`,
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
    return JSON.stringify({ error: "error occured" + error, status: 500 });
  }
  return JSON.stringify({ status: 200, error: null, data: "" });
}

export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const fid = cookieStore.get("fid");
  if (!token) {
    console.log("no token");
    return { error: "token not found", status: 500 };
  }

  if (fid) {
    const emailRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/remove`,
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
    }
  }
  cookieStore.delete("token");
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  return redirect(`${protocol}://${host}/login`);
}
