"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Top-level nav link: brand underline draws in on hover and stays for the current page. */
export function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={pathname === href ? "page" : undefined}
      className={cn("nav-link", className)}
    >
      {children}
    </Link>
  );
}
