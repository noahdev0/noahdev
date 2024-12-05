import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // get user from db
        const user = await getUserFromDb(
          credentials.email as string,
          credentials.password as string
        );
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        }

        // Return null if credentials are invalid
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.SECRET,
});
