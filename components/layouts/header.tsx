"use client";

import { usePathname } from "next/navigation";
import { navigationItems } from "./navigation";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();

  const currentPage =
    navigationItems.find((item) => item.href === pathname)?.title ??
    "Dashboard";

  return (
    <header className="flex h-16 items-center border-b px-6">
      <div className="flex w-full items-center justify-between">
        {/* left side */}
        <div>
          <span className="font-semibold">My Lamando</span>
        </div>

        {/* right side */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{currentPage}</span>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
