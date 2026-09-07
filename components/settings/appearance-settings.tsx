"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Appearance</CardTitle>

        <p className="text-sm text-muted-foreground">
          Choose how My Lamando looks.
        </p>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={mounted && theme === "light" ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme("light")}
            className="gap-2"
          >
            <Sun className="size-4" aria-hidden="true" />
            Light
          </Button>

          <Button
            type="button"
            variant={mounted && theme === "dark" ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme("dark")}
            className="gap-2"
          >
            <Moon className="size-4" aria-hidden="true" />
            Dark
          </Button>

          <Button
            type="button"
            variant={mounted && theme === "system" ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme("system")}
            className="gap-2"
          >
            <Monitor className="size-4" aria-hidden="true" />
            System
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
