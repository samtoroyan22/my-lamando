"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils/utils";
import { navigationItems } from "./navigation";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  const Navigation = (
    <nav
      className="flex flex-col gap-0.5 px-3 py-4"
      aria-label="Main navigation"
    >
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onMobileClose}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="sidebar-active-indicator"
                className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            <Icon
              className={cn(
                "size-4 shrink-0 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
            />
            <span className="truncate">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-60 shrink-0 border-r border-border/60 bg-background md:block lg:w-64">
        <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] flex-col sm:top-16 sm:h-[calc(100vh-4rem)]">
          {Navigation}
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={onMobileClose}
              aria-hidden="true"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 flex w-70 flex-col border-r border-border bg-background shadow-2xl md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation menu"
            >
              <div className="flex h-14 items-center justify-between border-b border-border/60 px-4">
                <span className="font-semibold tracking-tight">My Lamando</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onMobileClose}
                  className="size-9"
                  aria-label="Close menu"
                >
                  <X className="size-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto">{Navigation}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
