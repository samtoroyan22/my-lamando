"use client";

import { useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      <Header onMenuClick={() => setMobileSidebarOpen(true)} />

      <div className="flex">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
