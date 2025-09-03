import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import "./globals.css";
import { SessionProvider } from "./components/SessionProvider";
import UserButton from "./components/UserButton";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased 
          max-w-8/10 
          my-8 
          mx-auto
          `}
        >
          <header className="py-6">
            <nav className="flex justify-between">
              <ul className="flex gap-2">
                <li>
                  <Link
                    href="/"
                    className="hover:underline hover:underline-offset-4 hover:text-slate-500 text-xl"
                  >
                    GPT Chat
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:underline hover:underline-offset-4 hover:text-slate-500 text-xl"
                  >
                    About
                  </Link>
                </li>
              </ul>
              <div>
                <UserButton />
              </div>
            </nav>
          </header>
          <div className="flex flex-col md:flex-row">
            <div className="flex-grow">{children}</div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
