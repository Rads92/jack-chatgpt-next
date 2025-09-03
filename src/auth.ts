import NextAuth, { Profile } from "next-auth";

import GitHubProvider from "next-auth/providers/github";

const authOptions = {
  callbacks: {
    async signIn({ profile }: { profile?: Profile }) {
      return profile?.login === "Rads92";
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
