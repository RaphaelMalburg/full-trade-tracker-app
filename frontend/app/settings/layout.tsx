import { Background } from "@/components/ui/background-variations";
import { SettingsSidebar } from "@/components/features/settings/settings-sidebar";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Background variant="mesh" animate={false}>
      <div className="flex min-h-screen">
        <SettingsSidebar />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-xl p-6">{children}</div>
          </div>
        </main>
      </div>
    </Background>
  );
}
