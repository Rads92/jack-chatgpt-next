import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import UserButton from "./components/UserButton";

import "./globals.css";
import { NavLink } from "./components/NavLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextJs ChatGPT App",
  description: "ChatGPT in your app",
};

export default async function RootLayout({
  children,
  chatsSlot,
}: Readonly<{
  children: React.ReactNode;
  chatsSlot: React.ReactNode;
}>) {
  const session = await auth();

  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }
  return (
    <SessionProvider basePath="/api/auth" session={session}>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased 
          max-w-8/10 
          my-8 
          mx-auto
          `}
        >
          <header className="py-6">
            <nav className="flex justify-between pb-2 border-b-indigo-500 border-b-1">
              <ul className="flex gap-4">
                <li>
                  <NavLink href="/">GPT Chat</NavLink>
                </li>
                <li>
                  <NavLink href="/chats">Chats</NavLink>
                </li>
                <li>
                  <NavLink href="/about">About</NavLink>
                </li>
              </ul>
              <div>
                <UserButton />
              </div>
            </nav>
          </header>
          <div className="flex gap-4">
            <div className="empty:hidden flex-1">{chatsSlot}</div>
            <div className="flex flex-3 flex-col md:flex-row">
              <div className="flex-grow">{children}</div>
            </div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
