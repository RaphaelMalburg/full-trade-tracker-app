import { Background } from "@/components/ui/background-variations";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Background variant="dots" animate={false}>
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-xl p-8">{children}</div>
        </div>
      </div>
    </Background>
  );
}
