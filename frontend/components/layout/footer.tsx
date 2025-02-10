"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram } from "lucide-react";
import { XIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const navigation = {
  main: [
    { name: "Features", href: "/features" },
    { name: "Desktop App", href: "/desktop" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Risk Disclosure", href: "#", isDialog: true },
  ],
  social: [
    {
      name: "X",
      href: "https://twitter.com/tradetrackerpro",
      icon: XIcon,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/tradetrackerpro",
      icon: Instagram,
    },
  ],
};

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t bg-background/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo and Description */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400" />
              <span className="font-bold">TradeTracker</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">Advanced AI-powered trading analysis tools to enhance your trading decisions and performance tracking.</p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold">Navigation</h3>
              <ul role="list" className="mt-4 space-y-4">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul role="list" className="mt-4 space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    {item.isDialog ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="link" className="text-sm text-muted-foreground hover:text-foreground p-0 h-auto font-normal">
                            {item.name}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Trading Risk Disclosure</DialogTitle>
                            <DialogDescription className="space-y-4 pt-4">
                              <p>
                                Trading financial instruments carries a high level of risk and may not be suitable for all investors. You could lose more than your initial
                                investment.
                              </p>
                              <p>
                                Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. You should be aware of
                                all the risks associated with trading and seek advice from an independent financial advisor if you have any doubts.
                              </p>
                              <p>
                                Past performance is not indicative of future results. Trading forecasts provided by our AI analysis tools are for informational purposes only and
                                should not be considered as financial advice.
                              </p>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">&copy; {new Date().getFullYear()} TradeTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
