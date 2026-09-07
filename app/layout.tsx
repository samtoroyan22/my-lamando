import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layouts/app-shell";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils/utils";
import { CarProvider } from "@/contexts/car-context";
import { FuelProvider } from "@/contexts/fuel-context";
import { ExpenseProvider } from "@/contexts/expense-context";
import { ServiceProvider } from "@/contexts/service-context";
import { GalleryProvider } from "@/contexts/gallery-context";
import { MaintenanceProvider } from "@/contexts/maintenance-context";
import { Toaster } from "sonner";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Volkswagen Lamando L",
  description: "Personal car management system",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        plusJakarta.variable,
        jetbrainsMono.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Toaster />

          <CarProvider>
            <MaintenanceProvider>
              <ServiceProvider>
                <ExpenseProvider>
                  <FuelProvider>
                    <GalleryProvider>
                      <AppShell>{children}</AppShell>
                    </GalleryProvider>
                  </FuelProvider>
                </ExpenseProvider>
              </ServiceProvider>
            </MaintenanceProvider>
          </CarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
