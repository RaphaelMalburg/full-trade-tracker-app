export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container max-w-5xl py-6 space-y-8 ">{children}</div>;
}
