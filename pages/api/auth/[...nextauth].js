import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_AUTH_APP_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_AUTH_APP_GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: NEXT_AUTH_APP_GITHUB_CLIENT_ID,
      clientSecret: NEXT_AUTH_APP_GITHUB_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
