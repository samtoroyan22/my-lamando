"use client";

import { useRef, useState } from "react";

import { Download, FileUp, RotateCcw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { STORAGE_KEYS } from "@/lib/storage/keys";

const DATA_KEYS = [
  STORAGE_KEYS.car,
  STORAGE_KEYS.fuel,
  STORAGE_KEYS.expenses,
  STORAGE_KEYS.service,
  STORAGE_KEYS.gallery,
] as const;

const ALL_KEYS = [...DATA_KEYS] as const;

const DataManagement = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dialog, setDialog] = useState<"clear" | "reset" | null>(null);

  const [importError, setImportError] = useState<string | null>(null);

  const exportData = () => {
    const data: Record<string, unknown> = {};

    ALL_KEYS.forEach((key) => {
      const value = localStorage.getItem(key);

      if (value !== null) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      }
    });

    const payload = {
      app: "My Lamando",
      version: 1,
      exportedAt: new Date().toISOString(),
      data,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `my-lamando-backup-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  };

  const importData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setImportError(null);

      const text = await file.text();

      const parsed = JSON.parse(text);

      if (
        !parsed ||
        typeof parsed !== "object" ||
        !parsed.data ||
        typeof parsed.data !== "object"
      ) {
        throw new Error("Invalid backup structure.");
      }

      const importedData = parsed.data as Record<string, unknown>;

      ALL_KEYS.forEach((key) => {
        if (!(key in importedData)) {
          return;
        }

        localStorage.setItem(key, JSON.stringify(importedData[key]));
      });

      window.location.reload();
    } catch {
      setImportError(
        "Unable to import this file. Please select a valid My Lamando backup.",
      );
    } finally {
      event.target.value = "";
    }
  };

  const clearAllData = () => {
    DATA_KEYS.forEach((key) => {
      localStorage.removeItem(key);
    });

    setDialog(null);

    window.location.reload();
  };

  const resetApplication = () => {
    ALL_KEYS.forEach((key) => {
      localStorage.removeItem(key);
    });

    setDialog(null);

    window.location.reload();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Data</CardTitle>

          <p className="text-sm text-muted-foreground">
            Back up, restore or remove your application data.
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-medium">Export data</p>

              <p className="text-sm text-muted-foreground">
                Save your My Lamando data as a JSON backup.
              </p>
            </div>

            <Button type="button" variant="outline" onClick={exportData}>
              <Download className="mr-2 size-4" />
              Export
            </Button>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-medium">Import data</p>

              <p className="text-sm text-muted-foreground">
                Restore your data from a JSON backup.
              </p>
            </div>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={importData}
              />

              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileUp className="mr-2 size-4" />
                Import
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border border-destructive/30 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-medium">Clear all data</p>

              <p className="text-sm text-muted-foreground">
                Delete fuel, expenses, service and gallery data.
              </p>
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={() => setDialog("clear")}
            >
              <Trash2 className="mr-2 size-4" />
              Clear data
            </Button>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border border-destructive/30 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-medium">Reset application</p>

              <p className="text-sm text-muted-foreground">
                Remove all stored data and restore defaults.
              </p>
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={() => setDialog("reset")}
            >
              <RotateCcw className="mr-2 size-4" />
              Reset app
            </Button>
          </div>

          {importError && (
            <p className="text-sm text-destructive">{importError}</p>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={dialog !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDialog(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialog === "clear" ? "Clear all data?" : "Reset application?"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {dialog === "clear"
                ? "This will permanently delete your fuel records, expenses, service history and gallery photos. Your application settings will remain unchanged."
                : "This will permanently remove all stored application data, including settings, and restore the default state."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={dialog === "clear" ? clearAllData : resetApplication}
            >
              {dialog === "clear" ? "Clear all data" : "Reset application"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DataManagement;
