import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/auth/verifyPassword";
import connectToDatabase from "@/db";
import { UserModel } from "@/models/user";
import mongoose from "mongoose";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToDatabase();

        if (!credentials) {
          console.log("Credentials are not provided");
          return null;
        }

        const user = await UserModel.findOne({
          username: credentials.username,
        });
        if (!user) {
          // Disconnect from the database
          await mongoose.disconnect();
          console.log("Invalid username");
          return null; // Return null to indicate failed authorization
        }

        const isVerified = await verifyPassword({
          password: credentials.password,
          dataBasePassword: user.password,
        }); // Use password verification function

        if (isVerified) {
          // Disconnect from the database
          await mongoose.disconnect();
          return user;
        } else {
          // Disconnect from the database
          await mongoose.disconnect();
          console.log("Invalid password");
          return null; // Return null to indicate failed authorization
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 60 * 60, // Set session expiration to 30 days (optional)
  },
  secret: process.env.NEXTAUTH_SECRET,
};
