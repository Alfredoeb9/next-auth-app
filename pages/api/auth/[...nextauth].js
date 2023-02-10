import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/connection";
import Users from "@/model/signUp/User";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_AUTH_APP_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_APP_GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_AUTH_APP_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_APP_GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "Connection Failed..";
        });

        const userExists = await Users.findOne({ email: credentials.email });

        if (!userExists) {
          throw new Error("No user found with email please sign up!");
        }

        // compare passwords
        const checkPassword = await compare(
          credentials.password,
          userExists.password
        );

        if (!checkPassword || userExists.email !== credentials.email) {
          throw new Error("Username or password doesn't match");
        }

        return userExists;
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_APP_NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
