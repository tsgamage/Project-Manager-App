import PageWrapper from "@/components/Page-Wrapper";
import AppearanceSettings from "@/components/pages/Settings/AppearanceSettings";
import DataSettings from "@/components/pages/Settings/DataSettings";
import ProfileSettings from "@/components/pages/Settings/ProfileSettings";

export default function SettingsPage() {
  return (
    <PageWrapper>
      <div className="space-y-6 px-5 py-6 lg:px-8">
        <header>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Settings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your profile, appearance, and workspace data.
          </p>
        </header>
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <ProfileSettings />
            <DataSettings />
          </div>
          <AppearanceSettings />
        </div>
      </div>
    </PageWrapper>
  );
}
