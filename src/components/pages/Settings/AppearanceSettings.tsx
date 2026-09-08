import { useTheme, type Theme } from "@/components/providers/theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { Switch } from "@/components/ui/shadcn/switch";
import { Label } from "@/components/ui/shadcn/label";
import { useState } from "react";

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [compactMode, setCompactMode] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <p className="text-sm text-muted-foreground">
          Personalize how Project Manager looks and feels.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <Label htmlFor="theme-select">Theme</Label>
            <p className="text-xs text-muted-foreground">Choose a light, dark, or system theme.</p>
          </div>
          <Select value={theme} onValueChange={(value) => setTheme(value as Theme)}>
            <SelectTrigger id="theme-select" className="w-full sm:w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <Label htmlFor="compact-mode">Compact mode</Label>
            <p className="text-xs text-muted-foreground">Use tighter spacing in task and project lists.</p>
          </div>
          <Switch id="compact-mode" checked={compactMode} onCheckedChange={setCompactMode} />
        </div>
      </CardContent>
    </Card>
  );
}