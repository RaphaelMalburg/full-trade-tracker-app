import { getCurrentUser } from "@/lib/session";

export default async function UserManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full  px-4 py-6 pt-24">
      <div className="container mx-auto flex-1">
        <div className="space-y-6">
          <main className="w-full flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
