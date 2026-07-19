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
      redirectUrl:
        process.env.NODE_ENV === "production"
          ? `${process.env.NEXT_PUBLIC_URL}/${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`
          : `http://localhost:3000/${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`,
    }),
  });

  if (!backendRes.ok || backendRes.status === 500) {
    const error = await backendRes.text();
    return NextResponse.json(
      { error: "error occured" + error },
      { status: 400 },
    );
  }

  let tokenS = await backendRes.text();
  let cookesS = await cookies();
  cookesS.set("token", tokenS, {});

  return NextResponse.redirect(new URL("/api/auth", request.url));
}
