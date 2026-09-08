import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";

const profileStorageKey = "project-manager-profile";

function readProfile() {
  try {
    return JSON.parse(localStorage.getItem(profileStorageKey) ?? "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

export default function ProfileSettings() {
  const savedProfile = readProfile();
  const [profile, setProfile] = useState({
    name: savedProfile.name ?? "Alex Morgan",
    email: savedProfile.email ?? "alex@example.com",
    company: savedProfile.company ?? "Acme Studio",
    role: savedProfile.role ?? "Product Designer",
  });
  const [saved, setSaved] = useState(false);

  const updateField = (field: keyof typeof profile, value: string) => {
    setSaved(false);
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const saveProfile = () => {
    localStorage.setItem(profileStorageKey, JSON.stringify(profile));
    setSaved(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile details</CardTitle>
        <p className="text-sm text-muted-foreground">
          This information is used across your project workspace.
        </p>
      </CardHeader>
      <CardContent className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="profile-name">Full name</Label>
          <Input id="profile-name" value={profile.name} onChange={(event) => updateField("name", event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-email">Email address</Label>
          <Input id="profile-email" type="email" value={profile.email} onChange={(event) => updateField("email", event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-company">Company</Label>
          <Input id="profile-company" value={profile.company} onChange={(event) => updateField("company", event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-role">Role</Label>
          <Input id="profile-role" value={profile.role} onChange={(event) => updateField("role", event.target.value)} />
        </div>
        <div className="flex items-center gap-3 sm:col-span-2">
          <Button onClick={saveProfile}>Save changes</Button>
          {saved ? <span className="text-sm text-emerald-500">Saved</span> : null}
        </div>
      </CardContent>
    </Card>
  );
}