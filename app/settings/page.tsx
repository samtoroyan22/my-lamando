import AppearanceSettings from "@/components/settings/appearance-settings";
import DataManagement from "@/components/settings/data-management";

const SettingsPage = () => {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage appearance, units and application data.
        </p>
      </div>

      <div className="space-y-6">
        <AppearanceSettings />
        <DataManagement />
      </div>
    </main>
  );
};

export default SettingsPage;
