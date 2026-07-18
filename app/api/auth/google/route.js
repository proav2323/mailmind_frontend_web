import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  let backendRes = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    body: new URLSearchParams({
      name: "web",
      email: "web",
      photoUrl: "web",
      oAuthProvider: "google",
      scopes: [
        "https://www.googleapis.com/auth/gmail.compose",
        "https://www.googleapis.com/auth/gmail.insert",
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/gmail.labels",
        "https://www.googleapis.com/auth/gmail.modify",
        "https://www.googleapis.com/auth/gmail.metadata",
        "https://www.googleapis.com/auth/gmail.send",
        "https://www.googleapis.com/auth/contacts.readonly",
        "https://www.googleapis.com/auth/user.emails.read",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      accessToken: "",
      serverAuthCode: code,
    }),
  });

  if (!backendRes.ok || backendRes.status === 500) {
    const error = await backendRes.text();
    return NextResponse.json(
      { error: "error occured" + error },
      { status: 400 },
    );
  }

  let token = await backendRes.text();

  const cookieStore = await cookies();
  cookieStore.set("session_user", JSON.stringify(token), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  let userDeatils = await fetch(`${process.env.BACKEND_URL}/auth`, {
    method: "GET",
  });
  let user = await userDeatils.json();
  console.log(user);

  return NextResponse.redirect(new URL("/", request.url));
}
