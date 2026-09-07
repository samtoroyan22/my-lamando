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
    <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border/60 bg-background/80 px-4 backdrop-blur-md supports-backdrop-filter:bg-background/70 sm:h-16 md:px-6">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="size-9 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>

          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
              My Lamando
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Volkswagen Lamando L
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden text-sm text-muted-foreground md:block">
            {currentPage}
          </span>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
