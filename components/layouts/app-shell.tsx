"use client";

import { useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const openMobileSidebar = () => {
    setMobileSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Header onMenuClick={openMobileSidebar} />

      <div className="flex">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />

        <main className="min-w-0 flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
