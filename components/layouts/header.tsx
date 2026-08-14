"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { navigationItems } from "./navigation";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();

  const currentPage =
    navigationItems.find((item) => item.href === pathname)?.title ??
    "Dashboard";

  return (
    <header className="flex h-16 items-center border-b px-4 md:px-6">
      <div className="flex w-full items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden"
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </Button>

          <span className="font-semibold">My Lamando</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-muted-foreground sm:block">
            {currentPage}
          </span>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
