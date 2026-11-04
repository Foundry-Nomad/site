import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteNav } from "./site-nav";

type SiteHeaderProps = {
  /** Page-specific call to action shown after the navigation links. */
  action?: ReactNode;
};

export function SiteHeader({ action }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link className="site-brand" href="/" aria-label="Foundry Nomad home">
        <Image src="/logo.png" alt="" width={42} height={42} preload unoptimized />
        <span>FOUNDRY NOMAD</span>
      </Link>
      <SiteNav />
      {action}
    </header>
  );
}
