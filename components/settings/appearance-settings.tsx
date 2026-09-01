"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AppearanceSettings = () => {
  const { setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>

        <p className="text-sm text-muted-foreground">
          Choose how My Lamando looks.
        </p>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setTheme("light")}
            className="cursor-pointer"
          >
            <Sun className="size-4" />
            Light
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setTheme("dark")}
            className="cursor-pointer"
          >
            <Moon className="size-4" />
            Dark
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setTheme("system")}
            className="cursor-pointer"
          >
            <Monitor className="size-4" />
            System
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
