import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/models/User";
import connectDB from "@/db/connectDB";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email }) {
      await connectDB(); // <-- ENSURE CONNECTION!
      console.log("🔐 signIn callback");
      console.log("User:", user);
      console.log("Account:", account);
      console.log("Profile:", profile);
      if (account.provider === "github") {
        const userEmail = user?.email;
        if (!userEmail) throw new Error("User email is missing from OAuth provider!");
        let currentUser = await User.findOne({ email: userEmail });
        if (!currentUser) {
          const newUser = new User({
            email: userEmail,
            username: userEmail.split("@")[0].toLowerCase(),
            name: profile.name || userEmail.split("@")[0], // fallback if name is missing
          });
          await newUser.save();
          console.log("🆕 New user created:", newUser);
        } else{
          console.log("✅ Existing user found:", currentUser);
        }
      }
      return true;
    },
    async session({ session }) {
      await connectDB(); // <-- ENSURE CONNECTION!
      let dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) session.user.name = dbUser.username;
      console.log("💾 session callback");
      console.log("Session:", session);
      return session;
    },
    // ... other callbacks
  },
  // ... other NextAuth options
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
