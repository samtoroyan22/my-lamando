import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layouts/app-shell";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { CarProvider } from "@/contexts/car-context";
import { FuelProvider } from "@/contexts/fuel-context";
import { ExpenseProvider } from "@/contexts/expense-context";
import { ServiceProvider } from "@/contexts/service-context";
import { GalleryProvider } from "@/contexts/gallery-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Lamando",
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
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <CarProvider>
            <GalleryProvider>
              <ServiceProvider>
                <ExpenseProvider>
                  <FuelProvider>
                    <AppShell>{children}</AppShell>
                  </FuelProvider>
                </ExpenseProvider>
              </ServiceProvider>
            </GalleryProvider>
          </CarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
