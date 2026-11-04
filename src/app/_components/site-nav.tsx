"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/invest", label: "Invest" },
  { href: "/fde", label: "FDE" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Primary">
      {links.map(({ href, label }) => {
        const isCurrent = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={href} href={href} aria-current={isCurrent ? "page" : undefined}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
