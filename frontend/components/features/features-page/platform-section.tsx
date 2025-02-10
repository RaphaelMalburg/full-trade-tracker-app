"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

const platforms = [
  {
    name: "cTrader",
    logo: "/platforms/logo-ctrader.png",
  },
  {
    name: "NinjaTrader",
    logo: "/platforms/logo-ninjatrader.png",
  },
  {
    name: "MetaTrader 4",
    logo: "/platforms/logo-metatrader.png",
  },
  {
    name: "MetaTrader 5",
    logo: "/platforms/logo-metatrader.png",
  },
];

export function PlatformSection() {
  return (
    <section className="py-24 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Supported Platforms</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">Seamlessly integrate with your favorite trading platforms</p>
          <Button asChild size="lg">
            <Link href="/plugins">
              <Download className="mr-2 h-5 w-5" />
              Download Platform Plugins
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group relative">
              <div className="relative h-full bg-background/50 dark:bg-black/50 backdrop-blur-xl rounded-xl border border-border/50 overflow-hidden p-8">
                {/* Glow Effect */}
                <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative flex flex-col items-center justify-center h-full gap-6">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    <Image src={platform.logo} alt={platform.name} fill sizes="(max-width: 768px) 100vw, 160px" className="relative object-contain p-4 drop-shadow-lg" />
                  </div>
                  <h3 className="text-xl font-semibold text-center group-hover:text-primary transition-colors">{platform.name}</h3>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border border-primary/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
