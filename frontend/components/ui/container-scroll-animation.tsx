"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

export function ContainerScroll({
  titleComponent,
  children,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 1 ? "relative" : "fixed",
  );

  return (
    <motion.div
      ref={containerRef}
      className="relative mb-[-30%] h-[150vh] py-20"
    >
      <motion.div
        style={{ opacity, scale, position }}
        className="fixed left-0 top-20 flex w-full flex-col items-center"
      >
        {titleComponent}
        <motion.div className="w-full" style={{ opacity, scale }}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
