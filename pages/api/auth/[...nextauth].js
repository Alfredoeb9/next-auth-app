import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_AUTH__APP_CLIENT_ID,
      clientSecret: process.env.NEXT_AUTH__APP_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
