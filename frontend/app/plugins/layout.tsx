import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Integrations | Trade Tracker Pro",
  description:
    "Download and install our plugins to enable automatic trade journaling and AI features for your preferred trading platform.",
};

export default function PluginsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
