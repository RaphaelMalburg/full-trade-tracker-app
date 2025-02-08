"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("nav");

  const footerLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/contact", label: t("contact") },
    { href: "/faq", label: t("faq") },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              Your Name
            </a>
            . The source code is available on{" "}
            <a href="https://github.com/yourusername/trading-app" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              GitHub
            </a>
            .
          </p>
        </div>
        <nav className="flex items-center space-x-6 text-sm">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
