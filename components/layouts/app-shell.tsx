import { Header } from "./header";
import { Sidebar } from "./sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
