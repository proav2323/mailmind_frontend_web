import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { auth } from "../../../services/auth/auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        const body = new URLSearchParams({
          name: profile.name,
          email: profile.email,
          photoUrl: profile.image,
          oAuthProvider: "google",
          scopes: [],
          accessToken: account.access_token,
          serverAuthCode: account.server_auth_code,
        });
        // console.log(body);
        // const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        //   method: "POST",
        //   body: body
        // });

        // if (!res.ok || res.status === 500) {
        //   console.log("error occured: " + res);
        //   return false;
        // }

        // const token = await res.text();
        await auth();

        return true;
      }
      return true;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token and refresh_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.serverAuthCode = account.server_auth_code;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client session object
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.serverAuthCode = token.serverAuthCode;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
