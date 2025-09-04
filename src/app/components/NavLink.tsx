"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname.startsWith(href) && href !== "/");

  return (
    <Link
      href={href}
      className={cn(
        `hover:underline hover:underline-offset-4 hover:text-slate-500 text-xl`,
        {
          underline: isActive,
        }
      )}
    >
      {children}
    </Link>
  );
}
