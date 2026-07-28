import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const year = cookieStore.get("year");

  const emailRes = await fetch(`${process.env.BACKEND_URL}/emails`, {
    method: "GET",
    signal: AbortSignal.timeout(480000),
    headers: {
      Authorization: `Bearer ${token.value}`,
      year: year.value,
    },
  });

  if (!emailRes.ok || emailRes.status === 500) {
    const error = await emailRes.text();
    return NextResponse.json(
      { error: "error occured" + error },
      { status: 400 },
    );
  }

  return redirect(new URL("/", req.url));
}
