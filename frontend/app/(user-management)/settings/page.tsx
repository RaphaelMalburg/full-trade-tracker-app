import { Separator } from "@/components/ui/separator";
import { PreferenceSettings } from "@/components/features/settings/preference-settings";
import { AccountSettings } from "@/components/features/settings/account-settings";
import { getUserPreferences } from "@/lib/actions/user/preferences";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await auth();
  console.log("[Settings Page] Auth check result:", !!user);
  if (!user) redirect("/sign-in");

  const preferences = await getUserPreferences();
  console.log("[Settings Page] Preferences check result:", !!preferences);
  if (!preferences) redirect("/sign-in");

  return (
    <div className="space-y-6 p-10 pb-16 block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      <Separator />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <a href="#preferences" className="justify-start rounded-lg px-4 py-2 text-center text-sm font-medium hover:bg-accent hover:text-accent-foreground lg:w-full">
              Preferences
            </a>
            <a href="#account" className="justify-start rounded-lg px-4 py-2 text-center text-sm font-medium hover:bg-accent hover:text-accent-foreground lg:w-full">
              Account
            </a>
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <div id="preferences">
              <PreferenceSettings initialPreferences={preferences} />
            </div>
            <div id="account">
              <AccountSettings user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
