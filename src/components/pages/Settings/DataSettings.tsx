import { useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/shadcn/alert";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { DownloadIcon, FileUpIcon, InfoIcon } from "lucide-react";

function getStoredData() {
  return Object.fromEntries(
    Object.keys(localStorage).map((key) => [key, localStorage.getItem(key)])
  );
}

export default function DataSettings() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const exportData = () => {
    const backup = {
      format: "project-manager-backup",
      version: 1,
      exportedAt: new Date().toISOString(),
      storage: getStoredData(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `project-manager-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Backup exported successfully.");
  };

  const importData = async (file?: File) => {
    if (!file) return;
    try {
      const backup = JSON.parse(await file.text()) as {
        format?: string;
        storage?: Record<string, string | null>;
      };
      if (backup.format !== "project-manager-backup") {
        throw new Error("Invalid backup format");
      }
      if (!backup.storage) throw new Error("Backup has no stored data");
      Object.entries(backup.storage).forEach(([key, value]) => {
        if (value === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, value);
        }
      });
      setMessage("Backup imported. Reload the page to apply all restored settings.");
    } catch {
      setMessage("This file could not be imported. Choose a Project Manager backup.");
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data &amp; backup</CardTitle>
        <p className="text-sm text-muted-foreground">
          Keep a portable backup of your workspace or restore one from another device.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Export project manager data</p>
            <p className="mt-1 text-xs text-muted-foreground">Download a JSON backup file.</p>
          </div>
          <Button variant="outline" onClick={exportData}>
            <DownloadIcon />
            Export data
          </Button>
        </div>
        <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Import a previous backup</p>
            <p className="mt-1 text-xs text-muted-foreground">Restore profile and workspace preferences.</p>
          </div>
          <Button variant="outline" onClick={() => inputRef.current?.click()}>
            <FileUpIcon />
            Import file
          </Button>
          <Input ref={inputRef} type="file" accept="application/json,.json" className="hidden" onChange={(event) => importData(event.target.files?.[0])} />
        </div>
        {message ? (
          <Alert>
            <InfoIcon />
            <AlertTitle>Backup status</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        ) : null}
      </CardContent>
    </Card>
  );
}